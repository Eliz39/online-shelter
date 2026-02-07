import { useState, useRef } from 'react'
import {
  Box,
  Typography,
  Button,
  IconButton,
  Container,
  useTheme,
  useMediaQuery,
  Fade,
  Skeleton,
} from '@mui/material'
import {
  ArrowForward,
  ChevronLeft,
  ChevronRight,
  Pets as PetsIcon,
  Refresh,
} from '@mui/icons-material'
import { useNavigate } from '@tanstack/react-router'
import { PetCard } from './PetCard'
import type { PetType } from '../types/PetType'

interface PetCarouselProps {
  pets: PetType[]
  loading?: boolean
  error?: string | null
  onRetry?: () => void
}

export const PetCarousel = ({ pets, loading = false, error = null, onRetry }: PetCarouselProps) => {
  const theme = useTheme()
  const navigate = useNavigate()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showLeftArrow, setShowLeftArrow] = useState(false)
  const [showRightArrow, setShowRightArrow] = useState(true)

  const getCardsToShow = () => {
    if (isMobile) return 1
    if (isTablet) return 2
    return 3
  }

  const cardWidth = 100 / getCardsToShow()
  const gap = isMobile ? 16 : 16

  const handleScroll = () => {
    const container = scrollContainerRef.current
    if (!container) return

    const { scrollLeft, scrollWidth, clientWidth } = container
    setShowLeftArrow(scrollLeft > 0)
    setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction: 'left' | 'right') => {
    const container = scrollContainerRef.current
    if (!container) return

    const cardWidthPx = container.clientWidth / getCardsToShow()
    const scrollAmount = cardWidthPx * getCardsToShow()

    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
  }

  const handleSeeAllClick = () => {
    navigate({ to: '/pets' })
  }

  const LoadingSkeleton = () => (
    <Box
      sx={{
        display: 'flex',
        gap: 2,
        overflowX: 'hidden',
        pb: 2,
      }}
    >
      {Array.from({ length: getCardsToShow() }).map((_, index) => (
        <Box
          key={index}
          sx={{
            minWidth: `${cardWidth}%`,
            maxWidth: `${cardWidth}%`,
          }}
        >
          <Box
            sx={{
              height: 400,
              borderRadius: 2,
              overflow: 'hidden',
              bgcolor: 'grey.100',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Skeleton variant="rectangular" width="100%" height={280} />
            <Box sx={{ p: 2, flexGrow: 1 }}>
              <Skeleton variant="text" width="60%" height={24} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="40%" height={16} sx={{ mb: 1 }} />
              <Skeleton variant="text" width="80%" height={32} sx={{ mb: 2 }} />
              <Skeleton variant="rectangular" width="100%" height={36} sx={{ borderRadius: 1 }} />
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  )

  const ErrorState = () => (
    <Box
      sx={{
        textAlign: 'center',
        py: 6,
        px: 3,
      }}
    >
      <PetsIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        Unable to load pets
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {error}
      </Typography>
      {onRetry && (
        <Button
          variant="outlined"
          startIcon={<Refresh />}
          onClick={onRetry}
        >
          Try Again
        </Button>
      )}
    </Box>
  )

  const EmptyState = () => (
    <Box
      sx={{
        textAlign: 'center',
        py: 6,
        px: 3,
      }}
    >
      <PetsIcon sx={{ fontSize: 48, color: 'text.disabled', mb: 2 }} />
      <Typography variant="h6" color="text.secondary" gutterBottom>
        No pets available
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Check back soon for new arrivals!
      </Typography>
    </Box>
  )

  const renderContent = () => {
    if (loading) {
      return <LoadingSkeleton />
    }
    if (error) {
      return <ErrorState />
    }
    if (pets.length === 0) {
      return <EmptyState />
    }

    return (
      <>
        <Box sx={{ position: 'relative' }}>
          {showLeftArrow && !isMobile && (
            <IconButton
              onClick={() => scroll('left')}
              sx={{
                position: 'absolute',
                left: -20,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': {
                  bgcolor: 'background.paper',
                  boxShadow: 4,
                },
              }}
            >
              <ChevronLeft />
            </IconButton>
          )}

          {showRightArrow && !isMobile && (
            <IconButton
              onClick={() => scroll('right')}
              sx={{
                position: 'absolute',
                right: -20,
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'background.paper',
                boxShadow: 2,
                '&:hover': {
                  bgcolor: 'background.paper',
                  boxShadow: 4,
                },
              }}
            >
              <ChevronRight />
            </IconButton>
          )}

          <Box
            ref={scrollContainerRef}
            onScroll={handleScroll}
            sx={{
              display: 'flex',
              gap: 2,
              overflowX: 'auto',
              scrollbarWidth: 'none',
              '&::-webkit-scrollbar': {
                display: 'none',
              },
              pb: 2,
              px: { xs: 0, sm: 1, md: 3 },
              scrollBehavior: 'smooth',
              scrollSnapType: isMobile ? 'x mandatory' : 'none',
            }}
          >
            {pets.map((pet, index) => (
              <Box
                key={pet.id}
                sx={{
                  minWidth: `calc(${cardWidth}% - ${gap * (getCardsToShow() - 1) / getCardsToShow()}px)`,
                  maxWidth: `calc(${cardWidth}% - ${gap * (getCardsToShow() - 1) / getCardsToShow()}px)`,
                  scrollSnapAlign: isMobile ? 'start' : 'none',
                }}
              >
                <Fade in timeout={500 + index * 100}>
                  <Box>
                    <PetCard pet={pet} />
                  </Box>
                </Fade>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ textAlign: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            endIcon={<ArrowForward />}
            onClick={handleSeeAllClick}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
            }}
          >
            See All Pets
          </Button>
        </Box>

        {isMobile && pets.length > 1 && (
          <Box sx={{ textAlign: 'center', mt: 2, opacity: 0.6 }}>
            <Typography variant="caption" color="text.secondary">
              Swipe to see more pets →
            </Typography>
          </Box>
        )}
      </>
    )
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      <Fade in timeout={500}>
        <Box>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography
              variant="h3"
              component="h2"
              sx={{
                fontWeight: 'bold',
                color: 'text.primary',
                mb: 2,
                fontSize: { xs: '2rem', md: '2.5rem' },
              }}
            >
              Available for Adoption
            </Typography>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}
            >
              Meet our wonderful animals waiting for their forever homes
            </Typography>
          </Box>

          {renderContent()}
        </Box>
      </Fade>
    </Container>
  )
}