import mongoose from 'mongoose';
import constants from '../constants.js';
import removeMultiSpace from '../utils/mongoose-remove-multi-space.js';
import { hashPassword } from '../utils/cipher-utils.js';

const userSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    firstName: { type: String, trim: true, required: true },
    lastName: { type: String, trim: true, required: true },
    fullName: { type: String, trim: true, required: false, default: '' },

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
     * ^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
     * └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
     *       │         │         │            │           no _ or . at the end
     *       │         │         │            │
     *       │         │         │            allowed characters
     *       │         │         │
     *       │         │         no __ or _. or ._ or .. inside
     *       │         │
     *       │         no _ or . at the beginning
     *       │
     *       username is 8-20 characters long
    */
    username: {
      type: String,
      match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, 'Please fill a valid username'],
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

    address: { type: Array, trim: true, required: false, default: [] },
    status: { type: Boolean, trim: true, required: false, default: false },

    image: { type: String, trim: true, required: false },
  },
  { timestamps: true, versionKey: false, },

);
// userSchema.index({ "email": 1 }, { unique: true });

userSchema.plugin(removeMultiSpace);

userSchema.pre('save', function (next) {
  if (!this?.email?.trim() && !this?.phone?.trim()) {
    return next(new Error('Email or phone is required'));
  }

  this.fullName = `${this.firstName} ${this.lastName}`;

  if (!this.isModified('password')) { return next(); }

  // hash password
  this.password = hashPassword(this.password);
  next();
});

const userModel = mongoose.model('User', userSchema);
export default userModel;
