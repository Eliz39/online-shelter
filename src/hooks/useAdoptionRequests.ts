import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    getAdoptionRequestsByEmail,
    getAdoptionRequestsByShelterId,
    updateAdoptionRequestStatus,
} from '../services/adoptionRequestService'

export const useAdoptionRequestsByEmail = (email: string | undefined) => {
    return useQuery({
        queryKey: ['adoptionRequests', 'email', email],
        queryFn: () => getAdoptionRequestsByEmail(email!),
        enabled: !!email,
    })
}

export const useAdoptionRequestsByShelterId = (shelterId: string | undefined) => {
    return useQuery({
        queryKey: ['adoptionRequests', 'shelter', shelterId],
        queryFn: () => getAdoptionRequestsByShelterId(shelterId!),
        enabled: !!shelterId,
    })
}

export const useUpdateAdoptionRequest = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            requestId,
            status,
            shelterComment,
        }: {
            requestId: string
            status: 'pending' | 'approved' | 'rejected'
            shelterComment?: string
        }) => updateAdoptionRequestStatus(requestId, status, shelterComment),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['adoptionRequests'] })
        },
    })
}
