import { useState, useEffect } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Stack } from '@mui/material'
import { Hero } from '../components/sections/Hero.tsx'
import { PetCarousel } from '../components/PetCarousel.tsx'
import { getAvailablePets, PetServiceError } from '../services/petService'
import type { PetType } from '../types/PetType'

export const Route = createFileRoute('/')({
  component: Index,
})

function Index() {
  const [pets, setPets] = useState<PetType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const loadAvailablePets = async () => {
      setLoading(true)
      setError(null)

      try {
        const availablePets = await getAvailablePets(10)
        setPets(availablePets)
        setRetryCount(0)
      } catch (err) {
        console.error('Failed to load available pets:', err)
        const errorMessage = err instanceof PetServiceError
          ? err.message
          : 'Failed to load available pets. Please try again.'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    loadAvailablePets()
  }, [retryCount])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
  }

  return (
    <Stack>
      <Hero />
      <PetCarousel
        pets={pets}
        loading={loading}
        error={error}
        onRetry={handleRetry}
      />
    </Stack>
  )
}
