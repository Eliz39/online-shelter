import { createRouter } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen.ts'
import type { AuthContextValueType } from './context/AuthContext.tsx'

export const router = createRouter({
  routeTree,
  context: {
    // We'll be passing down the auth state from within a React component
    auth: undefined! as AuthContextValueType,
  },
})
