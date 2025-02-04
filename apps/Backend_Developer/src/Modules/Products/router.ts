import { Router } from 'express';
import {
  addProductController,
  deleteProductController,
  getProductByIdController,
  getProductController,
  updateProductController,
} from './controller';

const router = Router();

router.post('/add', addProductController);
router.put('/update/:productId', updateProductController);
router.delete('/delete/:productId', deleteProductController);
router.get('/all', getProductController);
router.get('/:productId', getProductByIdController);

export const productRouter = router;
