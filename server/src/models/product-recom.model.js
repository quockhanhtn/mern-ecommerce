import mongoose from 'mongoose';

const productRecomSchema = mongoose.Schema(
  {
    productId: { type: String, trim: true, required: true },
    recommendId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    version: { type: Number, required: true }
  },
  { id: false, timestamps: false, versionKey: false, }
);

const productRecomModel = mongoose.model('product_recom', productRecomSchema);
export default productRecomModel;
