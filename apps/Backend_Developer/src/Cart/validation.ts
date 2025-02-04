import { z } from 'zod';

// ✅ Schema for adding an item to the cart
export const AddToCartSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

export type TAddToCartInput = z.infer<typeof AddToCartSchema>;

// ✅ Schema for updating cart item quantity
export const UpdateCartSchema = z.object({
  productId: z.string().min(1, 'Product ID is required'),
  quantity: z.number().min(1, 'Quantity must be at least 1'),
});

export type TUpdateCartInput = z.infer<typeof UpdateCartSchema>;
