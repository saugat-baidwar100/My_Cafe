import { Cart } from './model';
import { APIError } from '../Utils/error';
import mongoose from 'mongoose';

// ✅ Add item to cart
export async function addToCartService(
  userId: string,
  productId: string,
  quantity: number
) {
  let cart = await Cart.findOne({ userId });

  const productObjectId = new mongoose.Types.ObjectId(productId);
  if (!cart) {
    cart = new Cart({
      userId,
      items: [{ productId: productObjectId, quantity }],
    });
  } else {
    const itemIndex = cart.items.findIndex((item) =>
      item.productId.equals(productObjectId)
    );
    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({ productId: productObjectId, quantity });
    }
  }

  return await cart.save();
}

//   if (!cart) {
//     cart = new Cart({ userId, items: [{ productId, quantity }] });
//   } else {
//     const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
//     if (itemIndex > -1) {
//       cart.items[itemIndex].quantity += quantity;
//     } else {
//       cart.items.push({ productId, quantity });
//     }
//   }

//   return await cart.save();
// }

// ✅ Get cart details
export async function getCartService(userId: string) {
  const cart = await Cart.findOne({ userId }).populate('items.productId');
  if (!cart) throw new APIError(404, 'Cart not found');
  return cart;
}

// ✅ Update cart item quantity
export async function updateCartItemService(
  userId: string,
  productId: string,
  quantity: number
) {
  const cart = await Cart.findOne({ userId });
  if (!cart) throw new APIError(404, 'Cart not found');

  const itemIndex = cart.items.findIndex(
    (item) => item.productId.toString() === productId
  );
  if (itemIndex === -1) throw new APIError(404, 'Item not found in cart');

  cart.items[itemIndex].quantity = quantity;
  return await cart.save();
}

// ✅ Remove item from cart
export async function removeFromCartService(userId: string, productId: string) {
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $pull: { items: { productId: new mongoose.Types.ObjectId(productId) } } },
    { new: true }
  );
  if (!cart) throw new APIError(404, 'Cart not found');
  return cart;
}

// ✅ Clear entire cart
export async function clearCartService(userId: string) {
  const cart = await Cart.findOneAndUpdate(
    { userId },
    { $set: { items: [] } },
    { new: true }
  );
  if (!cart) throw new APIError(404, 'Cart not found');
  return cart;
}
