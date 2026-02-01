import { useEffect, useState } from 'react'
import { createFileRoute, useNavigate, useParams } from '@tanstack/react-router'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Fade,
  Paper,
  Skeleton,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Email, Favorite, LocationOn, Phone } from '@mui/icons-material'
import type { PetType } from '../types/PetType'
import { getPetById, PetServiceError } from '../services/petService'
import { BackButton } from '../components/BackButton.tsx'

const PetDetail = () => {
  const { petId } = useParams({ from: '/pets/$petId' })
  const navigate = useNavigate()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [pet, setPet] = useState<PetType | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const isAvailable = pet?.status === 'available'

  useEffect(() => {
    const loadPet = async () => {
      setLoading(true)
      setError(null)

      try {
        const petData = await getPetById(petId)
        if (petData) {
          setPet(petData)
        } else {
          setError('Pet not found')
        }
      } catch (err) {
        console.error('Failed to load pet:', err)
        const errorMessage =
          err instanceof PetServiceError
            ? err.message
            : 'Failed to load pet details'
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    loadPet()
  }, [petId])

  const handleBackClick = () => {
    navigate({ to: '/pets' })
  }

  const handleAdoptClick = () => {
    // TODO: Implement adoption process
    alert('Adoption process would start here!')
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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <Box sx={{ mb: 3 }}>
          <Skeleton
            variant="rectangular"
            width={120}
            height={40}
            sx={{ borderRadius: 1 }}
          />
        </Box>
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 4,
          }}
        >
          <Skeleton
            variant="rectangular"
            width="100%"
            height={400}
            sx={{ borderRadius: 2 }}
          />
          <Box>
            <Skeleton variant="text" width="60%" height={40} />
            <Skeleton variant="text" width="40%" height={24} sx={{ mb: 2 }} />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={120}
              sx={{ borderRadius: 1, mb: 2 }}
            />
            <Skeleton
              variant="rectangular"
              width="100%"
              height={200}
              sx={{ borderRadius: 1 }}
            />
          </Box>
        </Box>
      </Container>
    )
  }

  if (error || !pet) {
    return (
      <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
        <BackButton text="Back to Pets" handleBackClick={handleBackClick} />

        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error || 'Pet not found'}
        </Alert>
      </Container>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Fade in timeout={500}>
        <Box>
          <BackButton text="Back to Pets" handleBackClick={handleBackClick} />

          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
              gap: 4,
            }}
          >
            <Paper
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
                position: 'relative',
                height: 'fit-content',
                background: 'transparent',
              }}
            >
              <Box
                component="img"
                src={pet.image_url}
                alt={`${pet.name} - ${pet.species}`}
                sx={{
                  width: '100%',
                  height: { xs: 300, md: 400 },
                  objectFit: 'cover',
                }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 16,
                  right: 16,
                  display: 'flex',
                  gap: 1,
                }}
              >
                <Button
                  variant="contained"
                  size="small"
                  sx={{
                    minWidth: 'auto',
                    p: 1,
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    color: 'text.primary',
                    '&:hover': {
                      bgcolor: 'rgba(255, 255, 255, 1)',
                    },
                  }}
                >
                  <Favorite />
                </Button>
              </Box>
            </Paper>

            <Box
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}
                >
                  <Typography
                    variant={isMobile ? 'h4' : 'h3'}
                    component="h1"
                    sx={{ fontWeight: 'bold', color: 'text.primary' }}
                  >
                    {pet.name}
                  </Typography>
                  <Chip
                    label={pet.species}
                    sx={{
                      bgcolor:
                        pet.species === 'Dog'
                          ? 'primary.main'
                          : 'secondary.main',
                      color: 'white',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      px: 1,
                    }}
                  />
                </Box>
                <Chip
                  label={pet.status}
                  color={getStatusColor(pet.status) as any}
                  variant="outlined"
                  sx={{ fontWeight: 500 }}
                />
              </Box>

              <Card sx={{ mb: 3, borderRadius: 2 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    Quick Info
                  </Typography>
                  <Box
                    sx={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(2, 1fr)',
                      gap: 2,
                    }}
                  >
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Age
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {getAgeText(pet.age)}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Gender
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {pet.gender}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Size
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {pet.size}
                      </Typography>
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Color
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 500 }}>
                        {pet.color}
                      </Typography>
                    </Box>
                  </Box>
                </CardContent>
              </Card>

              <Card sx={{ mb: 3, flexGrow: 1, borderRadius: 2 }}>
                <CardContent>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 600 }}
                  >
                    About {pet.name}
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ lineHeight: 1.6 }}
                  >
                    {pet.description}
                  </Typography>
                </CardContent>
              </Card>

              <Box
                sx={{
                  display: 'flex',
                  gap: 2,
                  flexDirection: isMobile ? 'column' : 'row',
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  onClick={handleAdoptClick}
                  disabled={!isAvailable}
                  sx={{
                    flex: 1,
                    py: 1.5,
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    borderRadius: 2,
                  }}
                >
                  {isAvailable ? `Adopt ${pet.name}` : `${pet.status}`}
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    flex: isMobile ? 1 : 0,
                    py: 1.5,
                    fontWeight: 600,
                    borderRadius: 2,
                    minWidth: isMobile ? 'auto' : 140,
                  }}
                >
                  Contact Us
                </Button>
              </Box>
            </Box>
          </Box>

          <Paper
            elevation={2}
            sx={{
              mt: 4,
              p: 3,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.light}10, ${theme.palette.background.paper})`,
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ fontWeight: 600, mb: 2 }}
            >
              Contact Information
            </Typography>
            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' },
                gap: 3,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <LocationOn color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Location
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Animal Shelter
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Phone
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    (555) 123-4567
                  </Typography>
                </Box>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email color="primary" />
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Email
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    adopt@shelter.com
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Paper>
        </Box>
      </Fade>
    </Container>
  )
}

export const Route = createFileRoute('/pets/$petId')({
  component: PetDetail,
})
