import { createFileRoute } from '@tanstack/react-router'
import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient.ts'
import {
  Box,
  Button,
  Card,
  CardContent,
  Link as MuiLink,
  TextField,
  Typography,
} from '@mui/material'

const LoginPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) setError(error.message)
    else alert('Logged in successfully!')
    setLoading(false)
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
            onSubmit={e => void handleLogin(e)}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <TextField
              label="Email Address"
              type="email"
              fullWidth
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              variant="outlined"
            />

            <TextField
              label="Password"
              type="password"
              fullWidth
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              variant="outlined"
            />

            {error !== '' && (
              <Typography variant="body1" color="error">
                {error}
              </Typography>
            )}
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
                href="#"
                underline="hover"
                sx={{ color: 'primary.main', fontWeight: 600 }}
              >
                Sign up
              </MuiLink>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export const Route = createFileRoute('/login')({
  component: LoginPage,
})
