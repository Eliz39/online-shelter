import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
    Box,
    Button,
    Paper,
    TextField,
    Typography,
    Alert,
    useTheme,
} from '@mui/material'
import { Send, CheckCircle } from '@mui/icons-material'
import {
    type AdoptionFormInputs,
    adoptionSchema,
} from '../schemas/adoptionSchema'
import { supabase } from '../lib/supabaseClient'

type AdoptionFormProps = {
    petId: string
    petName: string
    userEmail?: string
}

export const AdoptionForm = ({
    petId,
    petName,
    userEmail = '',
}: AdoptionFormProps) => {
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)
    const theme = useTheme()

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<AdoptionFormInputs>({
        defaultValues: {
            fullName: '',
            email: userEmail,
            phone: '',
            address: '',
            petName,
            petId,
            message: '',
        },
        resolver: zodResolver(adoptionSchema),
    })

    const onSubmit = async (data: AdoptionFormInputs) => {
        try {
            setLoading(true)
            setError(null)

            const { error: submitError } = await supabase
                .from('adoption_requests')
                .insert([
                    {
                        full_name: data.fullName,
                        email: data.email,
                        phone: data.phone,
                        address: data.address,
                        pet_id: data.petId,
                        pet_name: data.petName,
                        message: data.message || null,
                        status: 'pending',
                    },
                ])

            if (submitError) {
                throw submitError
            }

            const { error: updateError } = await supabase
                .from('animals')
                .update({ status: 'pending' })
                .eq('id', data.petId)

            if (updateError) {
                console.error('Failed to update pet status:', updateError)
            }

            setSuccess(true)
            reset()
        } catch (err) {
            console.error('Failed to submit adoption request:', err)
            setError('Failed to submit adoption request. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Paper
            elevation={2}
            sx={{
                p: { xs: 3, md: 4 },
                borderRadius: 2,
                background: `linear-gradient(135deg, ${theme.palette.primary.light}10, ${theme.palette.background.paper})`,
            }}
        >
            <Typography variant="h5" fontWeight={600} gutterBottom>
                Adoption Request Form
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Interested in adopting {petName}? Fill out the form below and we'll get
                back to you soon!
            </Typography>

            {success ? (
                <Alert
                    severity="success"
                    icon={<CheckCircle />}
                    sx={{ mb: 3, borderRadius: 2 }}
                >
                    <Typography variant="body1" fontWeight={500}>
                        Your adoption request has been submitted successfully!
                    </Typography>
                    <Typography variant="body2">
                        We'll contact you soon at the email address you provided.
                    </Typography>
                </Alert>
            ) : null}

            {error ? (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                    {error}
                </Alert>
            ) : null}

            <Box
                component="form"
                id='adoption-form'
                onSubmit={e => void handleSubmit(onSubmit)(e)}
                sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}
            >
                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 2.5,
                    }}
                >
                    <Controller
                        name="fullName"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Full Name"
                                fullWidth
                                required
                                error={!!errors.fullName}
                                helperText={errors.fullName?.message}
                                disabled={loading}
                            />
                        )}
                    />

                    <Controller
                        name="email"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Email Address"
                                type="email"
                                fullWidth
                                required
                                error={!!errors.email}
                                helperText={errors.email?.message}
                                disabled={loading}
                            />
                        )}
                    />
                </Box>

                <Box
                    sx={{
                        display: 'grid',
                        gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                        gap: 2.5,
                    }}
                >
                    <Controller
                        name="phone"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Phone Number"
                                fullWidth
                                required
                                placeholder="+1 (555) 123-4567"
                                error={!!errors.phone}
                                helperText={errors.phone?.message}
                                disabled={loading}
                            />
                        )}
                    />

                    <Controller
                        name="address"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Address"
                                fullWidth
                                required
                                error={!!errors.address}
                                helperText={errors.address?.message}
                                disabled={loading}
                            />
                        )}
                    />
                </Box>

                <Controller
                    name="message"
                    control={control}
                    render={({ field }) => (
                        <TextField
                            {...field}
                            label="Message (Optional)"
                            fullWidth
                            multiline
                            rows={4}
                            placeholder="Tell us why you'd like to adopt this pet and about your experience with pets..."
                            error={!!errors.message}
                            helperText={errors.message?.message}
                            disabled={loading}
                        />
                    )}
                />

                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Button
                        type="submit"
                        variant="contained"
                        size="large"
                        startIcon={<Send />}
                        disabled={loading}
                        sx={{ px: 4, py: 1.5, fontWeight: 600 }}
                    >
                        {loading ? 'Submitting...' : 'Submit Request'}
                    </Button>
                </Box>
            </Box>
        </Paper>
    )
}
