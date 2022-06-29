import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import removeMultiSpace from './plugins/remove-multi-space.js';
import addressSchema from './schemas/address.schema.js';
import constants from '../constants.js';
import CipherUtils from '../utils/CipherUtils.js';

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    firstName: { type: String, trim: true, required: true, minLength: 3, maxLength: 30 },
    lastName: { type: String, trim: true, required: true, minLength: 3, maxLength: 50 },

    gender: {
      type: String, trim: true,
      enum: Object.values(constants.USER.GENDER),
      default: constants.USER.GENDER.OTHER
    },
    dob: { type: Date, trim: true, required: false },
    email: {
      type: String,
      match: [constants.REGEX.EMAIL, 'Please fill a valid email address'],
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { email: { $type: 'string' } }
      }
    },
    phone: {
      type: String,
      match: [constants.REGEX.PHONE, 'Please fill a valid phone number'],
      trim: true,
      index: {
        unique: true,
        partialFilterExpression: { phone: { $type: 'string' } },
      }
    },

    username: {
      type: String,
      match: [
        constants.REGEX.USERNAME,
        'Please fill a valid username: 5-20 characters long; no _ or . at the beginning; no __ or _. or ._ or .. inside; no _ or . at the end'
      ],
      trim: true,
      required: false,
      default: ''
    },
    password: { type: String, trim: true, required: false },
    emptyPassword: { type: Boolean, default: false },

    googleId: { type: String, trim: true, required: false },
    facebookId: { type: String, trim: true, required: false },

    role: {
      type: String,
      enum: Object.values(constants.USER.ROLE),
      default: constants.USER.ROLE.CUSTOMER,
      required: true
    },

    addresses: { type: [addressSchema], required: false },
    status: {
      type: String,
      enum: Object.values(constants.USER.STATUS),
      default: constants.USER.STATUS.INACTIVE,
      required: true
    },

    avatar: { type: String, trim: true, required: false },
  },
  { _id: true, id: false, timestamps: true, versionKey: false, }
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
  this.password = CipherUtils.hashPassword(this.password);
  next();
});

const userModel = mongoose.model('User', userSchema);
export default userModel;
