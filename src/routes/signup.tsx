import { useState } from 'react'
import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SignupFormInputs, signupSchema } from '../schemas/signupSchema.ts'
import { supabase } from '../lib/supabaseClient.ts'
import { createShelter } from '../services/shelterService.ts'
import {
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Link as MuiLink,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { Login } from '@mui/icons-material'
import { InfoToast } from '../components/InfoToast.tsx'

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignupFormInputs>({
    defaultValues: {
      name: '',
      email: '',
      password: '',
      role: undefined,
    },
    resolver: zodResolver(signupSchema),
  })

  const selectedRole = watch('role')

  const handleSignup = async (data: SignupFormInputs) => {
    try {
      setErrorMessage('')
      setLoading(true)

      const { error: authError, data: userData } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { name: data.name, role: data.role },
        },
      })

      if (authError) {
        setErrorMessage(authError.message)
        return
      }

      if (data.role === 'shelter' && userData.user) {
        try {
          await createShelter({
            name: data.shelterName,
            email: data.email,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            zip_code: data.zipCode,
            description: data.description,
          })
        } catch (shelterError) {
          console.error('Error creating shelter:', shelterError)
          setErrorMessage(
            'Account created but shelter setup failed. Please contact support.'
          )
          return
        }
      }

      setShowSuccessModal(true)
    } catch (err) {
      console.error(err)
      setErrorMessage('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleGoToLogin = async () => {
    await navigate({ to: '/login' })
  }

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Card sx={{ boxShadow: 4, maxWidth: 600, width: '100%' }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 500, textAlign: 'center', mb: 1 }}
          >
            Create Account
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', mb: 4 }}
          >
            Join our community as a shelter or adopter
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={e => void handleSubmit(handleSignup)(e)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Full Name"
                  fullWidth
                  variant="outlined"
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              )}
            />

            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  select
                  label="Role"
                  fullWidth
                  variant="outlined"
                  error={!!errors.role}
                  helperText={errors.role?.message}
                >
                  <MenuItem value="shelter">Shelter</MenuItem>
                  <MenuItem value="adopter">Adopter</MenuItem>
                </TextField>
              )}
            />

            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email Address"
                  type="email"
                  fullWidth
                  variant="outlined"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Password"
                  type="password"
                  fullWidth
                  variant="outlined"
                  error={!!errors.password}
                  helperText={errors.password?.message}
                />
              )}
            />

            {selectedRole === 'shelter' && (
              <>
                <Controller
                  name="shelterName"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Shelter Name"
                      fullWidth
                      variant="outlined"
                      error={!!(errors as any).shelterName}
                      helperText={(errors as any).shelterName?.message}
                    />
                  )}
                />

                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Phone Number"
                      fullWidth
                      variant="outlined"
                      placeholder="+420 XXX XXX XXX"
                      error={!!(errors as any).phone}
                      helperText={(errors as any).phone?.message}
                    />
                  )}
                />

                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Address"
                      fullWidth
                      variant="outlined"
                      error={!!(errors as any).address}
                      helperText={(errors as any).address?.message}
                    />
                  )}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Controller
                    name="city"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="City"
                        fullWidth
                        variant="outlined"
                        error={!!(errors as any).city}
                        helperText={(errors as any).city?.message}
                      />
                    )}
                  />

                  <Controller
                    name="zipCode"
                    control={control}
                    render={({ field }) => (
                      <TextField
                        {...field}
                        label="Zip Code"
                        fullWidth
                        variant="outlined"
                        error={!!(errors as any).zipCode}
                        helperText={(errors as any).zipCode?.message}
                      />
                    )}
                  />
                </Box>

                <Controller
                  name="state"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="State/Region"
                      fullWidth
                      variant="outlined"
                      placeholder="e.g., Praha, Jihomoravský kraj"
                      error={!!(errors as any).state}
                      helperText={(errors as any).state?.message}
                    />
                  )}
                />

                <Controller
                  name="description"
                  control={control}
                  render={({ field }) => (
                    <TextField
                      {...field}
                      label="Description (Optional)"
                      fullWidth
                      multiline
                      rows={3}
                      variant="outlined"
                      placeholder="Tell us about your shelter..."
                      error={!!(errors as any).description}
                      helperText={(errors as any).description?.message}
                    />
                  )}
                />
              </>
            )}

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              fullWidth
              sx={{ py: 1.5 }}
            >
              {loading ? 'Signing up...' : 'Sign Up'}
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'center' }}
            >
              Already have an account?{' '}
              <MuiLink
                component={Link}
                to="/login"
                underline="hover"
                sx={{ color: 'primary.main', fontWeight: 600 }}
              >
                Sign in
              </MuiLink>
            </Typography>
          </Box>
        </CardContent>
      </Card>

      <Dialog
        open={showSuccessModal}
        onClose={handleGoToLogin}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle sx={{ textAlign: 'center', pt: 4 }}>
          <Typography variant="h5" fontWeight={500}>
            Your account successfully created!
          </Typography>
        </DialogTitle>
        <DialogContent sx={{ textAlign: 'center', pb: 2 }}>
          <Typography variant="body1" color="text.secondary" component='p'>
            Please check your email and click the confirmation link to verify
            your account. After confirming your email, you'll be able to log in.
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: 'center', pb: 3, px: 3 }}>
          <Button
            variant="contained"
            size="large"
            startIcon={<Login />}
            onClick={handleGoToLogin}
            fullWidth
            sx={{ maxWidth: 300 }}
          >
            Go to Login
          </Button>
        </DialogActions>
      </Dialog>

      <InfoToast
        isOpen={Boolean(errorMessage)}
        close={() => {
          setErrorMessage('')
        }}
        severity="error"
        text={errorMessage}
      />
    </Box>
  )
}

export const Route = createFileRoute('/signup')({
  component: SignUp,
})
