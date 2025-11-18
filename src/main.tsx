import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from '@mui/material'
import { AppRouter } from './AppRouter.tsx'
import { AuthProvider } from './context/AuthProvider.tsx'
import { theme } from './lib/theme.ts'

const rootElement = document.getElementById('root')!
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <AppRouter />
        </AuthProvider>
      </ThemeProvider>
    </StrictMode>
  )
}
