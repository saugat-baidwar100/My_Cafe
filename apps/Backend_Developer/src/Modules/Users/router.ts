import { Router } from 'express';
import { updateUserController } from './controller';

function createUserRouter() {
  const router = Router();

  router.post('/update', updateUserController);

  return router;
}

export const userRouter = createUserRouter;
