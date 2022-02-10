import mongoose from 'mongoose';
import slugGenerator from 'mongoose-slug-updater';
import removeMultiSpace from './plugins/remove-multi-space.js';
import constants from '../constants.js';

const autoPopulateReplies = function (next) {
  this.populate('replies');
  next();
};

const commentSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },

    // pass author value if logged in otherwise user info (name, email, phone, etc)
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false, default: null },
    anonymousAuthor: {
      name: { type: String, trim: true },
      email: { type: String, match: constants.REGEX.EMAIL, trim: true },
      phone: { type: String, match: constants.REGEX.PHONE, trim: true }
    },
    content: { type: String, trim: true, required: true },
    star: { type: String, default: 0, min: 1, max: 5 },
    replies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    likes: { type: Number, default: 0 },
    disLikes: { type: Number, default: 0 },

    isVerified: { type: Boolean, default: false }
  },
  { timestamps: true, versionKey: false }
);

commentSchema.plugin(slugGenerator);
commentSchema.plugin(removeMultiSpace);
commentSchema
  .pre('findOne', autoPopulateReplies)
  .pre('find', autoPopulateReplies);

const commentModel = mongoose.model('Comment', commentSchema);
export default commentModel;