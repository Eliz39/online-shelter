import { RouterProvider } from '@tanstack/react-router'
import { useAuth } from './context/useAuth.tsx'
import { router } from './router.ts'
import { Loading } from './components/Loading.tsx'

export const AppRouter = () => {
  const auth = useAuth()

  if (auth.loading) {
    return <Loading />
  }

  return <RouterProvider router={router} context={{ auth }} />
}
