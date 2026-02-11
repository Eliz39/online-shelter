import React, { Component } from 'react'
import type { ErrorInfo, ReactNode } from 'react'
import { Typography, Button, Paper } from '@mui/material'
import { ErrorOutline, Refresh } from '@mui/icons-material'

interface Props {
    children: ReactNode
    fallback?: ReactNode
    onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
    hasError: boolean
    error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error }
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('ErrorBoundary caught an error:', error, errorInfo)

        if (this.props.onError) {
            this.props.onError(error, errorInfo)
        }
    }

    handleRetry = () => {
        this.setState({ hasError: false, error: undefined })
    }

    render() {
        if (this.state.hasError) {
            // Custom fallback UI
            if (this.props.fallback) {
                return this.props.fallback
            }

            // Default fallback UI
            return (
                <Paper
                    elevation={2}
                    sx={{
                        p: 4,
                        m: 2,
                        textAlign: 'center',
                        borderRadius: 3,
                        backgroundColor: 'background.paper',
                    }}
                    role="alert"
                    aria-live="polite"
                >
                    <ErrorOutline
                        sx={{
                            fontSize: 48,
                            color: 'error.main',
                            mb: 2,
                        }}
                        aria-hidden="true"
                    />

                    <Typography
                        variant="h6"
                        component="h2"
                        sx={{
                            fontWeight: 600,
                            mb: 2,
                            color: 'text.primary',
                        }}
                    >
                        Something went wrong
                    </Typography>

                    <Typography
                        variant="body1"
                        sx={{
                            color: 'text.secondary',
                            mb: 3,
                            maxWidth: '500px',
                            mx: 'auto',
                            lineHeight: 1.6,
                        }}
                    >
                        We're sorry, but there was an error loading this section.
                        Please try refreshing the page or contact support if the problem persists.
                    </Typography>

                    <Button
                        variant="contained"
                        startIcon={<Refresh />}
                        onClick={this.handleRetry}
                        sx={{
                            textTransform: 'none',
                            borderRadius: 2,
                        }}
                        aria-label="Try to reload this section"
                    >
                        Try Again
                    </Button>
                </Paper>
            )
        }

        return this.props.children
    }
}

export function withErrorBoundary<P extends object>(
    Component: React.ComponentType<P>,
    fallback?: ReactNode
) {
    const WrappedComponent = (props: P) => (
        <ErrorBoundary fallback={fallback}>
            <Component {...props} />
        </ErrorBoundary>
    )

    WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`

    return WrappedComponent
}