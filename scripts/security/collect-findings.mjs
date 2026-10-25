#!/usr/bin/env node
// Read-only: gathers open security findings into one JSON file for the
// security-fix agent (.claude/skills/security-fix/SKILL.md).
// Usage: node scripts/security/collect-findings.mjs [output path]
// Needs an authenticated `gh` (locally) or GH_TOKEN (in CI).

import { execFileSync } from 'node:child_process';
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

const out = process.argv[2] ?? 'findings.json';
const errors = [];

const gh = (...args) =>
  execFileSync('gh', args, { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'], maxBuffer: 64 * 1024 * 1024 });
const ghJson = (...args) => JSON.parse(gh(...args));
// --slurp wraps each page in an outer array
const ghPaged = (path) => ghJson('api', '--paginate', '--slurp', path).flat();

const stripHtml = (s = '') => s.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

function section(name, fn) {
  try {
    return fn();
  } catch (err) {
    const msg = (err.stderr || err.message || String(err)).toString().trim().split('\n')[0];
    errors.push({ section: name, error: msg });
    return null;
  }
}

const repo = process.env.GITHUB_REPOSITORY ?? gh('repo', 'view', '--json', 'nameWithOwner', '-q', '.nameWithOwner').trim();

const codeScanning = section('code_scanning', () =>
  ghPaged(`repos/${repo}/code-scanning/alerts?state=open&per_page=100`).map((a) => ({
    number: a.number,
    tool: a.tool.name,
    rule: a.rule.id,
    severity: a.rule.security_severity_level ?? a.rule.severity,
    description: a.rule.description,
    path: a.most_recent_instance.location?.path,
    line: a.most_recent_instance.location?.start_line,
    message: a.most_recent_instance.message?.text,
    url: a.html_url,
  })),
);

const dependabot = section('dependabot', () =>
  ghPaged(`repos/${repo}/dependabot/alerts?state=open&per_page=100`).map((a) => ({
    number: a.number,
    package: a.dependency.package.name,
    manifest: a.dependency.manifest_path,
    scope: a.dependency.scope,
    severity: a.security_advisory.severity,
    summary: a.security_advisory.summary,
    ghsa: a.security_advisory.ghsa_id,
    vulnerable_range: a.security_vulnerability.vulnerable_version_range,
    patched_version: a.security_vulnerability.first_patched_version?.identifier ?? null,
    url: a.html_url,
  })),
);

function zapFromArtifact() {
  const artifact = ghJson('api', `repos/${repo}/actions/artifacts?name=zap-report&per_page=20`).artifacts.find(
    (a) => !a.expired,
  );
  if (!artifact) return null;

  const dir = mkdtempSync(join(tmpdir(), 'zap-report-'));
  try {
    gh('run', 'download', String(artifact.workflow_run.id), '-R', repo, '-n', 'zap-report', '-D', dir);
    const report = JSON.parse(readFileSync(join(dir, 'report_json.json'), 'utf8'));
    return {
      source: 'artifact',
      run_id: artifact.workflow_run.id,
      generated: report['@generated'],
      alerts: report.site.flatMap((site) =>
        site.alerts.map((a) => ({
          site: site['@name'],
          rule: a.pluginid,
          name: a.name,
          risk: a.riskdesc,
          count: Number(a.count),
          urls: [...new Set(a.instances.map((i) => i.uri))].slice(0, 10),
          solution: stripHtml(a.solution),
        })),
      ),
    };
  } finally {
    rmSync(dir, { recursive: true, force: true });
  }
}

// Fallback when the artifact has expired: the issue the ZAP action keeps updated
function zapFromIssue() {
  const [issue] = ghJson(
    'issue', 'list', '-R', repo, '--state', 'open', '--search', 'ZAP DAST findings in:title',
    '--json', 'number,body,updatedAt', '--limit', '1',
  );
  return issue ? { source: 'issue', issue: issue.number, updated: issue.updatedAt, body: issue.body } : null;
}

const zap = section('zap', () => zapFromArtifact() ?? zapFromIssue());

const findings = {
  repo,
  collected_at: new Date().toISOString(),
  code_scanning: codeScanning,
  dependabot,
  zap,
  errors,
};
writeFileSync(out, JSON.stringify(findings, null, 2) + '\n');

const count = (x) => (x == null ? 'unavailable' : x.length);
console.log(
  `Wrote ${out}: code_scanning=${count(codeScanning)} dependabot=${count(dependabot)} ` +
    `zap=${zap == null ? 'unavailable' : zap.alerts ? `${zap.alerts.length} alert types (artifact)` : 'issue body'}` +
    (errors.length ? ` errors=${errors.length}` : ''),
);
for (const e of errors) console.log(`  ${e.section}: ${e.error}`);
