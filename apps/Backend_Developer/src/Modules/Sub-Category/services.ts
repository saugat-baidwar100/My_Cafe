import { APIError } from '../../Utils/error';
import { subCategoryModel } from './model';
import {
  TAddSubCategoryControllerInput,
  TUpdateSubCategoryControllerInput,
} from './validation';

export async function createSubCategoryService(input: TAddSubCategoryControllerInput) {
  const { name, description, categoryId, deliveryTime } = input;

  const existingSubCategory = await subCategoryModel.findOne({ name, categoryId });
  if (existingSubCategory) {
    throw APIError.conflict('SubCategory already exists');
  }

  const newSubCategory = new subCategoryModel({
    name,
    description,
    categoryId,
    deliveryTime,
  });

  await newSubCategory.save();
  return newSubCategory;
}

export async function updateSubCategoryService(subCategoryId: string, input: TUpdateSubCategoryControllerInput) {
  const subCategory = await subCategoryModel.findById(subCategoryId);
  if (!subCategory) {
    throw APIError.notFound('SubCategory not found');
  }

  Object.assign(subCategory, input);
  await subCategory.save();

  return subCategory;
}

export async function deleteSubCategoryService(id: string) {
  const subCategory = await subCategoryModel.findByIdAndDelete(id);
  if (!subCategory) {
    throw APIError.notFound('SubCategory not found');
  }

  return subCategory;
}

export async function getSubCategoryService() {
  return await subCategoryModel.find().populate('categoryId');
}

export async function getSubCategoryByIdService(id: string) {
  const subCategory = await subCategoryModel.findById(id).populate('categoryId');
  if (!subCategory) {
    throw APIError.notFound('SubCategory not found');
  }
  return subCategory;
}
