import { createFileRoute } from '@tanstack/react-router'
import { Stack } from '@mui/material'
import { Hero } from '../components/sections/Hero.tsx'
import { PetCarousel } from '../components/PetCarousel.tsx'
import { useAvailablePets } from '../hooks/usePets.ts'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const { data: pets = [], isLoading: loading, error, refetch } = useAvailablePets(10)

  const handleRetry = () => {
    refetch()
  }

  return (
    <Stack>
      <Hero />
      <PetCarousel
        pets={pets}
        loading={loading}
        error={error?.message || null}
        onRetry={handleRetry}
      />
    </Stack>
  )
}
