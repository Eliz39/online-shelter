import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  type SignupFormInputs,
  signupSchema,
} from '../lib/validationSchemas/signupSchema.ts'
import { supabase } from '../lib/supabaseClient.ts'
import {
  Box,
  Button,
  Card,
  CardContent,
  Link as MuiLink,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import { InfoToast } from '../components/InfoToast.tsx'

const SignUp = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
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

  const handleSignup = async (data: SignupFormInputs) => {
    try {
      setErrorMessage('')
      setLoading(true)

      const { error } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: { name: data.name, role: data.role },
        },
      })

      if (error) setErrorMessage(error.message)
      else setSuccessMessage('Account created successfully!')
    } catch (err) {
      console.error(err)
      setErrorMessage('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'linear-gradient(135deg, rgba(133, 216, 57, 0.1) 0%, rgba(237, 84, 129, 0.1) 100%)',
        py: 4,
      }}
    >
      <Card sx={{ boxShadow: 4 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, textAlign: 'center', mb: 1 }}
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
            onSubmit={handleSubmit(handleSignup)}
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
              name="name"
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
                href="/login"
                underline="hover"
                sx={{ color: 'primary.main', fontWeight: 600 }}
              >
                Sign in
              </MuiLink>
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <InfoToast
        isOpen={Boolean(errorMessage || successMessage)}
        close={() => {
          setErrorMessage('')
          setSuccessMessage('')
        }}
        severity={errorMessage !== '' ? 'error' : 'success'}
        text={errorMessage || successMessage}
      />
    </Box>
  )
}

export const Route = createFileRoute('/signup')({
  component: SignUp,
})
