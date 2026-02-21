import { useState } from 'react'
import { Box, Chip, CircularProgress, Paper, Typography, Fade } from '@mui/material'
import { Pets } from '@mui/icons-material'
import { useQueryClient } from '@tanstack/react-query'
import { usePetsByIds } from '../../hooks/usePets'
import { useFavoriteAnimals } from '../../hooks/useFavoriteAnimals'
import { FavoritePetAvatar } from '../FavoritePetAvatar'
import type { PetType } from '../../types/PetType'

const SPECIES_FILTERS = ['All', 'Dog', 'Cat', 'Other'] as const
type SpeciesFilter = typeof SPECIES_FILTERS[number]

const FILTER_LABELS: Record<SpeciesFilter, string> = {
  All: 'all',
  Dog: 'dog',
  Cat: 'cat',
  Other: 'other',
}

export const FavoriteAnimalsSection = () => {
  const queryClient = useQueryClient()
  const { favoriteAnimalIds, removeFromFavorites } = useFavoriteAnimals()
  const { data: favoritePets = [], isLoading } = usePetsByIds(favoriteAnimalIds)
  const [selectedFilter, setSelectedFilter] = useState<SpeciesFilter>('All')

  const filteredPets = favoritePets.filter(pet => {
    if (selectedFilter === 'All') return true
    if (selectedFilter === 'Other') {
      return pet.species.toLowerCase() !== 'dog' && pet.species.toLowerCase() !== 'cat'
    }
    return pet.species.toLowerCase() === selectedFilter.toLowerCase()
  })

  const speciesCounts = {
    All: favoritePets.length,
    Dog: 0,
    Cat: 0,
    Other: 0,
  }

  favoritePets.forEach(pet => {
    const species = pet.species.toLowerCase()
    if (species === 'dog') {
      speciesCounts.Dog++
    } else if (species === 'cat') {
      speciesCounts.Cat++
    } else {
      speciesCounts.Other++
    }
  })



  const handleRemove = async (petId: string) => {
    const pet = favoritePets.find(p => p.id === petId)
    if (!pet) return

    const previousPets = queryClient.getQueryData<PetType[]>(['pets', 'byIds', favoriteAnimalIds])
    queryClient.setQueryData<PetType[]>(
      ['pets', 'byIds', favoriteAnimalIds],
      (old = []) => old.filter(p => p.id !== petId)
    )

    try {
      await removeFromFavorites({ id: pet.id, name: pet.name })
    } catch (error) {
      queryClient.setQueryData(['pets', 'byIds', favoriteAnimalIds], previousPets)
      console.error('Failed to remove favorite:', error)
    }
  }

  const renderEmptyState = () => (
    <Box
      sx={{
        textAlign: 'center',
        py: 6,
        color: 'text.secondary',
      }}
    >
      <Pets sx={{ fontSize: 64, mb: 2, opacity: 0.5 }} />
      <Typography variant="h6" gutterBottom>
        {selectedFilter === 'All'
          ? 'No favorite pets yet'
          : `No ${selectedFilter === 'Other' ? 'other' : selectedFilter.toLowerCase()} favorites`
        }
      </Typography>
      <Typography variant="body2">
        {selectedFilter === 'All'
          ? 'Start adding pets to your favorites to see them here'
          : `You haven't favorited any ${selectedFilter === 'Other' ? 'other animals' : `${selectedFilter.toLowerCase()}s`} yet`
        }
      </Typography>
    </Box>
  )

  const renderLoadingState = () => (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        py: 6,
      }}
    >
      <CircularProgress />
    </Box>
  )

  return (
    <Paper
      elevation={2}
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: 'background.paper',
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
        <Typography variant="h5">
          Favorite Pets ({favoriteAnimalIds.length})
        </Typography>

        {favoritePets.length > 0 && (
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {SPECIES_FILTERS.map(filter => (
              <Chip
                key={filter}
                label={`${FILTER_LABELS[filter]} ${speciesCounts[filter] > 0 ? `(${speciesCounts[filter]})` : ''}`}
                onClick={() => setSelectedFilter(filter)}
                color={selectedFilter === filter ? 'primary' : 'default'}
                variant={selectedFilter === filter ? 'filled' : 'outlined'}
                sx={{
                  fontWeight: selectedFilter === filter ? 600 : 400,
                  cursor: 'pointer',
                  '&:hover': {
                    backgroundColor: selectedFilter === filter ? 'primary.dark' : 'action.hover',
                  },
                }}
              />
            ))}
          </Box>
        )}
      </Box>

      {isLoading ? (
        renderLoadingState()
      ) : filteredPets.length === 0 ? (
        renderEmptyState()
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 3,
            justifyContent: { xs: 'center', sm: 'flex-start' },
          }}
        >
          {filteredPets.map(pet => (
            <Fade key={pet.id} in timeout={300}>
              <Box>
                <FavoritePetAvatar
                  pet={pet}
                  onRemove={handleRemove}
                  size={100}
                />
              </Box>
            </Fade>
          ))}
        </Box>
      )}
    </Paper>
  )
}
