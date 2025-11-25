import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'

export const router = createRouter({
  routeTree,
  context: {
    // We'll be passing down the auth state from within a React component
    auth: {
      user: null,
      session: null,
      loading: true,
    },
  },
})
