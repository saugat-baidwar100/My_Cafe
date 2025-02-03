/* eslint-disable @typescript-eslint/no-unused-expressions */
import { APIError } from '../../Utils/error';
import { categoryModel } from './model';

import {
  TAddCategoryControllerInput,
  TUpdateCategoryControllerInput,
} from './validation';

export async function createCategoryService(
  input: TAddCategoryControllerInput
) {
  const { name, description } = input;

  const category = await categoryModel.findOne({ name });
  if (category) {
    throw APIError.conflict('Book already exist');
  }

  const newCategory = new categoryModel({
    name,
    description,
  });

  await newCategory.save();

  return newCategory;
}

export async function updateCategoryService(
  categoryId: string,
  input: TUpdateCategoryControllerInput
) {
  const { name, description } = input;

  const category = await categoryModel.findById(categoryId);
  if (!category) {
    throw APIError.notFound('category not found');
  }
  (category.name = name),
    (category.description = description),
    await category.replaceOne({ _id: categoryId });

  return category;
}

export async function deleteCategoryService(id: string) {
  const category = await categoryModel.findByIdAndDelete(id);
  if (!category) {
    throw APIError.notFound('Book not found');
  }

  await categoryModel.deleteOne({ _id: id });

  return category;
}

export async function getCategoryService() {
  const category = await categoryModel.find();
  return category;
}

export async function getCategoryByIdService(id: string) {
  const category = await categoryModel.findById(id);
  if (!category) {
    throw APIError.notFound('Book not found');
  }

  return category;
}
