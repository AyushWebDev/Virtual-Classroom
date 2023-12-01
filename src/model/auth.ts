import { z } from "zod";

export enum ROLE {
    'TUTOR' = 'tutor',
    'STUDENT' = 'student'
  }

export const RegisterRequestSchema = z.object({
    userName: z.string({
        required_error: 'userName is required',
        invalid_type_error: 'invalid userName'
    }),
    userEmail: z.string({
        required_error: 'userEmail is required',
        invalid_type_error: 'invalid userEmail'
    }),
    userPassword: z.string({
        required_error: 'userPassword is required',
        invalid_type_error: 'invalid userPassword'
    }),
    userRole: z.string({
        required_error: 'userRole is required',
        invalid_type_error: 'invalid userRole'
    })
    .refine((value) => Object.values(ROLE).includes(value as ROLE), {
        message: "Invalid userRole"
      })
})

export type RegisterRequest = z.infer<typeof RegisterRequestSchema>

export const LoginRequestSchema = z.object({
    userEmail: z.string({
        required_error: 'userEmail is required',
        invalid_type_error: 'invalid userEmail'
    }),
    userPassword: z.string({
        required_error: 'userPassword is required',
        invalid_type_error: 'invalid userPassword'
    })
})

export type LoginRequest = z.infer<typeof LoginRequestSchema>