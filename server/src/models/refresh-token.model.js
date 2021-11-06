import mongoose from 'mongoose';
import mongooseLeanVirtuals from 'mongoose-lean-virtuals';
import removeMultiSpace from './plugins/remove-multi-space.js';

const refreshTokenSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    token: { type: String, trim: true },
    expires: { type: Date },
    createdAt: { type: Date, default: Date.now },
    createdByIp: { type: String, trim: true },
    revokedAt: { type: Date },
    revokedByIp: { type: String, trim: true },
    replacedByToken: { type: String, trim: true }
  },
  { timestamps: false, versionKey: false, }
);

refreshTokenSchema.virtual('isExpired').get(function () {
  return Date.now() >= this.expires;
});

refreshTokenSchema.virtual('isActive').get(function () {
  return !this.revokedAt && !this.isExpired;
});

refreshTokenSchema.plugin(mongooseLeanVirtuals);
refreshTokenSchema.plugin(removeMultiSpace);

const refreshTokenModel = mongoose.model('RefreshToken', refreshTokenSchema);
export default refreshTokenModel;
