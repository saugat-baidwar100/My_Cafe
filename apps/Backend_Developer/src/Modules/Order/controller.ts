import { NextFunction, Request, Response } from 'express';
import { APIError } from '../../Utils/error';
import { createOrderService, deleteOrderService, getOrderByIdService, getOrderService, updateOrderStatusService } from './services';
import { AddOrderSchema } from './validation';

export async function addOrderController(req: Request, res: Response, next: NextFunction) {
  try {
    const { success, error, data } = AddOrderSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: 'Invalid request', errors: error.flatten().fieldErrors });
    }
    const order = await createOrderService(data);
    res.status(201).json({ message: 'Order Created Successfully', data: order });
  } catch (error) {
    next(new APIError(500, (error as Error).message));
  }
}

export async function updateOrderStatusController(req: Request, res: Response, next: NextFunction) {
  try {
    const { status } = req.body;
    const orderId = req.params.orderId;

    const order = await updateOrderStatusService(orderId, status);
    res.status(200).json({ message: 'Order Status Updated Successfully', data: order });
  } catch (error) {
    next(new APIError(500, (error as Error).message));
  }
}

export async function deleteOrderController(req: Request, res: Response, next: NextFunction) {
  try {
    await deleteOrderService(req.params.orderId);
    res.status(200).json({ message: 'Order Deleted Successfully' });
  } catch (error) {
    next(new APIError(500, (error as Error).message));
  }
}

export async function getOrderController(req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await getOrderService();
    res.status(200).json({ message: 'Orders Retrieved Successfully', data: orders });
  } catch (error) {
    next(new APIError(500, (error as Error).message));
  }
}

export async function getOrderByIdController(req: Request, res: Response, next: NextFunction) {
  try {
    const order = await getOrderByIdService(req.params.orderId);
    res.status(200).json({ message: 'Order Retrieved Successfully', data: order });
  } catch (error) {
    next(new APIError(500, (error as Error).message));
  }
}
