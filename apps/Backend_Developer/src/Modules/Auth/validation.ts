import { z } from 'zod';

export const RegisterControllerSchema = z.object({
  name: z.string().min(3).max(50),
  email: z.string().email(),
  password: z.string().min(6).max(25),
  phoneNumber: z.string().min(10).max(15),
  role: z.enum(['user', 'admin', 'superadmin']).default('user'),
});
export type TRegisterControllerInput = z.TypeOf<
  typeof RegisterControllerSchema
>;

export const LoginControllerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6).max(25),
});
export type TLoginControllerInput = z.TypeOf<typeof LoginControllerSchema>;
