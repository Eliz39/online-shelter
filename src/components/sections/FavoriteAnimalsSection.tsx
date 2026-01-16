import React from 'react'
import { Box, Chip, Divider, Paper, Typography } from '@mui/material'
import { Pets } from '@mui/icons-material'
import type { Animal, FavoriteAnimalsSectionProps } from '../../types/profile'
import { AVAILABLE_ANIMALS } from '../../constants/animals.ts'

export const FavoriteAnimalsSection: React.FC<FavoriteAnimalsSectionProps> = ({
  selectedAnimals,
  onSelectionChange,
}) => {
  const handleAnimalToggle = (animal: Animal) => {
    const isSelected = selectedAnimals.some(
      selected => selected.id === animal.id
    )

    if (isSelected) {
      const newSelection = selectedAnimals.filter(
        selected => selected.id !== animal.id
      )
      onSelectionChange(newSelection)
    } else {
      const newSelection = [...selectedAnimals, animal]
      onSelectionChange(newSelection)
    }
  }

  const isAnimalSelected = (animalId: string): boolean => {
    return selectedAnimals.some(animal => animal.id === animalId)
  }

  const renderAnimalChip = (animal: Animal) => {
    const isSelected = isAnimalSelected(animal.id)

    return (
      <Chip
        key={animal.id}
        label={animal.name}
        icon={<Pets />}
        onClick={() => handleAnimalToggle(animal)}
        color={isSelected ? 'primary' : 'default'}
        variant={isSelected ? 'filled' : 'outlined'}
        sx={{
          margin: 0.5,
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: isSelected ? 'primary.dark' : 'action.hover',
          },
        }}
      />
    )
  }

  const renderEmptyState = () => (
    <Box
      sx={{
        textAlign: 'center',
        py: 4,
        color: 'text.secondary',
      }}
    >
      <Pets sx={{ fontSize: 48, mb: 2, opacity: 0.5 }} />
      <Typography variant="h6" gutterBottom>
        No favorite animals selected
      </Typography>
      <Typography variant="body2">Choose your favorite animals</Typography>
    </Box>
  )

  const renderSelectedAnimals = () => (
    <Box sx={{ mb: 3 }}>
      <Typography variant="h6" gutterBottom>
        Your Favorite Animals ({selectedAnimals.length})
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
        {selectedAnimals.map(animal => renderAnimalChip(animal))}
      </Box>
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
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Favorite Animals
      </Typography>

      {selectedAnimals.length === 0
        ? renderEmptyState()
        : renderSelectedAnimals()}

      {selectedAnimals.length > 0 && <Divider sx={{ my: 3 }} />}

      <Box>
        <Typography variant="h6" gutterBottom>
          Choose Your Favorites
        </Typography>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 'medium' }}>
            Animals
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {AVAILABLE_ANIMALS.map(animal => renderAnimalChip(animal))}
          </Box>
        </Box>
      </Box>
    </Paper>
  )
}
