import { createFileRoute } from '@tanstack/react-router'
import { useAuth } from '../context/useAuth.tsx'

const Profile = () => {
  const { user } = useAuth()
  return <div>Welcome {user?.user_metadata?.name}</div>
}

export const Route = createFileRoute('/_auth/profile')({
  component: Profile,
})
