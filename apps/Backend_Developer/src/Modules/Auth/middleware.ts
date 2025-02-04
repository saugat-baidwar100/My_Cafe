/* eslint-disable @typescript-eslint/no-namespace */
import { Request, Response, NextFunction } from 'express';
import { verifyToken, TTokenPayload } from '../../Utils/auth';

// Extend Express Request type to include 'user'
declare global {
  namespace Express {
    interface Request {
      user?: TTokenPayload;
    }
  }
}

export function checkAuth(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.token || '';
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  const verifyResult = verifyToken(token);
  if (!verifyResult.isValid)
    return res.status(401).json({ message: verifyResult.message });

  req.user = verifyResult.payload as TTokenPayload;
  next();
}

export function checkRole(role: 'user' | 'admin' | 'superadmin') {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || req.user.role !== role) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
}
