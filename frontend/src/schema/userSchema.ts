import { z } from 'zod'

export const userSignupSchema = z.object({
  fullname: z.string().min(3, 'Fullname is required'),
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(4, 'Password must be atlist 4 character')
    .max(12, 'Password length is max 12 digit'),
  contact: z
    .string()
    .min(10, 'Contact number ust be 10 digit')
    .max(10, 'You can enter max 10 digit'),
})

export type SignupInputState = z.infer<typeof userSignupSchema>

export const userLoginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z
    .string()
    .min(4, 'Password must be atlist 4 character')
    .max(12, 'You can enter max 12 digit password length'),
})
export type LoginupInputState = z.infer<typeof userLoginSchema>


export const forgetPasswordSchema = z.object({
    email: z.string().email('Invalid email address')
  })
  
  export type ForgetPasswordState = z.infer<typeof forgetPasswordSchema>



  export const ResetPasswordSchema = z.object({
    password: z
      .string()
      .min(4, 'Password must be atlist 4 character')
      .max(12, 'You can enter max 12 digit password length'),
  })
  export type ResetPassworsState = z.infer<typeof ResetPasswordSchema>
  