import { RouterProvider } from '@tanstack/react-router'
import { useAuth } from './context/useAuth.tsx'
import { router } from './router.ts'

export const AppRouter = () => {
  const auth = useAuth()

  if (auth.loading) {
    return <div>Loading...</div>
  }

  return <RouterProvider router={router} context={{ auth }} />
}
