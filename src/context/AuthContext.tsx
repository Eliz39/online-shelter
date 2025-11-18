import { createContext } from 'react'
import type { Session, User } from '@supabase/supabase-js'

export type AuthContextValueType = {
  user: User | null
  session: Session | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextValueType>({
  user: null,
  session: null,
  loading: true,
})
