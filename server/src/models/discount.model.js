import mongoose from 'mongoose';
import slugGenerator from 'mongoose-slug-updater';
import removeMultiSpace from '../utils/mongoose-remove-multi-space.js';

const autoPopulateChildren = function (next) {
  this.populate('children');
  next();
};

const discountSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    name: { type: String, trim: true, required: true },
    slug: { type: String, slug: "name", slugPaddingSize: 2, unique: true },
    desc: { type: String, trim: true, required: false },

    code: { type: String, trim: true, required: true },
    fromDate: { type: Date, trim: true, required: true },
    endDate: { type: Date, trim: true, required: true },
    quantity: { type: Number, trim: true, required: false, default: 0 },
    discount: { type: Number, trim: true, required: false, default: 0 },

    image: { type: String, trim: true, required: false },
    imageCdn: { type: String, trim: true, required: false },

    isHide: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, versionKey: false }
);

discountSchema.plugin(slugGenerator);
discountSchema.plugin(removeMultiSpace);
discountSchema
  .pre('findOne', autoPopulateChildren)
  .pre('find', autoPopulateChildren);

const discountModel = mongoose.model('Discount', discountSchema);
export default discountModel;