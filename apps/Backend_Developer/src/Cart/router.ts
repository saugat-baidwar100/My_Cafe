import { Router } from 'express';
import {
  addToCartController,
  getCartController,
  updateCartItemController,
  removeFromCartController,
  clearCartController,
} from './controller';

const router = Router();

router.post('/add', addToCartController);
router.get('/get', getCartController);
router.put('/update', updateCartItemController);
router.delete('/remove/:productId', removeFromCartController);
router.delete('/clear', clearCartController);

export const cartRouter = router;
