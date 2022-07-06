import mongoose from 'mongoose';
import constants from '../constants.js';

const otpSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    email: {
      type: String,
      match: [constants.REGEX.EMAIL, 'Please fill a valid email address'],
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { email: { $type: 'string' } }
      }
    },
    otp: { type: String },
    time: { type: Date, default: Date.now, index: { expires: 120 } }
  },
  { timestamps: false, versionKey: false }
);

const otpModel = mongoose.model('otp', otpSchema);
export default otpModel;
