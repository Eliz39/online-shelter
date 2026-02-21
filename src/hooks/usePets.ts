import { useQuery } from '@tanstack/react-query'
import {
    getAllPets,
    getPetById,
    getFilteredPets,
    getAvailablePets,
    getPetsByIds,
} from '../services/petService'

export const usePets = () => {
    return useQuery({
        queryKey: ['pets'],
        queryFn: getAllPets,
    })
}

export const usePet = (petId: string) => {
    return useQuery({
        queryKey: ['pet', petId],
        queryFn: () => getPetById(petId),
        enabled: !!petId,
    })
}

export const useFilteredPets = (filters: {
    species?: string
    size?: string
    status?: string
    ageRange?: 'young' | 'adult' | 'senior' | 'All'
}) => {
    return useQuery({
        queryKey: ['pets', 'filtered', filters],
        queryFn: () => getFilteredPets(filters),
    })
}

export const useAvailablePets = (limit: number = 10) => {
    return useQuery({
        queryKey: ['pets', 'available', limit],
        queryFn: () => getAvailablePets(limit),
    })
}

export const usePetsByIds = (petIds: string[]) => {
    return useQuery({
        queryKey: ['pets', 'byIds', petIds],
        queryFn: () => getPetsByIds(petIds),
        enabled: petIds.length > 0,
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}
