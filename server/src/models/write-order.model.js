import mongoose from 'mongoose';
import slugGenerator from 'mongoose-slug-updater';
import removeMultiSpace from './plugins/remove-multi-space.js';

const writeOrderSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    userId: { type: mongoose.Types.ObjectId, require: true },
    
    listProducts: { type: Array, trim: true, required: false }
  },
  { timestamps: true, versionKey: false }
);

writeOrderSchema.plugin(slugGenerator);
writeOrderSchema.plugin(removeMultiSpace);

const writeOrderModel = mongoose.model('WriteOrder', writeOrderSchema);
export default writeOrderModel;