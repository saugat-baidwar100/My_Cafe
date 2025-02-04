import { NextFunction, Request, Response } from 'express';
import { APIError } from '../Utils/error';
import {
  addToCartService,
  removeFromCartService,
  getCartService,
  updateCartItemService,
  clearCartService,
} from './services';
import { AddToCartSchema, UpdateCartSchema } from './validation';

// ✅ Add item to cart
export async function addToCartController(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = AddToCartSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

    const cart = await addToCartService(req.user.id, parsed.data.productId, parsed.data.quantity);
    res.status(201).json({ message: 'Item added to cart', data: cart });
  } catch (error) {
    next(error instanceof APIError ? error : new APIError(500, (error as Error).message));
  }
}

// ✅ Get cart details
export async function getCartController(req: Request, res: Response, next: NextFunction) {
  try {
    const cart = await getCartService(req.user.id);
    res.status(200).json({ message: 'Cart retrieved successfully', data: cart });
  } catch (error) {
    next(error instanceof APIError ? error : new APIError(500, (error as Error).message));
  }
}

// ✅ Update cart item quantity
export async function updateCartItemController(req: Request, res: Response, next: NextFunction) {
  try {
    const parsed = UpdateCartSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ errors: parsed.error.flatten().fieldErrors });

    const cart = await updateCartItemService(req.user.id, parsed.data.productId, parsed.data.quantity);
    res.status(200).json({ message: 'Cart item updated', data: cart });
  } catch (error) {
    next(error instanceof APIError ? error : new APIError(500, (error as Error).message));
  }
}

// ✅ Remove item from cart
export async function removeFromCartController(req: Request, res: Response, next: NextFunction) {
  try {
    const { productId } = req.params;
    if (!productId) return res.status(400).json({ message: 'Product ID is required' });

    const cart = await removeFromCartService(req.user.id, productId);
    res.status(200).json({ message: 'Item removed from cart', data: cart });
  } catch (error) {
    next(error instanceof APIError ? error : new APIError(500, (error as Error).message));
  }
}

// ✅ Clear cart
export async function clearCartController(req: Request, res: Response, next: NextFunction) {
  try {
    const cart = await clearCartService(req.user.id);
    res.status(200).json({ message: 'Cart cleared successfully', data: cart });
  } catch (error) {
    next(error instanceof APIError ? error : new APIError(500, (error as Error).message));
  }
}
