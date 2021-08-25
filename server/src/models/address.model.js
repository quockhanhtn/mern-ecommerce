import mongoose from 'mongoose';
import slugGenerator from 'mongoose-slug-updater';
import removeMultiSpace from '../utils/mongoose-remove-multi-space.js';

const autoPopulateChildren = function (next) {
  this.populate('children');
  next();
};

const addressSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    laneNumber: { type: String, trim: true, required: true },
    slug: { type: String, slug: "laneNumber", slugPaddingSize: 2, unique: true },

    stressName: { type: String, trim: true, required: true },
    wardName: { type: String, trim: true, required: true },
    districtName: { type: String, trim: true, required: true },
    provinceName: { type: String, trim: true, required: true },

    isHide: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, versionKey: false }
);

addressSchema.plugin(slugGenerator);
addressSchema.plugin(removeMultiSpace);
addressSchema
  .pre('findOne', autoPopulateChildren)
  .pre('find', autoPopulateChildren);

const addressModel = mongoose.model('Address', addressSchema);
export default addressModel;