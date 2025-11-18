import { Box } from '@mui/material'

export const Loading = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100dvh',
        gap: 1,
      }}
    >
      {[0, 1, 2].map(i => (
        <Box
          key={i}
          sx={{
            width: 12,
            height: 12,
            borderRadius: '50%',
            backgroundColor: i === 1 ? 'secondary.main' : 'primary.main',
            animation: 'jump 0.6s ease-in-out infinite',
            animationDelay: `${i * 0.1}s`,
            '@keyframes jump': {
              '0%, 100%': { transform: 'translateY(0)' },
              '50%': { transform: 'translateY(-14px)' },
            },
          }}
        />
      ))}
    </Box>
  )
}
