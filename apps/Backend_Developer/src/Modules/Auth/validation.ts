import { z } from 'zod';

export const RegisterSchema = z.object({
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum(['user', 'admin', 'superadmin']).optional(),
});

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});
