import mongoose from 'mongoose';

const subCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    categoryId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Category', 
      required: true 
    }, // Reference to Category
    deliveryTime: { type: Number }, // Time in seconds
  },
  { timestamps: true }
);

export const subCategoryModel = 
  mongoose.models.SubCategory || mongoose.model('SubCategory', subCategorySchema);
