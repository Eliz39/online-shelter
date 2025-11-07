import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<'shelter' | 'adopter' | undefined>(undefined)
  const [errorMessage, setErrorMessage] = useState('')
  const [successMessage, setSuccessMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage('')
    setLoading(true)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name, role },
      },
    })

    if (error) setErrorMessage(error.message)
    else setSuccessMessage('Account created successfully!')

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
            onSubmit={e => {
              void handleSignup(e)
            }}
            sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
          >
            <TextField
              label="Full Name"
              fullWidth
              required
              value={name}
              onChange={e => setName(e.target.value)}
              variant="outlined"
            />

            <TextField
              select
              label="Role"
              fullWidth
              required
              value={role}
              onChange={e => setRole(e.target.value as 'shelter' | 'adopter')}
              variant="outlined"
            >
              <MenuItem value="shelter">Shelter</MenuItem>
              <MenuItem value="adopter">Adopter</MenuItem>
            </TextField>

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
