import { APIError } from '../../Utils/error';
import { orderModel } from './model';
import { productModel } from '../Products/model';
import { TAddOrderInput } from './validation';

export async function createOrderService(input: TAddOrderInput) {
  // Calculate total amount
  let totalAmount = 0;

  for (const item of input.products) {
    const product = await productModel.findById(item.productId);
    if (!product) throw APIError.notFound('Product not found');

    totalAmount += product.price * item.quantity;
  }

  // Create order
  const order = await new orderModel({ ...input, totalAmount }).save();
  return order;
}

export async function updateOrderStatusService(
  orderId: string,
  status: string
) {
  const order = await orderModel.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );
  if (!order) throw APIError.notFound('Order not found');
  return order;
}

export async function deleteOrderService(orderId: string) {
  const order = await orderModel.findByIdAndDelete(orderId);
  if (!order) throw APIError.notFound('Order not found');
}

export async function getOrderService() {
  return await orderModel
    .find()
    .populate('userId')
    .populate('products.productId');
}

export async function getOrderByIdService(orderId: string) {
  const order = await orderModel
    .findById(orderId)
    .populate('userId')
    .populate('products.productId');
  if (!order) throw APIError.notFound('Order not found');
  return order;
}
