import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    subCategoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'SubCategory', required: true },
    stock: { type: Number, required: true }, // Available stock
    imageUrl: { type: String }, // Image URL of the product
  },
  { timestamps: true }
);

export const productModel = mongoose.models.Product || mongoose.model('Product', productSchema);
