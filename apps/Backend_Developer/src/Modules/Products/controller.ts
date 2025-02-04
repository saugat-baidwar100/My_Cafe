import { NextFunction, Request, Response } from 'express';
import { APIError } from '../../Utils/error';
import { createProductService, deleteProductService, getProductByIdService, getProductService, updateProductService } from './services';
import { AddProductSchema, UpdateProductSchema } from './validation';

export async function addProductController(req: Request, res: Response, next: NextFunction) {
  try {
    const { success, error, data } = AddProductSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: 'Invalid request', errors: error.flatten().fieldErrors });
    }
    const product = await createProductService(data);
    res.status(201).json({ message: 'Product Created Successfully', data: product });
  } catch (error) {
    next(new APIError(500, (error as Error).message));
  }
}

export async function updateProductController(req: Request, res: Response, next: NextFunction) {
  try {
    const { success, error, data } = UpdateProductSchema.safeParse(req.body);
    if (!success) {
      return res.status(400).json({ message: 'Invalid request', errors: error.flatten().fieldErrors });
    }
    const product = await updateProductService(req.params.productId, data);
    res.status(200).json({ message: 'Product Updated Successfully', data: product });
  } catch (error) {
    next(new APIError(500, (error as Error).message));
  }
}

export async function deleteProductController(req: Request, res: Response, next: NextFunction) {
  try {
    await deleteProductService(req.params.productId);
    res.status(200).json({ message: 'Product Deleted Successfully' });
  } catch (error) {
    next(new APIError(500, (error as Error).message));
  }
}

export async function getProductController(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await getProductService();
    res.status(200).json({ message: 'Products Retrieved Successfully', data: products });
  } catch (error) {
    next(new APIError(500, (error as Error).message));
  }
}

export async function getProductByIdController(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await getProductByIdService(req.params.productId);
    res.status(200).json({ message: 'Product Retrieved Successfully', data: product });
  } catch (error) {
    next(new APIError(500, (error as Error).message));
  }
}
