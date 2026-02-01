import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Typography,
} from '@mui/material'
import { useNavigate } from '@tanstack/react-router'
import type { PetType } from '../types/PetType.ts'

type PetCardProps = {
  pet: PetType
}

export const PetCard = ({ pet }: PetCardProps) => {
  const navigate = useNavigate()

  const handleCardClick = () => {
    navigate({ to: `/pets/${pet.id}` })
  }

  const handleMeetClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate({ to: `/pets/${pet.id}` })
  }

  const getAgeText = (age: number) => {
    if (age === 1) return '1 year old'
    return `${age} years old`
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'available':
        return 'success'
      case 'pending':
        return 'warning'
      case 'adopted':
        return 'default'
      default:
        return 'primary'
    }
  }

  return (
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease-in-out',
        cursor: 'pointer',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: 6,
        },
        borderRadius: 2,
        overflow: 'hidden',
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="280"
        image={pet.image_url}
        alt={`${pet.name} - ${pet.species}`}
        sx={{
          objectFit: 'cover',
          transition: 'transform 0.3s ease-in-out',
          '&:hover': {
            transform: 'scale(1.05)',
          },
        }}
      />
      <CardContent
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: 2,
          '&:last-child': { pb: 2 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            mb: 1,
            gap: 1,
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: 'text.primary',
              lineHeight: 1.2,
              flex: 1,
              minWidth: 0,
            }}
            noWrap
          >
            {pet.name}
          </Typography>
          <Chip
            label={pet.species}
            size="small"
            sx={{
              bgcolor:
                pet.species === 'Dog' ? 'primary.main' : 'secondary.main',
              color: 'white',
              fontWeight: 600,
              flexShrink: 0,
            }}
          />
        </Box>

        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            <strong>{pet.color}</strong> •{' '}
            <strong>{getAgeText(pet.age)}</strong> • <strong>{pet.size}</strong>
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Gender:</strong> {pet.gender}
          </Typography>
        </Box>

        <Box sx={{ mb: 2 }}>
          <Chip
            label={pet.status}
            size="small"
            color={getStatusColor(pet.status) as any}
            variant="outlined"
            sx={{ fontWeight: 500 }}
          />
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            flexGrow: 1,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            lineHeight: 1.4,
          }}
        >
          {pet.description}
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleMeetClick}
          sx={{
            mt: 'auto',
            py: 1,
            fontWeight: 600,
            borderRadius: 1.5,
            textTransform: 'none',
            fontSize: '0.95rem',
          }}
        >
          Meet {pet.name}
        </Button>
      </CardContent>
    </Card>
  )
}
