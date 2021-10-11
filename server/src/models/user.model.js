import mongoose from 'mongoose';
import slugGenerator from 'mongoose-slug-updater';
import removeMultiSpace from '../utils/mongoose-remove-multi-space.js';

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    fullName: { type: String, trim: true, required: false, default: '' },

    gender: {
      type: String, trim: true,
      enum: ['MALE', 'FEMALE', 'OTHER'],
      default: 'OTHER'
    },
    birthDay: { type: Date, trim: true, required: false },
    email: {
      type: String,
      match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, 'Please fill a valid email address'],
      trim: true,
      required: true,
      index: {
        unique: true,
        partialFilterExpression: { email: { $type: 'string' } }
      }
    },
    phone: {
      type: String,
      match: [/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Please fill a valid phone number'],
      trim: true,
      required: true,
      index: {
        unique: true,
        partialFilterExpression: { phone: { $type: 'string' } }
      }
    },
    username: { type: String, trim: true, required: false, default: '' },
    password: { type: String, trim: true, required: true },
    address: { type: Array, trim: true, required: false, default: [] },
    status: { type: Boolean, trim: true, required: false, default: false },

    image: { type: String, trim: true, required: false },
    imageCdn: { type: String, trim: true, required: false },

    isHide: { type: Boolean, required: true, default: false },

  },
  { timestamps: true, versionKey: false, },

);

userSchema.plugin(slugGenerator);
userSchema.plugin(removeMultiSpace);

const userModel = mongoose.model('User', userSchema);
export default userModel;