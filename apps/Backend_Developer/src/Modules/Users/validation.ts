import { z } from 'zod';

export const AddUserControllerSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  phoneNumber: z
    .string()
    .min(10, 'Phone number must be at least 10 characters'),
  address: z.string().optional(),
  city: z.string().optional(),
  role: z.enum(['user']).optional(),
  isActive: z.boolean().optional(),
});

export type TAddUserControllerInput = z.infer<typeof AddUserControllerSchema>;


export const UpdateUserControllerSchema = AddUserControllerSchema.partial();

export type TUpdateUserControllerInput = z.infer<typeof UpdateUserControllerSchema>;
