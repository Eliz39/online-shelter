import { createFileRoute } from '@tanstack/react-router'

const Pets = () => {
  return <div>Pets</div>
}

export const Route = createFileRoute('/pets')({ component: Pets })
