import { createRouter, RouterProvider } from '@tanstack/react-router'
import { useAuth } from './context/useAuth.tsx'
import { Loading } from './components/Loading.tsx'
import { routeTree } from './routeTree.gen.ts'

export const router = createRouter({
  routeTree,
  context: {
    // We'll be passing down the auth state from within a React component
    auth: {
      user: null,
      session: null,
      loading: true,
      handleLogout: async () => {},
    },
  },
})

export const AppRouter = () => {
  const auth = useAuth()

  if (auth.loading) {
    return <Loading />
  }

  return <RouterProvider router={router} context={{ auth }} />
}
