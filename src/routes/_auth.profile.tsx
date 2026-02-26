import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Fade,
  Paper,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import { Edit } from '@mui/icons-material'
import { useAuth } from '../context/useAuth.tsx'
import { ProfileHeader } from '../components/ProfileHeader'
import { ProfileEditForm } from '../components/ProfileEditForm'
import { FavoriteAnimalsSection } from '../components/sections/FavoriteAnimalsSection'
import { AdoptionRequestsSection } from '../components/sections/AdoptionRequestsSection'
import { AddAnimalSection } from '../components/sections/AddAnimalSection'
import type { ProfileFormData } from '../types/profile'
import { useSaveProfile } from '../hooks/useProfile.ts'
import {
  useAdoptionRequestsByEmail,
  useAdoptionRequestsByShelterId,
} from '../hooks/useAdoptionRequests'
import { supabase } from '../lib/supabaseClient'
import { useQuery } from '@tanstack/react-query'

const Profile = () => {
  const { user } = useAuth()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const [editFormOpen, setEditFormOpen] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const saveProfileMutation = useSaveProfile()

  const username =
    user?.user_metadata?.name || user?.email?.split('@')[0] || 'User'
  const phoneNumber = user?.user_metadata?.phoneNumber || ''
  const userEmail = user?.email || ''
  const userRole = user?.user_metadata?.role as 'adopter' | 'shelter' | undefined

  // Get shelter ID if user is a shelter
  const { data: shelter } = useQuery({
    queryKey: ['shelter', 'byEmail', userEmail],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('shelters')
        .select('id')
        .eq('email', userEmail)
        .single()

      if (error) throw error
      return data
    },
    enabled: userRole === 'shelter' && !!userEmail,
  })

  // Fetch adoption requests based on role
  const { data: adopterRequests, isLoading: adopterRequestsLoading } =
    useAdoptionRequestsByEmail(userRole === 'adopter' ? userEmail : undefined)

  const { data: shelterRequests, isLoading: shelterRequestsLoading } =
    useAdoptionRequestsByShelterId(
      userRole === 'shelter' ? shelter?.id : undefined
    )

  const adoptionRequests =
    userRole === 'adopter' ? adopterRequests : shelterRequests
  const adoptionRequestsLoading =
    userRole === 'adopter' ? adopterRequestsLoading : shelterRequestsLoading

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

  const handleCloseSuccessAlert = () => {
    setSaveSuccess(false)
  }

  const handleCloseErrorAlert = () => {
    saveProfileMutation.reset()
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

          {userRole === 'adopter' && (
            <Fade in timeout={700}>
              <Box sx={{ mb: 4 }}>
                <FavoriteAnimalsSection />
              </Box>
            </Fade>
          )}

          <Fade in timeout={900}>
            <Box sx={{ mb: 4 }}>
              <Paper
                elevation={1}
                sx={{
                  p: { xs: 2, md: 3 },
                  borderRadius: 2,
                  background: `linear-gradient(135deg, ${theme.palette.secondary.light}10, ${theme.palette.background.paper})`,
                }}
              >
                <Typography
                  variant="h5"
                  fontWeight={600}
                  gutterBottom
                  sx={{ mb: 3 }}
                >
                  Adoption Requests
                </Typography>
                <Divider sx={{ mb: 3 }} />
                {adoptionRequestsLoading ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography color="text.secondary">Loading...</Typography>
                  </Box>
                ) : (
                  <AdoptionRequestsSection
                    requests={adoptionRequests || []}
                    userRole={userRole || 'adopter'}
                  />
                )}
              </Paper>
            </Box>
          </Fade>

          {userRole === 'shelter' && shelter?.id && (
            <Fade in timeout={1100}>
              <Box sx={{ mb: 4 }}>
                <AddAnimalSection shelterId={shelter.id} />
              </Box>
            </Fade>
          )}

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
            open={!!saveProfileMutation.error}
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
                  onClick={handleCloseErrorAlert}
                  sx={{ ml: 1 }}
                >
                  Understand
                </Button>
              }
            >
              {saveProfileMutation.error?.message || 'Failed to save profile'}
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
