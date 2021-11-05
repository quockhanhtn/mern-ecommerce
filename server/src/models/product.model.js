import mongoose from 'mongoose';
import slugGenerator from 'mongoose-slug-updater';
import removeMultiSpace from './plugins/remove-multi-space.js';

const productVariantSchema = new mongoose.Schema({
  sku: { type: String, trim: true, required: true },

  variantName: { type: String, trim: true },
  slug: { type: String, slug: "variantName", unique: false },

  price: { type: Number, required: true },              // promotional price (market price - discount)
  marketPrice: { type: Number, required: true },        // market price
  quantity: { type: Number, min: 0, required: true },   // quantity of product in stock
  sold: { type: Number, min: 0, default: 0 },           // quantity sold

  // additional specs
  addSpecifications: [{
    name: { type: String, trim: true, required: true },
    key: { type: String, slug: "name", required: true },
    value: { type: String, trim: true, required: true }
  }],

  thumbnail: { type: String, trim: true, required: false },
  pictures: [{ type: String, trim: true }]
}, { timestamps: true, versionKey: false, id: false, _id: false });

const productSchema = mongoose.Schema({
  _id: mongoose.Types.ObjectId,

  name: { type: String, trim: true, required: true },
  slug: { type: String, slug: "name", slugPaddingSize: 2, unique: true },

  desc: { type: String, trim: true, required: false },
  video: { type: String, trim: true, required: false },

  // product specification (ex: color, size, weight, ...)
  // sample: [{
  //   name: 'Bộ nhớ',
  //   key:'bo-nho',
  //   value: '32GB'
  // }]
  specifications: [{
    name: { type: String, trim: true, required: true },
    key: { type: String, slug: "name", required: false },
    value: { type: String, trim: true, required: true }
  }],
  tags: [{ type: String, trim: true }],

  releaseTime: {
    type: Date,
    default: () => new Date(new Date() - 30 * 24 * 60 * 60 * 1000)      // now - 30 day
  },
  warrantyPeriod: { type: Number, min: 0, default: 12 },                // in months
  origin: { type: String, trim: true, required: false },                // country of manufacture

  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  brand: { type: mongoose.Schema.Types.ObjectId, ref: 'Brand', default: null },

  views: { type: Number, default: 0, min: 0 },                          // views of product
  rates: [                                                              // rate of product
    {
      _id: false,
      ip: { type: String, trim: true, required: true },
      star: { type: String, default: 0, min: 1, max: 5 }
    }
  ],

  variants: [productVariantSchema],
  defaultVariant: { type: String }, // default variant of product

  isHide: { type: Boolean, default: false },
  isOutOfStock: { type: Boolean, default: false },

  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true, versionKey: false });


productVariantSchema.plugin(slugGenerator);
productVariantSchema.plugin(removeMultiSpace);
productSchema.plugin(slugGenerator);
productSchema.plugin(removeMultiSpace);

const productModel = mongoose.model('Product', productSchema);
export default productModel;
