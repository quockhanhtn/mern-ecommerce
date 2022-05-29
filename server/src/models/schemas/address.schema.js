import mongoose from 'mongoose';
import constants from '../../constants.js';

const addressSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true },
    phone: {
      type: String,
      match: [constants.REGEX.PHONE, 'Please fill a valid phone number'],
      trim: true,
      required: [true, 'Please fill a phone number']
    },
    type: { type: String, trim: true }, // home, office, etc ...
    note: { type: String, trim: true },
    isDefault: { type: Boolean, default: false },

    street: { type: String, trim: true, required: [true, 'Please fill a street'] },
    ward: { type: String, trim: true, required: [true, 'Please fill a ward'] },
    district: { type: String, trim: true, required: [true, 'Please fill a district'] },
    province: { type: String, trim: true, required: [true, 'Please fill a city'] }
  },
  { _id: true, id: false, versionKey: false },
);

export default addressSchema;
