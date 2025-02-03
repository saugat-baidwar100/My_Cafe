import { Router } from 'express';
import {
  loginController,
  logoutController,
  meController,
  registerController,
} from './controller';

function createAuthRouter() {
  const router = Router();

  router.post('/login', loginController);
  router.post('/register', registerController);
  router.post('/logout', logoutController);
  router.get('/me', meController);

  return router;
}

export const authRouter = createAuthRouter;

// router.get('/me', checkAuth, meController);
// router.get('/admin', checkAuth, (req, res) => res.send('Admin route'));
