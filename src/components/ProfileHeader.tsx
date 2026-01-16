import { Avatar, Box, Typography, useMediaQuery, useTheme } from '@mui/material'
import { Pets } from '@mui/icons-material'
import type { ProfileHeaderProps } from '../types/profile'

export const ProfileHeader = ({ username, avatarSrc }: ProfileHeaderProps) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 2, md: 3 },
        flex: 1,
      }}
    >
      <Avatar
        src={avatarSrc}
        sx={{
          width: { xs: 56, md: 64 },
          height: { xs: 56, md: 64 },
          bgcolor: 'primary.main',
          boxShadow: theme.shadows[2],
        }}
      >
        <Pets sx={{ fontSize: { xs: 28, md: 32 } }} />
      </Avatar>

      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          component="h1"
          sx={{
            fontWeight: 'medium',
            color: 'text.primary',
            wordBreak: 'break-word',
          }}
        >
          Welcome, {username}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
          Manage your profile and favorite animals
        </Typography>
      </Box>
    </Box>
  )
}
