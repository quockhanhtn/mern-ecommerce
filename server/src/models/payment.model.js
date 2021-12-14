import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import removeMultiSpace from './plugins/remove-multi-space.js';
import constants from '../constants.js';
import addressSchema from './schemas/address.schema.js';


const paymentSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,

    order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    amount: { type: Number, required: true },

    desc: { type: String, trim: true, required: false },
    paidDate: { type: Date, default: Date.now },
  },
  { _id: true, id: false, timestamps: true, versionKey: false, }
);

paymentSchema.plugin(mongooseLeanVirtuals);
paymentSchema.plugin(removeMultiSpace);

const paymentModel = mongoose.model('Payment', paymentSchema);
export default paymentModel;
