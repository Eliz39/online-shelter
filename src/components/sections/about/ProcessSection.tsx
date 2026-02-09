import { Box, Typography, Paper, Stepper, Step, StepLabel, useTheme, useMediaQuery } from '@mui/material'
import { Section } from './Section'
import {
    Search,
    Send,
    ReviewsOutlined,
    Pets,
    CheckCircle
} from '@mui/icons-material'

export const ProcessSection = () => {
    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('md'))

    const steps = [
        {
            step: 1,
            title: 'Browse Pets',
            description: 'Search through available rescue pets from multiple animal shelters and find adoptable animals that match your lifestyle and preferences.',
            icon: <Search sx={{ fontSize: 40, color: 'primary.main' }} aria-hidden="true" />
        },
        {
            step: 2,
            title: 'Send Adoption Request',
            description: 'Submit a pet adoption application directly through our platform with your information and preferences for your future companion.',
            icon: <Send sx={{ fontSize: 40, color: 'primary.main' }} aria-hidden="true" />
        },
        {
            step: 3,
            title: 'Shelter Reviews Request',
            description: 'The animal shelter reviews your adoption application, checks references, and determines if you\'re a good match for the rescue pet.',
            icon: <ReviewsOutlined sx={{ fontSize: 40, color: 'primary.main' }} aria-hidden="true" />
        },
        {
            step: 4,
            title: 'Meet the Pet',
            description: 'Visit the animal shelter to meet your potential new family member and see if you connect with each other before finalizing the adoption.',
            icon: <Pets sx={{ fontSize: 40, color: 'primary.main' }} aria-hidden="true" />
        },
        {
            step: 5,
            title: 'Finalize Adoption',
            description: 'Complete the pet adoption paperwork, pay any adoption fees, and welcome your new rescue companion home!',
            icon: <CheckCircle sx={{ fontSize: 40, color: 'primary.main' }} aria-hidden="true" />
        }
    ]

    return (
        <Section
            title="How Adoption Works"
            subtitle="Our simple, transparent pet adoption process makes it easy to find and adopt your perfect rescue companion"
            backgroundColor="rgba(237, 84, 129, 0.03)"
            maxWidth="lg"
            headingLevel="h2"
        >
            {isMobile ? (
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: '1fr',
                        gap: 3,
                    }}
                    role="list"
                    aria-label="Pet adoption process steps"
                >
                    {steps.map((step, index) => (
                        <Paper
                            key={index}
                            elevation={2}
                            role="listitem"
                            sx={{
                                p: 3,
                                borderRadius: 3,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 3,
                            }}
                        >
                            <Box
                                sx={{
                                    minWidth: 60,
                                    height: 60,
                                    borderRadius: '50%',
                                    backgroundColor: 'primary.light',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0,
                                }}
                                aria-label={`Step ${step.step}`}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        color: 'primary.main',
                                        fontWeight: 500,
                                    }}
                                >
                                    {step.step}
                                </Typography>
                            </Box>
                            <Box>
                                <Typography
                                    variant="h6"
                                    component="h3"
                                    sx={{
                                        fontWeight: 400,
                                        mb: 1,
                                        color: 'text.primary',
                                    }}
                                >
                                    {step.title}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {step.description}
                                </Typography>
                            </Box>
                        </Paper>
                    ))}
                </Box>
            ) : (
                <Box>
                    <Stepper
                        activeStep={-1}
                        alternativeLabel
                        sx={{ mb: 6 }}
                        aria-label="Pet adoption process overview"
                    >
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepLabel
                                    sx={{
                                        '& .MuiStepLabel-label': {
                                            fontWeight: 500,
                                            fontSize: '1.1rem',
                                        },
                                    }}
                                >
                                    {step.title}
                                </StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' },
                            gap: 4,
                        }}
                        role="list"
                        aria-label="Detailed pet adoption process steps"
                    >
                        {steps.map((step, index) => (
                            <Paper
                                key={index}
                                elevation={1}
                                role="listitem"
                                sx={{
                                    p: 3,
                                    textAlign: 'center',
                                    height: '100%',
                                    borderRadius: 3,
                                    border: '2px solid',
                                    borderColor: 'primary.light',
                                    transition: 'all 0.3s ease-in-out',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                        transform: 'translateY(-4px)',
                                        boxShadow: 3,
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        backgroundColor: 'primary.light',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        mx: 'auto',
                                        mb: 2,
                                    }}
                                    aria-label={`Step ${step.step}`}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: 'primary.main',
                                            fontWeight: 500,
                                        }}
                                    >
                                        {step.step}
                                    </Typography>
                                </Box>

                                <Typography
                                    variant="body2"
                                    sx={{
                                        color: 'text.secondary',
                                        lineHeight: 1.6,
                                    }}
                                >
                                    {step.description}
                                </Typography>
                            </Paper>
                        ))}
                    </Box>
                </Box>
            )}
        </Section>
    )
}