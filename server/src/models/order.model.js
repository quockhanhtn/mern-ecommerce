import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import removeMultiSpace from './plugins/remove-multi-space.js';
import constants from '../constants.js';
import addressSchema from './schemas/address.schema.js';


const orderSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    address: { type: addressSchema, required: true },
    status: {
      type: String,
      enum: Object.values(constants.ORDER.STATUS),
      default: constants.ORDER.STATUS.PENDING,
      required: true
    },
    items: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      sku: { type: String, required: true },
      quantity: { type: Number, required: true },
      pricePerUnit: { type: Number, required: true }
    }],

    totalPrice: { type: Number, required: true },
    totalShipping: { type: Number, required: true },
    totalTax: { type: Number, required: true },
    totalDiscount: { type: Number, required: true },
    total: { type: Number, required: true },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { _id: true, id: false, timestamps: true, versionKey: false, }
);

orderSchema.plugin(mongooseLeanVirtuals);
orderSchema.plugin(removeMultiSpace);

const orderModel = mongoose.model('Order', orderSchema);
export default orderModel;
