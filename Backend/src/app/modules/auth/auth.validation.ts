import { z } from 'zod';

export const loginUserZodSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

export const genAccessTokenZodSchema = z.object({
  refreshToken: z.string({
    required_error: 'Refresh token is required!',
  }),
});

export const regUserZodSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters long' })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});
