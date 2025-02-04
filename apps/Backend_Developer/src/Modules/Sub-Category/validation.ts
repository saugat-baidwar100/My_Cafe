import { z } from 'zod';

export const AddSubCategoryControllerSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  categoryId: z.string().min(1), // Ensures categoryId is provided
  deliveryTime: z.number().optional(),
});

export type TAddSubCategoryControllerInput = z.TypeOf<typeof AddSubCategoryControllerSchema>;

export const UpdateSubCategoryControllerSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  categoryId: z.string().min(1),
  deliveryTime: z.number().optional(),
});

export type TUpdateSubCategoryControllerInput = z.TypeOf<typeof UpdateSubCategoryControllerSchema>;
