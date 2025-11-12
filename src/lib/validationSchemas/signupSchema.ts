import { z } from 'zod'

export const signupSchema = z.object({
  name: z.string().min(2, { message: 'Enter your name' }),
  role: z.literal(['shelter', 'adopter'], {
    message: 'Select one of the options',
  }),
  email: z.email(),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
})

export type SignupFormInputs = z.infer<typeof signupSchema>
