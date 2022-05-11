import mongoose from 'mongoose';
import removeMultiSpace from './plugins/remove-multi-space.js';

const userBehaviorSchema = mongoose.Schema(
  {
    productId: { type: String, trim: true, required: true },     // productId
    userIdentifier: { type: String, trim: true },                  // userId or cookie generated id
    behavior: { type: Object, required: true }
  },
  { id: false, timestamps: false, versionKey: false, }
);
userBehaviorSchema.index({ productId: 1, userIdentifier: 1 }, { unique: true });
userBehaviorSchema.plugin(removeMultiSpace);

const userBehaviorModel = mongoose.model('UserBehavior', userBehaviorSchema);
export default userBehaviorModel;
