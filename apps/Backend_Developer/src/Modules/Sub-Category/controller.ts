import {
    AddSubCategoryControllerSchema,
    UpdateSubCategoryControllerSchema,
  } from './validation';
  
  import {
    createSubCategoryService,
    deleteSubCategoryService,
    getSubCategoryByIdService,
    getSubCategoryService,
    updateSubCategoryService,
  } from './services';
  import { NextFunction, Request, Response } from 'express';
  import { APIError } from '../../Utils/error';
  
  export async function addSubCategoryController(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
  
      const { success, error, data } = AddSubCategoryControllerSchema.safeParse(body);
      if (!success) {
        res.status(400).json({
          message: 'Invalid request',
          data: null,
          isSuccess: false,
          errors: error.flatten().fieldErrors,
        });
        return;
      }
  
      const subCategory = await createSubCategoryService(data);
  
      res.status(201).json({
        message: 'SubCategory Created Successfully',
        isSuccess: true,
        data: subCategory,
      });
    } catch (error) {
      next(error instanceof APIError ? error : new APIError(500, (error as Error).message));
    }
  }
  
  export async function updateSubCategoryController(req: Request, res: Response, next: NextFunction) {
    try {
      const body = req.body;
      const subCategoryId = req.params.subCategoryId;
  
      const { success, error, data } = UpdateSubCategoryControllerSchema.safeParse(body);
      if (!success) {
        res.status(400).json({
          message: 'Invalid request',
          data: null,
          isSuccess: false,
          errors: error.flatten().fieldErrors,
        });
        return;
      }
  
      const subCategory = await updateSubCategoryService(subCategoryId, data);
  
      res.status(200).json({
        message: 'SubCategory Updated Successfully!',
        isSuccess: true,
        data: subCategory,
      });
    } catch (error) {
      next(error instanceof APIError ? error : new APIError(500, (error as Error).message));
    }
  }
  
  export async function deleteSubCategoryController(req: Request, res: Response, next: NextFunction) {
    try {
      const subCategoryId = req.params.subCategoryId;
      const subCategory = await deleteSubCategoryService(subCategoryId);
  
      res.status(200).json({
        message: 'SubCategory Deleted Successfully!',
        isSuccess: true,
        data: subCategory,
      });
    } catch (error) {
      next(error instanceof APIError ? error : new APIError(500, (error as Error).message));
    }
  }
  
  export async function getSubCategoryController(req: Request, res: Response, next: NextFunction) {
    try {
      const subCategories = await getSubCategoryService();
      res.status(200).json({
        message: 'SubCategories Retrieved Successfully!',
        isSuccess: true,
        data: subCategories,
      });
    } catch (error) {
      next(error instanceof APIError ? error : new APIError(500, (error as Error).message));
    }
  }
  
  export async function getSubCategoryByIdController(req: Request, res: Response, next: NextFunction) {
    try {
      const subCategoryId = req.params.subCategoryId;
      const subCategory = await getSubCategoryByIdService(subCategoryId);
      res.status(200).json({
        message: 'SubCategory Retrieved Successfully!',
        isSuccess: true,
        data: subCategory,
      });
    } catch (error) {
      next(error instanceof APIError ? error : new APIError(500, (error as Error).message));
    }
  }
  