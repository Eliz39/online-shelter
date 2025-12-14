import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import { AppRouter } from './AppRouter.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import { theme } from './lib/theme.ts'
import CssBaseline from '@mui/material/CssBaseline'

const rootElement = document.getElementById('root')

if (rootElement !== null && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <CssBaseline />
          <AppRouter />
        </AuthProvider>
      </ThemeProvider>
    </StrictMode>
  )
}
