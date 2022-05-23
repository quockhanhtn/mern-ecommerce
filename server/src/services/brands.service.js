import mongoose from 'mongoose';
import Brand from '../models/brand.model.js';
import responseDef from '../responseCode.js';
import ApiErrorUtils from '../utils/ApiErrorUtils.js';
import StringUtils from '../utils/StringUtils.js';
import productsService from './products.service.js';

export default {
  getAll,
  getOne,
  getId,
  create,
  update,
  incCountProduct,
  decCountProduct,
  hidden,
  remove
};

const SELECTED_FIELDS = '_id order slug name desc headQuarters country image countProduct isHide createdAt updatedAt';

async function getAll(fields = SELECTED_FIELDS, filter = {}) {
  if (fields.indexOf(',') > -1) {
    fields = fields.split(',').join(' ');
  }

  return Brand.find(filter)
    .select(fields)
    .sort({ countProduct: -1 })
    .lean().exec();
}

/**
 * Get brand
 * @param {*} identity
 * @returns
 */
async function getOne(identity, needLean = true) {
  const filter = StringUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };

  if (needLean) {
    return Brand.findOne(filter).lean().exec();
  } else {
    return Brand.findOne(filter).exec();
  }
}

/**
 * Get id and check exist
 * @param {*} identity 
 * @returns _id of document if found, otherwise null
 */
async function getId(identity) {
  const filter = StringUtils.isUUID(identity) ? { _id: identity } : { slug: identity };
  const result = await Brand.findOne(filter).select('_id').lean().exec();
  return result ? result._id : null;
}

/**
 * Create brand
 * @param {*} data
 * @returns
 */

async function create(data, createdBy = null) {
  const order = await Brand.generateOrder();
  const brand = new Brand({
    _id: new mongoose.Types.ObjectId(),
    order,
    ...data
  });

  if (createdBy) {
    brand.createdBy = createdBy;
    brand.updatedBy = createdBy;
  }

  return brand.save();
}

/**
 * Update brand
 * @param {*} identity, updatedData
 * @param updatedData
 * @returns
 */

async function update(identity, updatedData, updatedBy = null) {
  if (updatedBy) { updatedData.updatedBy = updatedBy; }
  const currentBrand = await getOne(identity);

  const updatedBrand = await Brand.findByIdAndUpdate(currentBrand._id, updatedData, { new: true });
  if (updatedBrand) {
    return updatedBrand;
  } else {
    throw new Error(`Brand '${identity}' not found!`);
  }
}

async function incCountProduct(identity) {
  const filter = StringUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  await Brand.findOneAndUpdate(filter, { $inc: { countProduct: 1 } }, { new: false, timestamps: null });
}

async function decCountProduct(identity) {
  const filter = StringUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  await Brand.findOneAndUpdate(filter, { $inc: { countProduct: -1 } }, { new: false, timestamps: null });
}

/**
 * Toggle brand isHide
 * @param {*} identity slug or id
 * @returns brand if found and toggle isHide else null
 */
async function hidden(identity) {
  const brand = await getOne(identity);
  if (brand) {
    return Brand.findByIdAndUpdate(
      brand._id,
      { isHide: !brand.isHide },
      { new: true }
    );
  }
  return null;
}

/**
 * Delete brand
 * @param {*} identity  brand id or slug
 * @returns true if delete successfully else false
 */
async function remove(identity) {
  const brand = await getOne(identity);
  if (!brand) {
    throw ApiErrorUtils.simple2(responseDef.BRAND.BRAND_NOT_FOUND);
  }

  const countProduct = await productsService.countProduct({ brand: brand._id });
  if (countProduct > 0) {
    throw ApiErrorUtils.simple2(responseDef.BRAND.BRAND_HAS_PRODUCT);
  }

  return Brand.findByIdAndDelete(brand._id);
}
