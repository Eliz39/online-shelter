import { useState } from 'react'
import {
    Box,
    Card,
    CardContent,
    Typography,
    Chip,
    Avatar,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
    Divider,
} from '@mui/material'
import {
    CheckCircle,
    Cancel,
    LocationOn,
    Phone,
    Email,
    CalendarToday,
} from '@mui/icons-material'
import { format } from 'date-fns'
import type { AdoptionRequestWithDetails } from '../../types/adoptionRequest'
import { useUpdateAdoptionRequest } from '../../hooks/useAdoptionRequests'

type AdoptionRequestsSectionProps = {
    requests: AdoptionRequestWithDetails[]
    userRole: 'adopter' | 'shelter'
}

export const AdoptionRequestsSection = ({
    requests,
    userRole,
}: AdoptionRequestsSectionProps) => {
    const [selectedRequest, setSelectedRequest] =
        useState<AdoptionRequestWithDetails | null>(null)
    const [shelterComment, setShelterComment] = useState('')
    const [dialogOpen, setDialogOpen] = useState(false)
    const [actionType, setActionType] = useState<'approved' | 'rejected' | null>(
        null
    )

    const { mutate: updateRequest, isPending } = useUpdateAdoptionRequest()

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'approved':
                return 'success'
            case 'rejected':
                return 'error'
            default:
                return 'warning'
        }
    }

    const handleOpenDialog = (
        request: AdoptionRequestWithDetails,
        action: 'approved' | 'rejected'
    ) => {
        setSelectedRequest(request)
        setActionType(action)
        setShelterComment(request.shelter_comment || '')
        setDialogOpen(true)
    }

    const handleCloseDialog = () => {
        setDialogOpen(false)
        setSelectedRequest(null)
        setActionType(null)
        setShelterComment('')
    }

    const handleSubmit = () => {
        if (!selectedRequest || !actionType) return

        updateRequest(
            {
                requestId: selectedRequest.id,
                status: actionType,
                shelterComment: shelterComment.trim() || undefined,
            },
            {
                onSuccess: () => {
                    handleCloseDialog()
                },
            }
        )
    }

    if (requests.length === 0) {
        return (
            <Box
                sx={{
                    textAlign: 'center',
                    py: 8,
                    px: 3,
                    bgcolor: 'grey.50',
                    borderRadius: 2,
                }}
            >
                <Typography variant="h6" color="text.secondary">
                    There are no adoption requests yet.
                </Typography>
            </Box>
        )
    }

    return (
        <>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {requests.map((request) => (
                    <Card
                        key={request.id}
                        elevation={2}
                        sx={{
                            borderRadius: 2,
                            transition: 'transform 0.2s, box-shadow 0.2s',
                            '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: 4,
                            },
                        }}
                    >
                        <CardContent sx={{ p: 3 }}>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'flex-start',
                                    mb: 2,
                                    flexWrap: 'wrap',
                                    gap: 2,
                                }}
                            >
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    {request.pets && (
                                        <Avatar
                                            src={request.pets.image_url}
                                            alt={request.pets.name}
                                            sx={{ width: 60, height: 60 }}
                                        />
                                    )}
                                    <Box>
                                        <Typography variant="h6" fontWeight={600}>
                                            {request.pet_name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                            <Chip
                                                label={request.status}
                                                color={getStatusColor(request.status) as any}
                                                size="small"
                                                sx={{ fontWeight: 500 }}
                                            />
                                        </Box>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CalendarToday sx={{ fontSize: 18, color: 'text.secondary' }} />
                                    <Typography variant="body2" color="text.secondary">
                                        {format(new Date(request.created_at), 'MMM dd, yyyy')}
                                    </Typography>
                                </Box>
                            </Box>

                            <Divider sx={{ my: 2 }} />

                            <Box
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
                                    gap: 3,
                                }}
                            >
                                <Box>
                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        {userRole === 'shelter' ? 'Adopter Information' : 'Your Information'}
                                    </Typography>
                                    <Typography variant="body2" fontWeight={600}>
                                        {request.full_name}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                                        <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2">{request.email}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2">{request.phone}</Typography>
                                    </Box>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                        <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                                        <Typography variant="body2">{request.address}</Typography>
                                    </Box>
                                </Box>

                                {userRole === 'adopter' && request.shelters && (
                                    <Box>
                                        <Typography
                                            variant="subtitle2"
                                            color="text.secondary"
                                            gutterBottom
                                        >
                                            Shelter Information
                                        </Typography>
                                        <Typography variant="body2" fontWeight={600}>
                                            {request.shelters.name}
                                        </Typography>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mt: 0.5 }}>
                                            <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                                            <Typography variant="body2">
                                                {request.shelters.address}, {request.shelters.city},{' '}
                                                {request.shelters.zip_code}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <Phone sx={{ fontSize: 16, color: 'text.secondary' }} />
                                            <Typography variant="body2">{request.shelters.phone}</Typography>
                                        </Box>
                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                            <Email sx={{ fontSize: 16, color: 'text.secondary' }} />
                                            <Typography variant="body2">{request.shelters.email}</Typography>
                                        </Box>
                                    </Box>
                                )}
                            </Box>

                            {request.message && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Message
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        sx={{
                                            p: 2,
                                            bgcolor: 'grey.50',
                                            borderRadius: 1,
                                            fontStyle: 'italic',
                                        }}
                                    >
                                        "{request.message}"
                                    </Typography>
                                </Box>
                            )}

                            {request.shelter_comment && (
                                <Box sx={{ mt: 2 }}>
                                    <Typography
                                        variant="subtitle2"
                                        color="text.secondary"
                                        gutterBottom
                                    >
                                        Shelter Comment
                                    </Typography>
                                    <Alert severity="info" sx={{ borderRadius: 1 }}>
                                        {request.shelter_comment}
                                    </Alert>
                                </Box>
                            )}

                            {userRole === 'shelter' && request.status === 'pending' && (
                                <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                                    <Button
                                        variant="contained"
                                        color="success"
                                        startIcon={<CheckCircle />}
                                        onClick={() => handleOpenDialog(request, 'approved')}
                                        sx={{ flex: 1 }}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        startIcon={<Cancel />}
                                        onClick={() => handleOpenDialog(request, 'rejected')}
                                        sx={{ flex: 1 }}
                                    >
                                        Reject
                                    </Button>
                                </Box>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </Box>

            <Dialog
                open={dialogOpen}
                onClose={handleCloseDialog}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    {actionType === 'approved' ? 'Approve' : 'Reject'} Adoption Request
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        You are about to {actionType === 'approved' ? 'approve' : 'reject'} the
                        adoption request for <strong>{selectedRequest?.pet_name}</strong> from{' '}
                        <strong>{selectedRequest?.full_name}</strong>.
                    </Typography>
                    <TextField
                        label="Comment (Optional)"
                        multiline
                        rows={4}
                        fullWidth
                        value={shelterComment}
                        onChange={(e) => setShelterComment(e.target.value)}
                        placeholder="Add a comment for the adopter..."
                    />
                </DialogContent>
                <DialogActions sx={{ px: 3, pb: 2 }}>
                    <Button onClick={handleCloseDialog} disabled={isPending}>
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color={actionType === 'approved' ? 'success' : 'error'}
                        onClick={handleSubmit}
                        disabled={isPending}
                    >
                        {isPending ? 'Updating...' : 'Confirm'}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
}
