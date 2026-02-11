import { z } from 'zod'

export const adoptionSchema = z.object({
    fullName: z.string().min(2, 'Full name must be at least 2 characters'),
    email: z.string().email('Invalid email address'),
    phone: z
        .string()
        .min(9, 'Phone number must be at least 10 digits')
        .regex(/^[0-9+\-() ]+$/, 'Invalid phone number format'),
    address: z.string().min(5, 'Address must be at least 5 characters'),
    petName: z.string(),
    petId: z.string(),
    message: z.string().optional(),
})

export type AdoptionFormInputs = z.infer<typeof adoptionSchema>
