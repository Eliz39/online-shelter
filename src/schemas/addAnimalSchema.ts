import { z } from 'zod'

export const addAnimalSchema = z
    .object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        species: z.enum(['dog', 'cat', 'other'], {
            message: 'Please select a species',
        }),
        age: z.coerce
            .number()
            .min(0, 'Age must be 0 or greater')
            .max(30, 'Age must be 30 or less'),
        gender: z.enum(['Male', 'Female', 'Unknown'], {
            message: 'Please select a gender',
        }),
        size: z.enum(['Small', 'Medium', 'Large'], {
            message: 'Please select a size',
        }),
        color: z.string().min(2, 'Color must be at least 2 characters'),
        description: z
            .string()
            .min(10, 'Description must be at least 10 characters')
            .max(500, 'Description must be 500 characters or less'),
        imageUploadType: z.enum(['upload', 'url']),
        imageFile: z.any().optional(),
        imageUrl: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.imageUploadType === 'upload') {
                return data.imageFile instanceof File
            }
            if (data.imageUploadType === 'url') {
                return (
                    data.imageUrl !== undefined &&
                    data.imageUrl.length > 0 &&
                    z.string().url().safeParse(data.imageUrl).success
                )
            }
            return false
        },
        {
            message: 'Please provide a valid image',
            path: ['imageFile'],
        }
    )

export type AddAnimalFormInputs = z.infer<typeof addAnimalSchema>
