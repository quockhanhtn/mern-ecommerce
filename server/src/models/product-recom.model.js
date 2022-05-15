import mongoose from 'mongoose';

const productRecomSchema = mongoose.Schema(
  {
    productId: { type: String, trim: true, required: true },
    recommend: [{ type: String, trim: true, required: true }],
    version: { type: Number, required: true }
  },
  { id: false, timestamps: false, versionKey: false, }
);
productRecomSchema.index({ productId: 1, version: 1 }, { unique: true });

const productRecomModel = mongoose.model('product_recom', productRecomSchema);
export default productRecomModel;
