import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import removeMultiSpace from './plugins/remove-multi-space.js';


const { Schema } = mongoose;

const paymentSchema = new Schema(
  {
    _id: mongoose.Types.ObjectId,

    order: { type: Schema.Types.ObjectId, ref: 'Order' },
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
