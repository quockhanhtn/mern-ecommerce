import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import removeMultiSpace from './plugins/remove-multi-space.js';
import constants from '../constants.js';
import { hashPassword } from '../utils/cipher-utils.js';

const addressSchema = new mongoose.Schema(
  {
    street: { type: String, required: true },
    ward: { type: String, required: true },
    district: { type: String, required: true },
    province: { type: String, required: true },
  },
  { id: false, _id: false, versionKey: false },
);


const userSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },

    gender: {
      type: String, trim: true,
      enum: Object.values(constants.USER.GENDER),
      default: constants.USER.GENDER.OTHER
    },
    birthDay: { type: Date, trim: true, required: false },
    email: {
      type: String,
      match: [/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/, 'Please fill a valid email address'],
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { email: { $type: 'string' } }
      }
    },
    phone: {
      type: String,
      match: [/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, 'Please fill a valid phone number'],
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { phone: { $type: 'string' } },
      }
    },

    /*
     * Username regex validation explain
     * Reference https://stackoverflow.com/a/12019115
     * ^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
     * └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
     *       │         │         │            │           no _ or . at the end
     *       │         │         │            │
     *       │         │         │            allowed characters
     *       │         │         │
     *       │         │         no __ or _. or ._ or .. inside
     *       │         │
     *       │         no _ or . at the beginning
     *       │
     *       username is 5-20 characters long
    */
    username: {
      type: String,
      match: [/^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Please fill a valid username'],
      trim: true,
      required: false,
      default: ''
    },
    password: { type: String, trim: true, required: true },

    role: {
      type: String,
      enum: Object.values(constants.USER.ROLE),
      default: constants.USER.ROLE.CUSTOMER,
      required: true
    },

    addresses: { type: addressSchema, required: false },
    status: {
      type: String,
      enum: Object.values(constants.USER.STATUS),
      default: constants.USER.STATUS.INACTIVE,
      required: true
    },

    avatar: { type: String, trim: true, required: false },
  },
  { timestamps: true, versionKey: false, }
);
// userSchema.index({ "email": 1 }, { unique: true });

// reference https://mongoosejs.com/docs/tutorials/virtuals.html#virtuals-with-lean
userSchema.virtual('fullName').
  get(function () { return `${this.firstName} ${this.lastName}`; }).
  set(function (v) {
    // `v` is the value being set, so use the value to set
    // `firstName` and `lastName`.
    const firstName = v.substring(0, v.indexOf(' '));
    const lastName = v.substring(v.indexOf(' ') + 1);
    this.set({ firstName, lastName });
  });

userSchema.plugin(mongooseLeanVirtuals);
userSchema.plugin(removeMultiSpace);

userSchema.pre('save', function (next) {
  if (!this?.email?.trim() && !this?.phone?.trim()) {
    return next(new Error('Email or phone is required'));
  }

  if (!this.isModified('password')) {
    return next();
  }

  // hash password
  this.password = hashPassword(this.password);
  next();
});

const userModel = mongoose.model('User', userSchema);
export { addressSchema }; // for re-use in other model
export default userModel;
