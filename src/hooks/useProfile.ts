import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
    getUserProfile,
    saveUserProfile,
    getFavoriteAnimals,
    addFavoriteAnimal,
} from '../services/profileService'
import type { ProfileFormData } from '../types/profile'

export const useUserProfile = (userId: string | undefined) => {
    return useQuery({
        queryKey: ['profile', userId],
        queryFn: () => getUserProfile(userId!),
        enabled: !!userId,
    })
}

export const useFavoriteAnimals = (userId: string | undefined) => {
    return useQuery({
        queryKey: ['favoriteAnimals', userId],
        queryFn: () => getFavoriteAnimals(userId!),
        enabled: !!userId,
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
        }) => addFavoriteAnimal(userId, favoriteAnimalId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['favoriteAnimals'] })
        },
    })
}
