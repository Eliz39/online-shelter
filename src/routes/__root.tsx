import { createRootRouteWithContext, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import type { AuthContextValueType } from '../context/AuthContext.tsx'
import { Navbar } from '../components/Navbar.tsx'

const RootLayout = () => (
  <>
    <Navbar />
    <Outlet />
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRouteWithContext<{
  auth: AuthContextValueType
}>()({ component: RootLayout })
