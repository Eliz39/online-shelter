import { createFileRoute } from '@tanstack/react-router'

const Volunteer = () => {
  return <div>Volunteer</div>
}

export const Route = createFileRoute('/volunteer')({ component: Volunteer })
