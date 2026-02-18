import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuth } from '../context/useAuth'
import {
    getFavoriteAnimals,
    addFavoriteAnimal,
    removeFavoriteAnimal,
} from '../services/profileService'
import type { Animal } from '../types/profile'

export const useFavoriteAnimalsQuery = () => {
    const { user } = useAuth()

    return useQuery({
        queryKey: ['favoriteAnimals', user?.id],
        queryFn: () => getFavoriteAnimals(user!.id),
        enabled: !!user?.id,
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}

export const useFavoriteAnimalsMutations = () => {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    const addMutation = useMutation({
        mutationFn: (animalId: string) => addFavoriteAnimal(user!.id, animalId),
        onMutate: async (animalId: string) => {
            await queryClient.cancelQueries({ queryKey: ['favoriteAnimals', user?.id] })

            const previousFavorites = queryClient.getQueryData<string[]>(['favoriteAnimals', user?.id]) || []

            queryClient.setQueryData<string[]>(['favoriteAnimals', user?.id], (old = []) =>
                old.includes(animalId) ? old : [...old, animalId]
            )

            return { previousFavorites }
        },
        onError: (_err, _animalId, context) => {
            queryClient.setQueryData(['favoriteAnimals', user?.id], context?.previousFavorites)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['favoriteAnimals', user?.id] })
        },
    })

    const removeMutation = useMutation({
        mutationFn: (animalId: string) => removeFavoriteAnimal(user!.id, animalId),
        onMutate: async (animalId: string) => {
            await queryClient.cancelQueries({ queryKey: ['favoriteAnimals', user?.id] })

            const previousFavorites = queryClient.getQueryData<string[]>(['favoriteAnimals', user?.id]) || []

            queryClient.setQueryData<string[]>(['favoriteAnimals', user?.id], (old = []) =>
                old.filter(id => id !== animalId)
            )

            return { previousFavorites }
        },
        onError: (_err, _animalId, context) => {
            queryClient.setQueryData(['favoriteAnimals', user?.id], context?.previousFavorites)
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['favoriteAnimals', user?.id] })
        },
    })

    return {
        addMutation,
        removeMutation,
        isLoading: addMutation.isPending || removeMutation.isPending,
        error: addMutation.error || removeMutation.error,
    }
}

export const useFavoriteAnimals = () => {
    const { user } = useAuth()
    const queryClient = useQueryClient()

    const { data: favoriteAnimalIds = [], isLoading, error, refetch } = useFavoriteAnimalsQuery()
    const { addMutation, removeMutation, isLoading: mutationLoading, error: mutationError } = useFavoriteAnimalsMutations()

    const favoriteAnimals = user?.id ? queryClient.getQueryData<string[]>(['favoriteAnimals', user.id]) || [] : []

    const toggleFavoriteAnimal = async (animal: Animal) => {
        if (!user?.id || mutationLoading) {
            return
        }

        const isCurrentlyFavorite = favoriteAnimals.includes(animal.id)

        try {
            if (isCurrentlyFavorite) {
                await removeMutation.mutateAsync(animal.id)
            } else {
                await addMutation.mutateAsync(animal.id)
            }
        } catch (error) {
            console.error('Failed to toggle favorite animal:', error)
            throw error
        }
    }

    const addToFavorites = async (animal: Animal) => {
        if (!user?.id || mutationLoading) {
            return
        }

        try {
            await addMutation.mutateAsync(animal.id)
        } catch (error) {
            console.error('Failed to add favorite animal:', error)
            throw error
        }
    }

    const removeFromFavorites = async (animal: Animal) => {
        if (!user?.id || mutationLoading) {
            return
        }

        try {
            await removeMutation.mutateAsync(animal.id)
        } catch (error) {
            console.error('Failed to remove favorite animal:', error)
            throw error
        }
    }

    const isFavorite = (animalId: string) => {
        return favoriteAnimalIds.includes(animalId)
    }

    const handleFavoriteAnimalsChange = async (animals: Animal[]) => {
        if (animals.length > 0) {
            await addToFavorites(animals[0])
        }
    }

    return {
        favoriteAnimals,
        favoriteAnimalIds,

        isLoading: isLoading || mutationLoading,
        isQueryLoading: isLoading,
        isMutationLoading: mutationLoading,

        error: error || mutationError,
        queryError: error,
        mutationError,

        toggleFavoriteAnimal,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        refetch,

        handleFavoriteAnimalsChange,
    }
}

export const useIsFavorite = (animalId: string) => {
    const { favoriteAnimalIds } = useFavoriteAnimals()
    return favoriteAnimalIds.includes(animalId)
}

export const useFavoriteCount = () => {
    const { favoriteAnimalIds } = useFavoriteAnimals()
    return favoriteAnimalIds.length
}