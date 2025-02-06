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

// /* eslint-disable @typescript-eslint/no-namespace */
// import { Request, Response, NextFunction } from 'express';
// import { verifyToken, TTokenPayload } from '../../Utils/auth';

// // ✅ Extend Express Request type to include 'user'
// declare global {
//   namespace Express {
//     interface Request {
//       user?: TTokenPayload;
//     }
//   }
// }

// /**
//  * Middleware to check if a user is authenticated.
//  * Extracts the token from cookies or Authorization header.
//  */
// export function checkAuth(req: Request, res: Response, next: NextFunction) {
//   const token =
//     req.cookies?.token || req.headers.authorization?.split(' ')[1] || '';

//   if (!token) {
//     return res.status(401).json({
//       message: 'Unauthorized: No token provided',
//       isSuccess: false,
//     });
//   }

//   const verifyResult = verifyToken(token);
//   if (!verifyResult.isValid) {
//     return res.status(401).json({
//       message: `Unauthorized: ${verifyResult.message}`,
//       isSuccess: false,
//     });
//   }

//   req.user = verifyResult.payload as TTokenPayload;
//   next();
// }

// /**
//  * Middleware to check if a user has the required role(s).
//  * @param roles - Accepts one or multiple roles (e.g., 'admin', 'superadmin').
//  */
// export function checkRole(...roles: ('user' | 'admin' | 'superadmin')[]) {
//   return (req: Request, res: Response, next: NextFunction) => {
//     if (!req.user) {
//       return res
//         .status(401)
//         .json({ message: 'Unauthorized', isSuccess: false });
//     }

//     if (!roles.includes(req.user.role)) {
//       return res.status(403).json({
//         message: 'Forbidden: You do not have access to this resource',
//         isSuccess: false,
//       });
//     }

//     next();
//   };
// }
