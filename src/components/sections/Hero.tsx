import { Box, Button, Stack, Typography } from '@mui/material'
import { Link } from '@tanstack/react-router'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import heroImg from '../../assets/hero-cat.jpg'

export const Hero = () => {
  return (
    <Box
      sx={{
        position: 'relative',
        height: 'auto',
        backgroundImage: `url(${heroImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        margin: '-16px',
        '&::before': {
          content: '""',
          position: 'absolute',
          inset: 0,
          background: 'rgba(255, 255, 255, 0.35)',
        },
      }}
    >
      <Box
        sx={{
          maxWidth: 'lg',
          position: 'relative',
          mx: 'auto',
          px: { xs: 2, sm: 3, lg: 4 },
          py: { xs: 10, md: 16 },
        }}
      >
        <Box sx={{ maxWidth: '32rem', position: 'relative', zIndex: 1, py: 1 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: {
                xs: '2.5rem',
                sm: '3rem',
                md: '3.75rem',
                lg: '4.5rem',
              },
              fontWeight: 500,
              color: 'text.primary',
              mb: 3,
              lineHeight: 1.2,
              textWrap: 'balance',
            }}
          >
            Find a Friend —
            <Box component="span" sx={{ color: 'primary.main' }}>
              Save a Life
            </Box>
          </Typography>

          <Typography
            sx={{
              fontSize: { xs: '1.125rem', md: '1.25rem' },
              color: 'text.secondary',
              mb: 4,
              lineHeight: 1.7,
              textWrap: 'pretty',
            }}
          >
            Every pet deserves a loving home. Browse our adoptable animals and
            give a deserving companion their forever family.
          </Typography>

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Button
              component={Link}
              to="/pets"
              size="large"
              sx={{
                backgroundColor: 'primary.main',
                color: '#fff',
                px: 4,
                py: 2,
                fontSize: { xs: '1rem', md: '1.125rem' },
                borderRadius: 3,
                boxShadow: 3,
                '&:hover': {
                  backgroundColor: 'primary.main',
                  opacity: 0.9,
                  boxShadow: 6,
                },
              }}
            >
              Browse Pets
              <ArrowRightIcon sx={{ ml: 1 }} />
            </Button>

            <Button
              component={Link}
              to="/about"
              size="large"
              variant="outlined"
              sx={{
                fontSize: { xs: '1rem', md: '1.125rem' },
                px: 4,
                py: 2,
                borderRadius: 3,
                borderWidth: 2,
                borderColor: 'secondary.main',
                color: 'secondary.main',
                '&:hover': {
                  backgroundColor: 'secondary.main',
                  color: '#fff',
                  borderColor: 'secondary.main',
                },
              }}
            >
              Learn More
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}
