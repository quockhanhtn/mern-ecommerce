import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import removeMultiSpace from './plugins/remove-multi-space.js';
import constants from '../constants.js';
import addressSchema from './schemas/address.schema.js';


const orderSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    numericId: { type: Number, unique: true, min: 10000 },

    // get name and phone from address instead
    customer: {
      type: {
        name: { type: String, trim: true, required: true },
        phone: { type: String, trim: true, required: true },
      },
      required: false
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    address: { type: addressSchema, required: false, default: null },
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
      productId: { type: String, required: true },
      sku: { type: String, required: true },
      productName: { type: String, required: false },
      variantName: { type: String, required: false },
      thumbnail: { type: String, required: false },
      marketPrice: { type: Number, required: false },
      pricePerUnit: { type: Number, required: true }, // sale price
      quantity: { type: Number, required: true }
    }],

    subTotal: { type: Number, required: true },     // Tổng tiền hàng
    shippingFee: { type: Number, required: true },  // Phí vận chuyển
    discount: { type: Number, required: true },     // Giảm giá
    total: { type: Number, required: true },        // Tổng tiền

    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { _id: true, id: false, timestamps: true, versionKey: false, }
);

orderSchema.plugin(mongooseLeanVirtuals);
orderSchema.plugin(removeMultiSpace);

orderSchema.statics.generateNumericId = async function () {
  const item = await this.findOne().select('numericId').sort('-numericId').lean().exec();
  const id = parseInt(item?.numericId, 10) || 9999;
  return id + 1;
}

orderSchema.pre('save', async function (next) {
  this.numericId = this.numericId || await this.constructor.generateNumericId();

  if (!this?.customer && !this?.user) {
    return next(new Error('Invalid customer or user'));
  }

  if (this.isReceiveAtStore) {
    this.address = null;
  } else {
    if (!this.address) {
      return next(new Error('Missing address'));
    }
  }

  next();
});

const orderModel = mongoose.model('Order', orderSchema);
export default orderModel;
