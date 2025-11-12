import { createRootRoute, Link, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { Divider, Link as MUILink, Stack } from '@mui/material'

const RootLayout = () => (
  <>
    <Stack direction="row" spacing={2} padding={2}>
      <MUILink to="/" component={Link}>
        Home
      </MUILink>
      <MUILink to="/login" component={Link}>
        Login
      </MUILink>
    </Stack>
    <Divider />
    <Outlet />
    <TanStackRouterDevtools />
  </>
)

export const Route = createRootRoute({ component: RootLayout })
