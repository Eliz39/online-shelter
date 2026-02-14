import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    getUserProfile,
    saveUserProfile,
    getFavoriteAnimals,
    saveFavoriteAnimals,
} from '../services/profileService'
import type { ProfileFormData } from '../types/profile'

export const useUserProfile = (userId: string | undefined) => {
    return useQuery({
        queryKey: ['profile', userId],
        queryFn: () => getUserProfile(userId!),
        enabled: !!userId,
    })
}

export const useFavoriteAnimals = () => {
    return useQuery({
        queryKey: ['favoriteAnimals'],
        queryFn: getFavoriteAnimals,
    })
}

export const useSaveProfile = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: (data: ProfileFormData) => saveUserProfile(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['profile'] })
        },
    })
}

export const useSaveFavoriteAnimals = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: ({
            userId,
            favoriteAnimalId,
        }: {
            userId: string
            favoriteAnimalId: string
        }) => saveFavoriteAnimals(userId, favoriteAnimalId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favoriteAnimals'] })
        },
    })
}
