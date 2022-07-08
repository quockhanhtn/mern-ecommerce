import mongoose from 'mongoose';
import constants from '../constants.js';

const otpSchema = mongoose.Schema(
  {
    email: {
      type: String,
      match: [constants.REGEX.EMAIL, 'Please fill a valid email address'],
      trim: true,
    },
    otp: { type: String },
    time: { type: Date, default: Date.now, index: { expires: 60 * 5 } }
  },
  { timestamps: false, versionKey: false, id: false, _id: true }
);

const otpModel = mongoose.model('otp', otpSchema);
export default otpModel;
