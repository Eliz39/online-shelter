import { router } from '../AppRouter.tsx'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
