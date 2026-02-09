import { Box, Typography, Container } from '@mui/material'
import { ErrorBoundary } from '../../ErrorBoundary'
import { ContentLoadingFallback } from '../../ContentLoadingFallback'
import type { ReactNode } from 'react'

interface SectionProps {
    children: ReactNode
    title?: string
    subtitle?: string
    backgroundColor?: string
    maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
    headingLevel?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    sectionRole?: string
}

export const Section = ({
    children,
    title,
    subtitle,
    backgroundColor = 'transparent',
    maxWidth = 'md',
    headingLevel = 'h2',
    sectionRole = 'region'
}: SectionProps) => {
    const sectionFallback = (
        <Box
            component="section"
            role={sectionRole}
            sx={{
                backgroundColor,
                py: { xs: 4, md: 6 },
                ...(backgroundColor !== 'transparent' && {
                    mx: { xs: -2, sm: -3, lg: -4 },
                    px: { xs: 2, sm: 3, lg: 4 },
                }),
            }}
        >
            <Container maxWidth={maxWidth}>
                <ContentLoadingFallback
                    type="error"
                    title="Section Unavailable"
                    message="This section is temporarily unavailable. Please refresh the page to try again."
                />
            </Container>
        </Box>
    )

    return (
        <ErrorBoundary fallback={sectionFallback}>
            <Box
                component="section"
                role={sectionRole}
                aria-labelledby={title ? `section-${title.toLowerCase().replace(/\s+/g, '-')}` : undefined}
                sx={{
                    backgroundColor,
                    py: { xs: 4, md: 6 },
                    ...(backgroundColor !== 'transparent' && {
                        mx: { xs: -2, sm: -3, lg: -4 },
                        px: { xs: 2, sm: 3, lg: 4 },
                    }),
                }}
            >
                <Container maxWidth={maxWidth}>
                    {(title || subtitle) && (
                        <Box sx={{ textAlign: 'center', mb: { xs: 3, md: 4 } }}>
                            {title && (
                                <Typography
                                    variant="h3"
                                    component={headingLevel}
                                    id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
                                    sx={{
                                        fontWeight: 500,
                                        color: 'text.primary',
                                        mb: subtitle ? 2 : 0,
                                        fontSize: { xs: '2rem', md: '2.5rem' },
                                        lineHeight: 1.2,
                                    }}
                                >
                                    {title}
                                </Typography>
                            )}
                            {subtitle && (
                                <Typography
                                    variant="h6"
                                    component="p"
                                    color="text.secondary"
                                    sx={{
                                        maxWidth: 600,
                                        mx: 'auto',
                                        lineHeight: 1.6,
                                        fontSize: { xs: '1.1rem', md: '1.25rem' },
                                    }}
                                >
                                    {subtitle}
                                </Typography>
                            )}
                        </Box>
                    )}
                    {children}
                </Container>
            </Box>
        </ErrorBoundary>
    )
}