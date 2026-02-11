import { Box, Typography, Paper } from '@mui/material'
import { Section } from './Section'
import { Favorite, Groups, Visibility } from '@mui/icons-material'

export const MissionSection = () => {
    const highlights = [
        {
            icon: <Favorite sx={{ fontSize: 40, color: 'primary.main' }} aria-hidden="true" />,
            title: 'Compassion',
            description: 'Every pet deserves love, care, and a second chance at happiness through pet adoption'
        },
        {
            icon: <Visibility sx={{ fontSize: 40, color: 'primary.main' }} aria-hidden="true" />,
            title: 'Transparency',
            description: 'Open, honest communication between animal shelters, adopters, and our pet rescue community'
        },
        {
            icon: <Groups sx={{ fontSize: 40, color: 'primary.main' }} aria-hidden="true" />,
            title: 'Community',
            description: 'Building connections that strengthen the bond between pets and people in animal welfare'
        }
    ]

    return (
        <Section
            title="Who We Are"
            maxWidth="lg"
            headingLevel="h2"
            sectionRole="main"
        >
            <Box sx={{ mb: 6 }}>
                <Typography
                    variant="h6"
                    sx={{
                        textAlign: 'center',
                        maxWidth: '800px',
                        mx: 'auto',
                        lineHeight: 1.8,
                        color: 'text.primary',
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                        mb: 4,
                    }}
                >
                    Pawsitive Shelter is an online pet adoption platform that connects multiple animal shelters
                    with loving families looking to adopt pets. We believe every animal shelter should have the
                    tools to help their rescue animals find homes faster, and every family should have access
                    to adoptable pets in need of love.
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: 'center',
                        maxWidth: '700px',
                        mx: 'auto',
                        lineHeight: 1.7,
                        color: 'text.secondary',
                        fontSize: { xs: '1rem', md: '1.1rem' },
                    }}
                >
                    Our mission is simple: make pet adoption more accessible, transparent, and
                    successful for everyone involved in animal rescue. We're not just a website – we're a community
                    dedicated to second chances and forever homes for shelter animals.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
                    gap: 4,
                }}
                role="list"
                aria-label="Our core values in pet adoption and animal welfare"
            >
                {highlights.map((highlight, index) => (
                    <Paper
                        key={index}
                        elevation={2}
                        role="listitem"
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            height: '100%',
                            borderRadius: 3,
                            transition: 'all 0.3s ease-in-out',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 4,
                            },
                        }}
                    >
                        <Box sx={{ mb: 2 }}>
                            {highlight.icon}
                        </Box>
                        <Typography
                            variant="h6"
                            component="h3"
                            sx={{
                                fontWeight: 500,
                                mb: 2,
                                color: 'text.primary',
                            }}
                        >
                            {highlight.title}
                        </Typography>
                        <Typography
                            variant="body2"
                            sx={{
                                color: 'text.secondary',
                                lineHeight: 1.6,
                            }}
                        >
                            {highlight.description}
                        </Typography>
                    </Paper>
                ))}
            </Box>
        </Section>
    )
}