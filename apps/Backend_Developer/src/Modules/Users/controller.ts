import { NextFunction, Request, Response } from 'express';
import { UpdateUserControllerSchema } from './validation';
import {
  deleteUserService,
  getUserByIdService,
  getUsersService,
  updateUserService,
} from './services';
import { APIError } from '../../Utils/error';

export async function updateUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { success, error, data } = UpdateUserControllerSchema.safeParse(
      req.body
    );
    if (!success) {
      const errors = error.flatten().fieldErrors;
      res.status(400).json({
        message: 'Invalid request',
        isSuccess: false,
        errors: errors,
      });
    }
    const userId = req.params.userId;
    const user = await updateUserService(userId, data);

    res.status(200).json({
      message: 'User Updated Succesfully',
      isSuccess: true,
      data: user,
    });
  } catch (error) {
    next(error instanceof APIError ? error : new APIError(500, error).message);
  }
}

export async function deleteUserController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const user = await deleteUserService(userId);

    res.status(200).json({
      message: 'User deleted Succesfully...!',
      isSuccess: true,
      data: user,
    });
  } catch (error) {
    next(error instanceof APIError ? error : new APIError(500, error).message);
  }
}

export async function getUsersController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const user = await getUsersService();

    res.status(200).json({
      message: 'Users retrieved successfully',
      isSuccess: true,
      data: user,
    });
  } catch (error) {
    next(error instanceof APIError ? error : new APIError(500, error).message);
  }
}

export async function getUserByIdController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const userId = req.params.userId;
    const user = await getUserByIdService(userId);

    res.status(200).json({
      message: 'User reterived Succesfully',
      isSuccess: true,
      data: user,
    });
  } catch (error) {
    next(error instanceof APIError ? error : new APIError(500, error).message);
  }
}
