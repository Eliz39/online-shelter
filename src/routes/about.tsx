import { createFileRoute } from '@tanstack/react-router'
import { Box, Container, Stack } from '@mui/material'
import { HeroSection } from '../components/sections/about/HeroSection'
import { MissionSection } from '../components/sections/about/MissionSection'
import { FunctionalitySection } from '../components/sections/about/FunctionalitySection'
import { EngagementSection } from '../components/sections/about/EngagementSection'
import { ProcessSection } from '../components/sections/about/ProcessSection'
import { ClosingSection } from '../components/sections/about/ClosingSection'
import heroImg from '../assets/hero-cat.jpg'

const About = () => {
  return (
    <Box
      component="main"
      sx={{ minHeight: '100vh' }}
      role="main"
      aria-label="About Pawsitive Shelter - Pet adoption platform information"
    >
      <Stack spacing={0}>
        <HeroSection
          title="About Pawsitive Shelter"
          subtitle="Connecting hearts, creating families, and giving every rescue pet a second chance at love through compassionate pet adoption"
          backgroundImage={heroImg}
          overlayOpacity={0.4}
        />

        <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
          <Stack spacing={{ xs: 6, md: 8 }}>
            <MissionSection />

            <FunctionalitySection />

            <EngagementSection />

            <ProcessSection />

            <ClosingSection />
          </Stack>
        </Container>
      </Stack>
    </Box>

  )
}

export const Route = createFileRoute('/about')({
  component: About
})
