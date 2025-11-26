import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { type LoginFormInputs, loginSchema } from '../schemas/loginSchema.ts'
import { supabase } from '../lib/supabaseClient.ts'
import { Box, Button, Card, CardContent, Link as MuiLink, TextField, Typography, } from '@mui/material'
import { InfoToast } from '../components/InfoToast.tsx'

const LoginPage = () => {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    defaultValues: {
      email: '',
      password: '',
    },
    resolver: zodResolver(loginSchema),
  })

  const handleLogin = async (data: LoginFormInputs) => {
    try {
      setErrorMessage('')
      setSuccessMessage('')
      setLoading(true)

      const { error } = await supabase.auth.signInWithPassword(data)

      if (error) {
        setErrorMessage(error.message)
        return
      }

      setSuccessMessage('Logged in successfully!')
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Card sx={{ boxShadow: 4 }}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 500, textAlign: 'center', mb: 1 }}
          >
            Welcome Back
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', mb: 4 }}
          >
            Sign in to your account to continue
          </Typography>

          <Box
            component="form"
            noValidate
            onSubmit={e => void handleSubmit(handleLogin)(e)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
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
              loading={loading}
              fullWidth
              sx={{ py: 1.5 }}
            >
              Sign In
            </Button>

            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ textAlign: 'center' }}
            >
              Don't have an account?{' '}
              <MuiLink
                href="/signup"
                underline="hover"
                sx={{ color: 'primary.main', fontWeight: 600 }}
              >
                Sign up
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

export const Route = createFileRoute('/login')({
  component: LoginPage,
})
