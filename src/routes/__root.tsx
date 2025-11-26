import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { AuthContextValueType } from '../context/AuthContext.tsx'
import { Navbar } from '../components/Navbar.tsx'
import { Box } from '@mui/material'

const NAVBAR_HEIGHT = 64
const RootLayout = () => (
  <>
    <Navbar />
    <Box
      sx={{
        minHeight: `calc(100vh - ${NAVBAR_HEIGHT}px)`,
        background:
          'linear-gradient(135deg, rgba(133, 216, 57, 0.1) 0%, rgba(237, 84, 129, 0.1) 100%)',
      }}
    >
      <Outlet />
    </Box>
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRouteWithContext<{
  auth: AuthContextValueType
}>()({ component: RootLayout })
