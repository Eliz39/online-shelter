import { Box, Typography, Paper, Skeleton, Stack } from '@mui/material'
import { Pets, ErrorOutline } from '@mui/icons-material'

interface ContentLoadingFallbackProps {
    type?: 'loading' | 'error' | 'empty'
    title?: string
    message?: string
    showSkeleton?: boolean
}

export const ContentLoadingFallback = ({
    type = 'loading',
    title,
    message,
    showSkeleton = true
}: ContentLoadingFallbackProps) => {
    if (type === 'loading' && showSkeleton) {
        return (
            <Box sx={{ p: 3 }}>
                <Stack spacing={2}>
                    <Skeleton variant="text" width="60%" height={40} />
                    <Skeleton variant="text" width="80%" height={24} />
                    <Skeleton variant="text" width="70%" height={24} />
                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <Skeleton variant="rectangular" width={200} height={120} sx={{ borderRadius: 2 }} />
                        <Skeleton variant="rectangular" width={200} height={120} sx={{ borderRadius: 2 }} />
                        <Skeleton variant="rectangular" width={200} height={120} sx={{ borderRadius: 2 }} />
                    </Box>
                </Stack>
            </Box>
        )
    }

    const getIcon = () => {
        switch (type) {
            case 'error':
                return <ErrorOutline sx={{ fontSize: 48, color: 'error.main' }} />
            case 'empty':
                return <Pets sx={{ fontSize: 48, color: 'text.disabled' }} />
            default:
                return <Pets sx={{ fontSize: 48, color: 'primary.main' }} />
        }
    }

    const getDefaultTitle = () => {
        switch (type) {
            case 'error':
                return 'Content Unavailable'
            case 'empty':
                return 'No Content Available'
            default:
                return 'Loading Content...'
        }
    }

    const getDefaultMessage = () => {
        switch (type) {
            case 'error':
                return 'We\'re having trouble loading this content right now. Please try refreshing the page.'
            case 'empty':
                return 'There\'s no content to display at the moment. Please check back later.'
            default:
                return 'Please wait while we load the content for you.'
        }
    }

    return (
        <Paper
            elevation={1}
            sx={{
                p: 4,
                textAlign: 'center',
                borderRadius: 3,
                backgroundColor: type === 'error' ? 'error.light' : 'background.paper',
                opacity: type === 'error' ? 0.9 : 1,
            }}
            role={type === 'error' ? 'alert' : 'status'}
            aria-live="polite"
        >
            <Box sx={{ mb: 2 }}>
                {getIcon()}
            </Box>

            <Typography
                variant="h6"
                component="h3"
                sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: type === 'error' ? 'error.dark' : 'text.primary',
                }}
            >
                {title || getDefaultTitle()}
            </Typography>

            <Typography
                variant="body1"
                sx={{
                    color: type === 'error' ? 'error.dark' : 'text.secondary',
                    maxWidth: '400px',
                    mx: 'auto',
                    lineHeight: 1.6,
                }}
            >
                {message || getDefaultMessage()}
            </Typography>
        </Paper>
    )
}