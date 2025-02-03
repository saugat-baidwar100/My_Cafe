import { Router } from 'express';

import {
  addCategoryController,
  deleteCategoryController,
  getCategoryByIdController,
  getCategoryController,
  updateCategoryController,
} from './controller';

function createCategoryRouter() {
  const router = Router();

  router.post('/addcategory', addCategoryController);
  router.post('/updatecategory/:categoryId', updateCategoryController);
  router.delete('/delete/:categoryId', deleteCategoryController);
  router.get('/allcategory', getCategoryController);
  router.get('/get/:categoryId', getCategoryByIdController);

  return router;
}

export const categoryRouter = createCategoryRouter;
