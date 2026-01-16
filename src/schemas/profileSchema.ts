import { z } from 'zod'

export const profileEditSchema = z.object({
  username: z
    .string()
    .min(2, 'Username must be at least 2 characters long')
    .max(50, 'Username must be less than 50 characters')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Username can only contain letters, numbers, underscores, and hyphens'
    ),
  userEmail: z.email('Please enter a valid email address'),
  phoneNumber: z
    .string()
    .optional()
    .refine(
      val => !val || /^\+?[\d\s\-()]+$/.test(val),
      'Please enter a valid phone number'
    ),
})

export type ProfileEditFormInputs = z.infer<typeof profileEditSchema>
