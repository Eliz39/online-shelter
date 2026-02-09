import { Box, Typography } from '@mui/material'
import heroImg from '../../../assets/hero-cat.jpg'

export interface HeroSectionProps {
    title: string
    subtitle?: string
    backgroundImage: string
    overlayOpacity?: number
}

export const HeroSection = ({
    title,
    subtitle,
    backgroundImage,
    overlayOpacity = 0.35
}: HeroSectionProps) => {

    return (
        <Box
            sx={{
                position: 'relative',
                height: { xs: '60vh', md: '70vh' },
                minHeight: '400px',
                backgroundImage: `url(${heroImg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                opacity: 1,
                transition: 'opacity 0.3s ease-in-out',
                margin: '-16px',
                '&::before': {
                    content: '""',
                    position: 'absolute',
                    inset: 0,
                    background: `rgba(255, 255, 255, ${overlayOpacity})`,
                },
            }}
            role="banner"
            aria-label="Pet adoption hero section with emotional imagery"
        >

            <Box
                component="img"
                src={backgroundImage}
                sx={{ display: 'none' }}
                alt="Pet adoption hero image showing loving connection between pets and families"
            />

            <Box
                sx={{
                    position: 'relative',
                    zIndex: 1,
                    textAlign: 'center',
                    color: 'white',
                    maxWidth: '800px',
                    px: { xs: 2, sm: 3, lg: 4 },
                    py: { xs: 2, md: 4 },
                }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: {
                            xs: '2.5rem',
                            sm: '3.5rem',
                            md: '3.75rem',
                            lg: '4.5rem'
                        },
                        fontWeight: 500,
                        color: 'secondary.main',
                        mb: subtitle ? 3 : 0,
                        lineHeight: 1.2,
                        textWrap: 'balance',
                    }}
                >
                    {title}
                </Typography>

                {subtitle && (
                    <Typography
                        variant="h5"
                        sx={{
                            fontSize: { xs: '1.2rem', md: '1.5rem' },
                            fontWeight: 400,
                            lineHeight: 1.6,
                            color: 'text.primary',
                            opacity: 0.95,
                            textWrap: 'pretty',
                        }}
                    >
                        {subtitle}
                    </Typography>
                )}
            </Box>
        </Box>
    )
}