import { z } from 'zod'

const baseSchema = z.object({
  name: z.string().min(2, { message: 'Enter your name' }),
  role: z.enum(['shelter', 'adopter'], {
    message: 'Select one of the options',
  }),
  email: z.string().email('Enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

const shelterSchema = baseSchema.extend({
  role: z.literal('shelter'),
  shelterName: z.string().min(2, 'Enter shelter name'),
  phone: z.string().min(9, 'Enter a valid phone number'),
  address: z.string().min(5, 'Enter shelter address'),
  city: z.string().min(2, 'Enter city'),
  state: z.string().min(2, 'Enter state/region'),
  zipCode: z.string().min(5, 'Enter zip code'),
  description: z.string().optional(),
})

const adopterSchema = baseSchema.extend({
  role: z.literal('adopter'),
})

export const signupSchema = z.discriminatedUnion('role', [
  shelterSchema,
  adopterSchema,
])

export type SignupFormInputs = z.infer<typeof signupSchema>
