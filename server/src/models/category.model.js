import mongoose from 'mongoose';
import slugGenerator from 'mongoose-slug-updater';
import removeMultiSpace from '../utils/mongoose-remove-multi-space.js';

const autoPopulateChildren = function (next) {
  this.populate('children');
  next();
};

const categorySchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    name: { type: String, trim: true, required: true },
    slug: { type: String, slug: "name", slugPaddingSize: 2, unique: true },
    desc: { type: String, trim: true, required: false },

    image: { type: String, trim: true, required: false },

    parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
    children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }],
    isHide: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, versionKey: false }
);

categorySchema.plugin(slugGenerator);
categorySchema.plugin(removeMultiSpace);
categorySchema
  .pre('findOne', autoPopulateChildren)
  .pre('find', autoPopulateChildren);

const categoryModel = mongoose.model('Category', categorySchema);
export default categoryModel;