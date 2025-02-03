import {
  AddCategoryControllerSchema,
  UpdateCategoryControllerSchema,
} from './validation';

import {
  createCategoryService,
  deleteCategoryService,
  getCategoryByIdService,
  getCategoryService,
  updateCategoryService,
} from './services';
import { NextFunction, Request, Response } from 'express';
import { APIError } from '../../Utils/error';
export async function addCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    // console.log('debug 2');
    const body = req.body;

    const { success, error, data } =
      AddCategoryControllerSchema.safeParse(body);
    if (!success) {
      const errors = error.flatten().fieldErrors;
      res.status(400).json({
        message: 'Invalid request',
        data: null,
        isSuccess: false,
        errors: errors,
      });
      return;
    }
    const category = await createCategoryService(data);

    res.status(201).json({
      message: 'Category Created Successfully',
      isSuccess: true,
      data: category,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function updateCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const categoryId = req.params.categoryId;

    const { success, error, data } =
      UpdateCategoryControllerSchema.safeParse(body);
    if (!success) {
      const errors = error.flatten().fieldErrors;
      res.status(400).json({
        message: 'Invalid request',
        data: null,
        isSuccess: false,
        errors: errors,
      });
      return;
    }
    const category = await updateCategoryService(categoryId, data);

    res.status(201).json({
      message: 'Category Updated Sucessfully ..!',
      isSuccess: true,
      data: category,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function deleteCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryId = req.params.categoryId;
    const category = await deleteCategoryService(categoryId);

    res.status(201).json({
      message: 'Book deleted sucessfully',
      isSuccess: true,
      data: category,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function getCategoryController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const category = await getCategoryService();
    res.status(200).json({
      message: 'Category retrieved successfully',
      isSuccess: true,
      data: category,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}

export async function getCategoryByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const categoryId = req.params.categoryId;
    const category = await getCategoryByIdService(categoryId);
    res.status(200).json({
      message: 'Category retrieved successfully',
      isSuccess: true,
      data: category,
    });
  } catch (error) {
    if (error instanceof APIError) {
      next(error);
    } else {
      next(new APIError(500, (error as Error).message));
    }
  }
}
