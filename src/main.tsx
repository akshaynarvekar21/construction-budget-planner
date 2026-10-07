import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import './index.css'
import { customTheme } from './theme/theme.ts';
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={customTheme} defaultMode="system" noSsr>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </StrictMode>,
)
