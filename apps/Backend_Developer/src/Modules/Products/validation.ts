import { z } from 'zod';

export const AddProductSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  price: z.number().min(1),
  categoryId: z.string().min(1),
  subCategoryId: z.string().min(1),
  stock: z.number().min(0),
  imageUrl: z.string().optional(),
});

export type TAddProductInput = z.TypeOf<typeof AddProductSchema>;

export const UpdateProductSchema = AddProductSchema.partial();

export type TUpdateProductInput = z.TypeOf<typeof UpdateProductSchema>;
