// declare namespace Express {
//   export interface Request {
//     user: {
//       id: string;
//       username: string;
//       email: string;
//       role: 'admin' | 'user' | 'superadmin';
//     };
//   }
// }

import { Request } from 'express';

export interface AuthRequest extends Request {
  user?: {
    id: string;
    username: string;
    email: string;
    role: 'user' | 'admin' | 'superadmin';
  };
}

