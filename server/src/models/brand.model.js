import mongoose from 'mongoose';
import slugGenerator from 'mongoose-slug-updater';
import removeMultiSpace from '../utils/mongoose-remove-multi-space.js';


const brandSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    name: { type: String, trim: true, required: true },
    slug: { type: String, slug: "name", slugPaddingSize: 2, unique: true },
    desc: { type: String, trim: true, required: false },
    headQuaters: { type: String, trim: true, required: false },

    image: { type: String, trim: true, required: false },
    imageCdn: { type: String, trim: true, required: false },

    isHide: { type: Boolean, required: true, default: false }
  },
  { timestamps: true, versionKey: false }
);

brandSchema.plugin(slugGenerator);
brandSchema.plugin(removeMultiSpace);

const brandModel = mongoose.model('Brand', brandSchema);
export default brandModel;