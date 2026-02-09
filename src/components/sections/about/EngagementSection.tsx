import { Box, Typography, Paper } from '@mui/material'
import { Section } from './Section'
import {
    VolunteerActivism,
    Favorite,
    Pets,
    Home
} from '@mui/icons-material'

export const EngagementSection = () => {
    const options = [
        {
            icon: <Home sx={{ fontSize: 48, color: 'primary.main' }} aria-hidden="true" />,
            title: 'Adopt a Pet',
            description: 'Give a deserving rescue animal their forever home and gain a loyal companion for life through pet adoption.',
            action: 'Browse Adoptable Pets',
            href: '/pets'
        },
        {
            icon: <Pets sx={{ fontSize: 48, color: 'secondary.main' }} aria-hidden="true" />,
            title: 'Foster a Pet',
            description: 'Provide temporary care for rescue animals in need while they wait for their permanent families through pet fostering.',
            action: 'Learn About Pet Fostering',
            href: '/pets'
        },
        {
            icon: <VolunteerActivism sx={{ fontSize: 48, color: 'primary.main' }} aria-hidden="true" />,
            title: 'Volunteer',
            description: 'Help with dog walking at local animal shelters, pet socialization, adoption events, and other activities that support animal welfare.',
            action: 'Find Volunteer Opportunities',
            href: '/pets'
        },
        {
            icon: <Favorite sx={{ fontSize: 48, color: 'secondary.main' }} aria-hidden="true" />,
            title: 'Donate & Support',
            description: 'Support animal shelters with donations, supplies, or sponsoring specific rescue pets in need of medical care or special attention.',
            action: 'Support Animal Shelters',
            href: '/pets'
        }
    ]

    return (
        <Section
            title="Get Involved"
            subtitle="There are many meaningful ways to help rescue animals in need and support your local animal shelters"
            maxWidth="lg"
            headingLevel="h2"
        >
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                    gap: 4,
                }}
                role="list"
                aria-label="Ways to get involved with pet adoption and animal welfare"
            >
                {options.map((option, index) => (
                    <Paper
                        key={index}
                        elevation={2}
                        role="listitem"
                        sx={{
                            p: 4,
                            height: '100%',
                            borderRadius: 3,
                            transition: 'all 0.3s ease-in-out',
                            display: 'flex',
                            flexDirection: 'column',
                            '&:hover': {
                                transform: 'translateY(-4px)',
                                boxShadow: 4,
                            },
                        }}
                    >
                        <Box sx={{ textAlign: 'center', mb: 3 }}>
                            {option.icon}
                        </Box>

                        <Typography
                            variant="h5"
                            component="h3"
                            sx={{
                                fontWeight: 500,
                                mb: 2,
                                color: 'text.primary',
                                textAlign: 'center',
                            }}
                        >
                            {option.title}
                        </Typography>

                        <Typography
                            variant="body1"
                            sx={{
                                color: 'text.secondary',
                                lineHeight: 1.7,
                                textAlign: 'center',
                                mb: 3,
                                flexGrow: 1,
                            }}
                        >
                            {option.description}
                        </Typography>

                        {/* TODO: implement actions form/info for each action */}
                        {/* <Button
                            variant="contained"
                            size="large"
                            endIcon={<ArrowForward />}
                            href={option.href}
                            aria-label={`${option.action} - Learn more about ${option.title.toLowerCase()}`}
                            sx={{
                                mt: 'auto',
                                py: 1.5,
                                borderRadius: 2,
                                textTransform: 'none',
                                fontSize: '1rem',
                                fontWeight: 500,
                            }}
                        >
                            {option.action}
                        </Button> */}
                    </Paper>
                ))}
            </Box>
        </Section>
    )
}