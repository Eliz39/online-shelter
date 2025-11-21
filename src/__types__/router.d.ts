import { router } from '../router.ts'

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
