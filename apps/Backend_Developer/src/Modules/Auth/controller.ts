import { Request, Response, NextFunction } from 'express';
import { APIError } from '../../Utils/error';
import { LoginControllerSchema, RegisterControllerSchema } from './validation';
import { createUserService, getUserById, loginService } from './services';
// import { createUserService, getUserById, loginService } from './service';

export async function registerController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const { success, error, data } = RegisterControllerSchema.safeParse(body);
    if (!success) {
      const errors = error.flatten().fieldErrors;
      res.status(400).json({
        message: 'Invalid request',
        data: null,
        isSuccess: false,
        errors,
      });
      return;
    }

    const user = await createUserService(data);

    res.status(201).json({
      message: 'User registered successfully',
      isSuccess: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phoneNumber: user.phoneNumber,
      },
    });
  } catch (error) {
    next(error instanceof APIError ? error : new APIError(500, error.message));
  }
}

export async function loginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const body = req.body;

    const { success, error, data } = LoginControllerSchema.safeParse(body);
    if (!success) {
      const errors = error.flatten().fieldErrors;
      res.status(400).json({
        message: 'Invalid request',
        data: null,
        isSuccess: false,
        errors,
      });
      return;
    }

    const loginOutput = await loginService(data);

    res.cookie('token', loginOutput.token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60, // 1 hour
      path: '/',
    });

    res.status(200).json({
      message: 'User logged in successfully',
      isSuccess: true,
      data: loginOutput,
    });
  } catch (error) {
    next(error instanceof APIError ? error : new APIError(500, error.message));
  }
}

export async function logoutController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    res.clearCookie('token');

    res.status(200).json({
      message: 'User logged out successfully',
      isSuccess: true,
      data: null,
    });
  } catch (error) {
    next(error instanceof APIError ? error : new APIError(500, error.message));
  }
}

export async function meController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    if (!req.user) {
      res.status(401).json({
        message: 'User not found',
        isSuccess: false,
        data: null,
      });
      return;
    }

    const user = await getUserById(req.user.id);

    res.status(200).json({
      message: 'User retrieved successfully',
      isSuccess: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error instanceof APIError ? error : new APIError(500, error.message));
  }
}
