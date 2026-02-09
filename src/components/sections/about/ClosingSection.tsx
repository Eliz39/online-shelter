import { Box, Typography } from '@mui/material'
import { Section } from './Section'
import { Pets, Favorite } from '@mui/icons-material'

export const ClosingSection = () => {
    return (
        <Section
            backgroundColor="rgba(133, 216, 57, 0.05)"
            headingLevel="h2"
        >
            <Box sx={{ textAlign: 'center', maxWidth: '700px', mx: 'auto' }}>
                <Box sx={{ mb: 3 }}>
                    <Pets sx={{ fontSize: 60, color: 'primary.main', mb: 2 }} aria-hidden="true" />
                </Box>

                <Typography
                    variant="h4"
                    component="h2"
                    sx={{
                        fontWeight: 500,
                        color: 'text.primary',
                        mb: 3,
                        fontSize: { xs: '1.8rem', md: '2.2rem' },
                        lineHeight: 1.3,
                    }}
                >
                    Every Pet Deserves a Story of Love
                </Typography>

                <Typography
                    variant="h6"
                    sx={{
                        color: 'text.secondary',
                        lineHeight: 1.7,
                        mb: 4,
                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                        fontWeight: 400,
                    }}
                >
                    When you choose to adopt, foster, volunteer, or support our pet adoption mission, you're not just changing one life – you're strengthening an entire community of compassion. Together, we can ensure that every rescue animal finds the love and security they deserve.
                </Typography>

                <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
                    <Favorite sx={{ fontSize: 24, color: 'primary.main' }} aria-hidden="true" />
                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.primary',
                            lineHeight: 1.6,
                            fontStyle: 'italic',
                            fontSize: '1.1rem',
                            fontWeight: 400,
                            textAlign: 'center',
                        }}
                    >
                        "The love you give comes back to you tenfold. Every act of kindness creates ripples of hope."
                    </Typography>
                    <Favorite sx={{ fontSize: 24, color: 'primary.main' }} aria-hidden="true" />
                </Box>
            </Box>
        </Section>
    )
}