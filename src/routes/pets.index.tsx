import { useState } from 'react'
import { createFileRoute } from '@tanstack/react-router'
import {
  Container,
  Typography,
  Box,
  TextField,
  InputAdornment,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Paper,
  Fade,
  CircularProgress,
  useTheme,
  useMediaQuery,
  Button,
} from '@mui/material'
import { Search, Pets as PetsIcon, FilterList, Refresh } from '@mui/icons-material'
import { PetCard } from '../components/PetCard'
import type { PetType } from '../types/PetType'
import { usePets } from '../hooks/usePets.ts'

const Pets = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const { data: pets = [], isLoading: loading, error, refetch } = usePets()
  const [searchTerm, setSearchTerm] = useState('')
  const [speciesFilter, setSpeciesFilter] = useState('All')
  const [sizeFilter, setSizeFilter] = useState('All')
  const [ageFilter, setAgeFilter] = useState('All')

  const handleRetry = () => {
    refetch()
  }

  const filteredPets = pets.filter(pet => {
    const matchesSearch = pet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pet.color.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesSpecies = speciesFilter === 'All' ||
      pet.species.toLowerCase() === speciesFilter.toLowerCase()
    const matchesSize = sizeFilter === 'All' ||
      pet.size.toLowerCase() === sizeFilter.toLowerCase()
    const matchesAge = ageFilter === 'All' ||
      (ageFilter === 'Young' && pet.age <= 2) ||
      (ageFilter === 'Adult' && pet.age > 2 && pet.age <= 7) ||
      (ageFilter === 'Senior' && pet.age > 7)

    return matchesSearch && matchesSpecies && matchesSize && matchesAge
  })

  const getUniqueValues = (key: keyof PetType) => {
    const values = pets.map(pet => {
      const value = pet[key] as string
      return value.toLowerCase()
    })
    const uniqueValues = Array.from(new Set(values))
    // Return with proper capitalization (first letter uppercase)
    return uniqueValues.map(value =>
      value.charAt(0).toUpperCase() + value.slice(1)
    )
  }

  const LoadingSkeleton = () => (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
      gap: 3
    }}>
      {Array.from({ length: 6 }).map((_, index) => (
        <Paper
          key={index}
          elevation={2}
          sx={{
            height: 400,
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Box
            sx={{
              height: 280,
              bgcolor: 'grey.200',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <CircularProgress />
          </Box>
          <Box sx={{ p: 2, flexGrow: 1 }}>
            <Box sx={{ height: 24, bgcolor: 'grey.200', borderRadius: 1, mb: 1 }} />
            <Box sx={{ height: 16, bgcolor: 'grey.100', borderRadius: 1, mb: 1 }} />
            <Box sx={{ height: 32, bgcolor: 'grey.100', borderRadius: 1, mb: 2 }} />
            <Box sx={{ height: 36, bgcolor: 'primary.light', borderRadius: 1 }} />
          </Box>
        </Paper>
      ))}
    </Box>
  )

  const ErrorState = () => (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        textAlign: 'center',
        borderRadius: 2,
      }}
    >
      <Typography variant="h6" color="error" gutterBottom>
        Unable to load pets
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        {error?.message || 'Failed to load pets. Please try again.'}
      </Typography>
      <Button
        variant="contained"
        startIcon={<Refresh />}
        onClick={handleRetry}
      >
        Try Again
      </Button>
    </Paper>
  )

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, md: 4 } }}>
      <Fade in timeout={500}>
        <Box>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
              <PetsIcon sx={{ fontSize: 40, color: 'primary.main', mr: 1 }} />
              <Typography
                variant={isMobile ? 'h4' : 'h3'}
                component="h1"
                sx={{
                  fontWeight: 'bold',
                  color: 'text.primary',
                }}
              >
                Find Your Perfect Companion
              </Typography>
            </Box>
            <Typography
              variant="h6"
              color="text.secondary"
              sx={{ maxWidth: 600, mx: 'auto' }}
            >
              Discover loving pets waiting for their forever homes. Each one has a unique personality and story to share.
            </Typography>
          </Box>

          {!error && (
            <Paper
              elevation={2}
              sx={{
                p: 3,
                mb: 4,
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.light}10, ${theme.palette.background.paper})`,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <FilterList sx={{ mr: 1, color: 'text.secondary' }} />
                <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
                  Search & Filter
                </Typography>
              </Box>

              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', md: '2fr 1fr 1fr 1fr' },
                gap: 2
              }}>
                <TextField
                  fullWidth
                  placeholder="Search by name, description, or color..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search color="action" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{ bgcolor: 'background.paper', borderRadius: 1 }}
                />

                <FormControl fullWidth>
                  <InputLabel>Species</InputLabel>
                  <Select
                    value={speciesFilter}
                    label="Species"
                    onChange={(e) => setSpeciesFilter(e.target.value)}
                    sx={{ bgcolor: 'background.paper' }}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {getUniqueValues('species').map(species => (
                      <MenuItem key={species} value={species}>{species}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Size</InputLabel>
                  <Select
                    value={sizeFilter}
                    label="Size"
                    onChange={(e) => setSizeFilter(e.target.value)}
                    sx={{ bgcolor: 'background.paper' }}
                  >
                    <MenuItem value="All">All</MenuItem>
                    {getUniqueValues('size').map(size => (
                      <MenuItem key={size} value={size}>{size}</MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl fullWidth>
                  <InputLabel>Age</InputLabel>
                  <Select
                    value={ageFilter}
                    label="Age"
                    onChange={(e) => setAgeFilter(e.target.value)}
                    sx={{ bgcolor: 'background.paper' }}
                  >
                    <MenuItem value="All">All</MenuItem>
                    <MenuItem value="Young">Young (0-2 years)</MenuItem>
                    <MenuItem value="Adult">Adult (3-7 years)</MenuItem>
                    <MenuItem value="Senior">Senior (8+ years)</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {(searchTerm || speciesFilter !== 'All' || sizeFilter !== 'All' || ageFilter !== 'All') && (
                <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mr: 1, alignSelf: 'center' }}>
                    Active filters:
                  </Typography>
                  {searchTerm && (
                    <Chip
                      label={`Search: "${searchTerm}"`}
                      size="small"
                      onDelete={() => setSearchTerm('')}
                      color="primary"
                      variant="outlined"
                    />
                  )}
                  {speciesFilter !== 'All' && (
                    <Chip
                      label={`Species: ${speciesFilter}`}
                      size="small"
                      onDelete={() => setSpeciesFilter('All')}
                      color="primary"
                      variant="outlined"
                    />
                  )}
                  {sizeFilter !== 'All' && (
                    <Chip
                      label={`Size: ${sizeFilter}`}
                      size="small"
                      onDelete={() => setSizeFilter('All')}
                      color="primary"
                      variant="outlined"
                    />
                  )}
                  {ageFilter !== 'All' && (
                    <Chip
                      label={`Age: ${ageFilter}`}
                      size="small"
                      onDelete={() => setAgeFilter('All')}
                      color="primary"
                      variant="outlined"
                    />
                  )}
                </Box>
              )}
            </Paper>
          )}

          {!loading && !error && (
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                {filteredPets.length} {filteredPets.length === 1 ? 'pet' : 'pets'} available
              </Typography>
            </Box>
          )}

          {loading ? (
            <LoadingSkeleton />
          ) : error ? (
            <ErrorState />
          ) : filteredPets.length === 0 ? (
            <Paper
              elevation={1}
              sx={{
                p: 6,
                textAlign: 'center',
                borderRadius: 2,
                bgcolor: 'background.paper'
              }}
            >
              <PetsIcon sx={{ fontSize: 64, color: 'text.disabled', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No pets found
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {pets.length === 0
                  ? "No pets are currently available for adoption."
                  : "Try adjusting your search criteria or filters to find more pets."
                }
              </Typography>
            </Paper>
          ) : (
            <Fade in timeout={700}>
              <Box sx={{
                display: 'grid',
                gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
                gap: 3
              }}>
                {filteredPets.map((pet, index) => (
                  <Fade in timeout={500 + index * 100} key={pet.id}>
                    <Box>
                      <PetCard pet={pet} />
                    </Box>
                  </Fade>
                ))}
              </Box>
            </Fade>
          )}
        </Box>
      </Fade>
    </Container>
  )
}

export const Route = createFileRoute('/pets/')({ component: Pets })