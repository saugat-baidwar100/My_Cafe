import { APIError } from '../../Utils/error';
import { productModel } from './model';
import { TAddProductInput, TUpdateProductInput } from './validation';

export async function createProductService(input: TAddProductInput) {
  return await new productModel(input).save();
}

export async function updateProductService(productId: string, input: TUpdateProductInput) {
  const product = await productModel.findByIdAndUpdate(productId, input, { new: true });
  if (!product) throw APIError.notFound('Product not found');
  return product;
}

export async function deleteProductService(productId: string) {
  const product = await productModel.findByIdAndDelete(productId);
  if (!product) throw APIError.notFound('Product not found');
}

export async function getProductService() {
  return await productModel.find().populate(['categoryId', 'subCategoryId']);
}

export async function getProductByIdService(productId: string) {
  const product = await productModel.findById(productId).populate(['categoryId', 'subCategoryId']);
  if (!product) throw APIError.notFound('Product not found');
  return product;
}
