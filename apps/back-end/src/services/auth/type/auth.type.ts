import { z } from 'zod';

export const registerRequestSchema = z.object({
    email: z.string(),
    password: z.string(),
    name: z.string(),
});
export type RegisterRequest = z.infer<typeof registerRequestSchema>;

export const loginRequestSchema = z.object({
    email: z.string(),
    password: z.string(),
});
export type LoginRequest = z.infer<typeof loginRequestSchema>;
