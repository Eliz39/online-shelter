import { Box, Typography, Card, CardContent } from '@mui/material'
import { Section } from './Section'
import {
    Search,
    Pets,
    Send,
    VolunteerActivism,
    Business
} from '@mui/icons-material'

export const FunctionalitySection = () => {
    const features = [
        {
            icon: <Search sx={{ fontSize: 48, color: 'primary.main' }} aria-hidden="true" />,
            title: 'Browse Available Pets',
            description: 'Search through profiles of adoptable dogs, cats, and other rescue animals from multiple animal shelters, each with their own story and photos.'
        },
        {
            icon: <Pets sx={{ fontSize: 48, color: 'primary.main' }} aria-hidden="true" />,
            title: 'Detailed Pet Profiles',
            description: 'Every rescue pet has a comprehensive adoption profile with photos, personality details, medical history, and special needs information.'
        },
        {
            icon: <Send sx={{ fontSize: 48, color: 'primary.main' }} aria-hidden="true" />,
            title: 'Direct Adoption Requests',
            description: 'Submit pet adoption applications directly through our platform, streamlining the adoption process for both adopters and animal shelters.'
        },
        {
            icon: <VolunteerActivism sx={{ fontSize: 48, color: 'primary.main' }} aria-hidden="true" />,
            title: 'Volunteer Opportunities',
            description: 'Find ways to help beyond pet adoption - from dog walking to fostering animals, there are many ways to support animal welfare.'
        },
        {
            icon: <Business sx={{ fontSize: 48, color: 'primary.main' }} aria-hidden="true" />,
            title: 'Shelter Partnership',
            description: 'Any qualified animal shelter can join our pet adoption platform to showcase their rescue animals and connect with potential adopters.'
        }
    ]

    return (
        <Section
            title="What We Do"
            subtitle="Discover all the ways our pet adoption platform helps connect rescue animals with their perfect families"
            backgroundColor="rgba(133, 216, 57, 0.03)"
            maxWidth="lg"
            headingLevel="h2"
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
                    gap: 4,
                }}
                role="list"
                aria-label="Pet adoption platform features and services"
            >
                {features.map((feature) => (
                    <Card
                        key={feature.title}
                        elevation={1}
                        role="listitem"
                        sx={{
                            height: '100%',
                            borderRadius: 3,
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 3,
                            },
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <CardContent sx={{ p: 3, textAlign: 'center' }}>
                            <Box sx={{ mb: 2 }}>
                                {feature.icon}
                            </Box>
                            <Typography
                                variant="h6"
                                component="h3"
                                sx={{
                                    fontWeight: 500,
                                    mb: 2,
                                    color: 'text.primary',
                                    fontSize: '1.1rem',
                                }}
                            >
                                {feature.title}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{
                                    color: 'text.secondary',
                                    lineHeight: 1.6,
                                }}
                            >
                                {feature.description}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </Section>
    )
}