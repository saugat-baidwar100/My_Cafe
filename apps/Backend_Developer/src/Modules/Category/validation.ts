import { z } from 'zod';

export const AddCategoryControllerSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export type TAddCategoryControllerInput = z.TypeOf<
  typeof AddCategoryControllerSchema
>;

export const UpdateCategoryControllerSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
});

export type TUpdateCategoryControllerInput = z.TypeOf<
  typeof UpdateCategoryControllerSchema
>;
