import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    deliveryTime:{
      type:Number //time in sec
    }
  },
  {
    timestamps: true,
  }
);
export const categoryModel =  mongoose.models.Category || mongoose.model('Category', categorySchema);
