import { Router } from 'express';
import { addOrderController, deleteOrderController, getOrderByIdController, getOrderController, updateOrderStatusController } from './controller';

const router = Router();

router.post('/add', addOrderController);
router.put('/update-status/:orderId', updateOrderStatusController);
router.delete('/delete/:orderId', deleteOrderController);
router.get('/all', getOrderController);
router.get('/:orderId', getOrderByIdController);

export const orderRouter = router;
