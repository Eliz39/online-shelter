import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Alert,
  Box,
  Button,
  Container,
  Fade,
  Paper,
  Skeleton,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Edit, Refresh } from '@mui/icons-material'
import { useAuth } from '../context/useAuth.tsx'
import { ProfileHeader } from '../components/ProfileHeader'
import { ProfileEditForm } from '../components/ProfileEditForm'
import { FavoriteAnimalsSection } from '../components/sections/FavoriteAnimalsSection'
import type { Animal, ProfileFormData } from '../types/profile'
import { AVAILABLE_ANIMALS, getAnimalsByIds } from '../constants/animals'
import {
  useFavoriteAnimals,
  useSaveProfile,
  useSaveFavoriteAnimals,
} from '../hooks/useProfile.ts'

const Profile = () => {
  const { user } = useAuth()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const {
    data: favoriteAnimalIds = [],
    isLoading: loading,
    error: loadError,
    refetch,
  } = useFavoriteAnimals()

  const saveProfileMutation = useSaveProfile()
  const saveFavoritesMutation = useSaveFavoriteAnimals()

  const favoriteAnimals = getAnimalsByIds(favoriteAnimalIds)
  const saveError =
    saveProfileMutation.error?.message || saveFavoritesMutation.error?.message

  const username =
    user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'
  const phoneNumber = user?.user_metadata?.phoneNumber || ''
  const userEmail = user?.email || ''

  const handleRetry = () => {
    refetch()
  }

  const handleEditProfile = () => {
    setEditFormOpen(true)
  }

  const handleCloseEditForm = () => {
    setEditFormOpen(false)
    saveProfileMutation.reset()
  }

  const handleSaveProfile = async (data: ProfileFormData) => {
    if (!user?.id) {
      throw new Error('User not authenticated')
    }

    try {
      await saveProfileMutation.mutateAsync(data)
      setSaveSuccess(true)
    } catch (error) {
      throw error
    }
  }

  const handleFavoriteAnimalsChange = async (animals: Animal[]) => {
    if (!user?.id) {
      return
    }

    try {
      const animalId = animals.map(animal => animal.id)[0]
      await saveFavoritesMutation.mutateAsync({
        userId: user.id,
        favoriteAnimalId: animalId,
      })
      setSaveSuccess(true)
    } catch (error) {
      console.error('Failed to save favorite animals:', error)
    }
  }

  const handleCloseSuccessAlert = () => {
    setSaveSuccess(false)
  }

  const handleCloseErrorAlert = () => {
    saveProfileMutation.reset()
    saveFavoritesMutation.reset()
  }

  const LoadingSkeleton = () => (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: isMobile ? 'column' : 'row',
          justifyContent: 'space-between',
          alignItems: isMobile ? 'stretch' : 'flex-start',
          mb: 3,
          gap: isMobile ? 2 : 0,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Skeleton variant="circular" width={64} height={64} />
          <Skeleton variant="text" width={200} height={40} />
        </Box>
        <Skeleton
          variant="rectangular"
          width={140}
          height={40}
          sx={{ borderRadius: 1 }}
        />
      </Box>
      <Skeleton
        variant="rectangular"
        width="100%"
        height={300}
        sx={{ borderRadius: 2 }}
      />
    </Container>
  )

  const ErrorState = () => (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Paper
        elevation={2}
        sx={{
          p: 4,
          textAlign: 'center',
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" color="error" gutterBottom>
          Unable to load profile
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
          {loadError?.message || 'Failed to load your favorite animals'}
        </Typography>
        <Button
          variant="contained"
          startIcon={<Refresh />}
          onClick={handleRetry}
        >
          Try Again
        </Button>
      </Paper>
    </Container>
  )

  if (loading) {
    return <LoadingSkeleton />
  }

  if (loadError && favoriteAnimals.length === 0) {
    return <ErrorState />
  }

  return (
    <Container maxWidth="md" sx={{ py: { xs: 2, md: 4 } }}>
      <Fade in timeout={500}>
        <Box>
          <Paper
            elevation={1}
            sx={{
              p: { xs: 2, md: 3 },
              mb: 3,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.light}15, ${theme.palette.background.paper})`,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between',
                alignItems: isMobile ? 'stretch' : 'flex-start',
                gap: isMobile ? 2 : 0,
              }}
            >
              <ProfileHeader username={username} />
              <Button
                variant="contained"
                startIcon={<Edit />}
                onClick={handleEditProfile}
                sx={{
                  mt: isMobile ? 0 : 2,
                  alignSelf: isMobile ? 'stretch' : 'flex-start',
                  minHeight: 44,
                }}
                size={isMobile ? 'large' : 'medium'}
              >
                Edit Profile
              </Button>
            </Box>
          </Paper>

          <Fade in timeout={700}>
            <Box sx={{ mb: 4 }}>
              <FavoriteAnimalsSection
                selectedAnimals={favoriteAnimals}
                availableAnimals={AVAILABLE_ANIMALS}
                onSelectionChange={handleFavoriteAnimalsChange}
              />
            </Box>
          </Fade>

          <ProfileEditForm
            open={editFormOpen}
            initialData={{
              username,
              userEmail,
              phoneNumber,
            }}
            onClose={handleCloseEditForm}
            onSave={handleSaveProfile}
          />

          <Snackbar
            open={saveSuccess}
            autoHideDuration={4000}
            onClose={handleCloseSuccessAlert}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: isMobile ? 'center' : 'right',
            }}
          >
            <Alert
              onClose={handleCloseSuccessAlert}
              severity="success"
              variant="filled"
              sx={{
                width: '100%',
                borderRadius: 2,
              }}
            >
              Profile updated successfully!
            </Alert>
          </Snackbar>

          <Snackbar
            open={!!saveError}
            autoHideDuration={6000}
            onClose={handleCloseErrorAlert}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: isMobile ? 'center' : 'right',
            }}
          >
            <Alert
              onClose={handleCloseErrorAlert}
              severity="error"
              variant="filled"
              sx={{
                width: '100%',
                borderRadius: 2,
              }}
              action={
                <Button
                  color="inherit"
                  size="small"
                  onClick={handleRetry}
                  sx={{ ml: 1 }}
                >
                  Retry
                </Button>
              }
            >
              {saveError}
            </Alert>
          </Snackbar>
        </Box>
      </Fade>
    </Container>
  )
}

export const Route = createFileRoute('/_auth/profile')({
  component: Profile,
})
