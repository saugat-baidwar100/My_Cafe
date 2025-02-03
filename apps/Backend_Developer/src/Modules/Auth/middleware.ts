import { Request, Response, NextFunction } from 'express';
import { TTokenPayload, verifyToken } from '../../Utils/auth';

export async function checkAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies?.token || '';

  if (!token) {
    res.status(401).json({ message: 'Unauthorized', isSuccess: false });
    return;
  }

  const verifyTokenOutput = verifyToken(token);
  if (!verifyTokenOutput.isValid) {
    res.status(401).json({
      message: verifyTokenOutput.message,
      isSuccess: false,
    });
    return;
  }

  req.user = verifyTokenOutput.payload as TTokenPayload;
  next();
}

export async function checkRole(
  role: string,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user.role !== role) {
    res.status(403).json({ message: 'Forbidden', isSuccess: false });
    return;
  }
  next();
}
