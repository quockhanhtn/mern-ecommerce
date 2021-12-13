import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import removeMultiSpace from './plugins/remove-multi-space.js';
import constants from '../constants.js';
import addressSchema from './schemas/address.schema.js';


const orderSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,

    customer: {
      type: {
        name: { type: String, trim: true, required: true },
        phone: { type: String, trim: true, required: true },
      },
      required: false
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    address: { type: addressSchema, required: false },
    isReceiveAtStore: { type: Boolean, default: false },

    status: {
      type: String,
      enum: Object.values(constants.ORDER.STATUS),
      default: constants.ORDER.STATUS.PENDING,
      required: true
    },
    paymentMethod: {
      type: String,
      enum: Object.values(constants.ORDER.PAYMENT_METHOD),
      default: constants.ORDER.PAYMENT_METHOD.CASH,
      required: true
    },
    paymentStatus: {
      type: String,
      enum: Object.values(constants.ORDER.PAYMENT_STATUS),
      default: constants.ORDER.PAYMENT_STATUS.PENDING,
      required: true
    },
    items: [{
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      sku: { type: String, required: true },
      quantity: { type: Number, required: true },
      pricePerUnit: { type: Number, required: true }
    }],

    totalPrice: { type: Number, required: false },
    totalShipping: { type: Number, required: false },
    totalTax: { type: Number, required: false },
    totalDiscount: { type: Number, required: false },
    total: { type: Number, required: false },

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { _id: true, id: false, timestamps: true, versionKey: false, }
);

orderSchema.plugin(mongooseLeanVirtuals);
orderSchema.plugin(removeMultiSpace);

orderSchema.pre('save', function (next) {
  if (!this?.customer && !this?.user) {
    return next(new Error('Invalid customer or user'));
  }

  if (!this.isReceiveAtStore && !this.address) {
    return next(new Error('Missing address'));
  }

  next();
});

const orderModel = mongoose.model('Order', orderSchema);
export default orderModel;
