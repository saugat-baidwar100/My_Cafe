import { z } from 'zod';

export const AddOrderSchema = z.object({
  userId: z.string().min(1),
  products: z.array(
    z.object({
      productId: z.string().min(1),
      quantity: z.number().min(1),
    })
  ),
  totalAmount: z.number().min(1),
});

export type TAddOrderInput = z.TypeOf<typeof AddOrderSchema>;
