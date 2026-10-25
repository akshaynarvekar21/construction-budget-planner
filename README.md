# Construction Budget Planner

[![CI/CD](https://github.com/akshaynarvekar21/construction-budget-planner/actions/workflows/ci-cd.yml/badge.svg)](https://github.com/akshaynarvekar21/construction-budget-planner/actions/workflows/ci-cd.yml)
[![CodeQL](https://github.com/akshaynarvekar21/construction-budget-planner/actions/workflows/codeql.yml/badge.svg)](https://github.com/akshaynarvekar21/construction-budget-planner/actions/workflows/codeql.yml)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/akshaynarvekar21/construction-budget-planner/badge)](https://scorecard.dev/viewer/?uri=github.com/akshaynarvekar21/construction-budget-planner)

This application helps you manage your construction project.

Live demo: https://akshaynarvekar21.github.io/construction-budget-planner

There are two main sections:
  1. Budget
  2. Cost Codes

Steps to use:
  1. Navigate to the Cost Codes tab.
  2. Add the cost codes for your project.
  3. Navigate back to the Budget tab.
  4. Add the different budgets by first selecting the cost code and then entering the budget.
  5. After adding budgets, click on the Add markup button to add markups for the costs.
  6. In the Markup dialog, first select the cost code from the dropdown and then enter the markup percentage.
  7. Then select the budget items to add the markup to.
  8. Click Save after you are done adding the markup data.
  9. You will see the markups and grand total below the budgets.

## Running the app locally

Ensure you have the latest version of Node.js and npm installed.

Run the following commands in your terminal from the root directory of the project:

```bash
npm install
npm run dev
```

Run the test cases:
```bash
npm run test
```

Cost Codes Page:

![Cost Codes Page](<Screenshot 2025-12-20 at 2.30.07 PM.png>)

Budget Page:

![Budget Page](<Screenshot 2025-12-20 at 2.34.29 PM.png>)

Markup Dialog:

![Markup Dialog](<Screenshot 2025-12-20 at 2.32.36 PM.png>)

Markup Dialog Validations:

![Markup Dialog Validations](<Screenshot 2025-12-20 at 2.38.19 PM.png>)

## CI/CD and security scanning

Every pull request and push to `main` runs the GitHub Actions pipeline in `.github/workflows/`:

| Check | Tool | Fails the build on |
|---|---|---|
| Lint, tests, build | ESLint, Vitest, `tsc` + Vite | any error |
| SAST | CodeQL (`security-extended`), Semgrep | high+ alerts (via branch ruleset) |
| SCA | Trivy, `npm audit`, Dependency Review, Dependabot | high/critical vulnerabilities |
| Secrets | Gitleaks, GitHub secret scanning | any leaked secret |
| DAST | OWASP ZAP baseline (live site, after deploy + weekly) | report only |
| Supply chain | OpenSSF Scorecard | report only |

Pushes to `main` that pass every check deploy to GitHub Pages automatically.

Where to find the results:
- **Security → Code scanning**: CodeQL, Semgrep, Trivy and Scorecard alerts (filter by tool).
- **Security → Dependabot / Secret scanning**: vulnerable dependencies and leaked secrets.
- **Pull request checks**: alerts a PR introduces, plus the dependency-review summary.
- **Issues → "ZAP DAST findings"**: ZAP results. The full HTML report is attached to each workflow run as the `zap-report` artifact.

Known false positives in ZAP can be suppressed in `.zap/rules.tsv`.
