import mongoose from 'mongoose';
import removeMultiSpace from './plugins/remove-multi-space.js';

const imageSchema = mongoose.Schema(
  {
    _id: mongoose.Types.ObjectId,
    dirPath: { type: String, trim: true, required: true },
    ext: { type: String, trim: true, required: true },
    original: { type: String, trim: true, required: true },
    hasSmall: { type: Boolean, default: false },
    hasMedium: { type: Boolean, default: false },
    hasLarge: { type: Boolean, default: false },
  },
  { versionKey: false }
);

imageSchema.plugin(removeMultiSpace);

const imageModel = mongoose.model('Image', imageSchema);
export default imageModel;