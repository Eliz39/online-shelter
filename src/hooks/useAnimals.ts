import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createAnimal, uploadAnimalImage } from '../services/animalService'

export const useCreateAnimal = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationFn: async ({
            animalData,
            imageFile,
            imageUrl,
        }: {
            animalData: {
                name: string
                species: string
                age: number
                gender: string
                size: string
                color: string
                description: string
                shelter_id: string
            }
            imageFile?: File
            imageUrl?: string
        }) => {
            let finalImageUrl = imageUrl

            // Upload image if file is provided
            if (imageFile) {
                finalImageUrl = await uploadAnimalImage(imageFile)
            }

            if (!finalImageUrl) {
                throw new Error('Image URL is required')
            }

            return createAnimal({
                ...animalData,
                image_url: finalImageUrl,
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pets'] })
        },
    })
}
