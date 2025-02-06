import { Router } from 'express';
import {
  addToCartController,
  getCartController,
  updateCartItemController,
  removeFromCartController,
  clearCartController,
} from './controller';
import { checkAuth } from '../Auth/middleware';

const router = Router();

router.post('/add', checkAuth, addToCartController);
router.get('/get', getCartController);
router.put('/update', updateCartItemController);
router.delete('/remove/:productId', removeFromCartController);
router.delete('/clear', clearCartController);

export const cartRouter = router;
