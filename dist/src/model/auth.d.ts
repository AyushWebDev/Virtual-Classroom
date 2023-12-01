import { z } from "zod";
export declare enum ROLE {
    'TUTOR' = "tutor",
    'STUDENT' = "student"
}
export declare const RegisterRequestSchema: z.ZodObject<{
    userName: z.ZodString;
    userEmail: z.ZodString;
    userPassword: z.ZodString;
    userRole: z.ZodEffects<z.ZodString, string, string>;
}, "strip", z.ZodTypeAny, {
    userName: string;
    userEmail: string;
    userPassword: string;
    userRole: string;
}, {
    userName: string;
    userEmail: string;
    userPassword: string;
    userRole: string;
}>;
export type RegisterRequest = z.infer<typeof RegisterRequestSchema>;
export declare const LoginRequestSchema: z.ZodObject<{
    userEmail: z.ZodString;
    userPassword: z.ZodString;
}, "strip", z.ZodTypeAny, {
    userEmail: string;
    userPassword: string;
}, {
    userEmail: string;
    userPassword: string;
}>;
export type LoginRequest = z.infer<typeof LoginRequestSchema>;
//# sourceMappingURL=auth.d.ts.map