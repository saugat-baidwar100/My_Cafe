import { Router } from 'express';
import {
  addSubCategoryController,
  deleteSubCategoryController,
  getSubCategoryByIdController,
  getSubCategoryController,
  updateSubCategoryController,
} from './controller';

function createSubCategoryRouter() {
  const router = Router();

  router.post('/addsubcategory', addSubCategoryController);
  router.post('/updatesubcategory/:subCategoryId', updateSubCategoryController);
  router.delete('/delete/:subCategoryId', deleteSubCategoryController);
  router.get('/allsubcategories', getSubCategoryController);
  router.get('/get/:subCategoryId', getSubCategoryByIdController);

  return router;
}

export const subCategoryRouter = createSubCategoryRouter;
