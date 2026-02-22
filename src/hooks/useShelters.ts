import { useQuery } from '@tanstack/react-query'
import { getShelterById, getAllShelters } from '../services/shelterService'

export const useShelter = (shelterId: string | null | undefined) => {
    return useQuery({
        queryKey: ['shelter', shelterId],
        queryFn: () => getShelterById(shelterId!),
        enabled: !!shelterId,
    })
}

export const useShelters = () => {
    return useQuery({
        queryKey: ['shelters'],
        queryFn: getAllShelters,
    })
}