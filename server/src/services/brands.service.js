import mongoose from 'mongoose';
import Brand from '../models/brand.model.js';
import strUtils from '../utils/str-utils.js';

export default {
  getAll,
  getOne,
  getId,
  create,
  update,
  hidden,
  remove
};

const SELECTED_FIELDS = '_id order slug name desc headQuarters country image isHide createdAt updatedAt';

/**
 *
 * @returns all brands
 */
async function getAll(fields = SELECTED_FIELDS) {
  if (fields.indexOf(',') > -1) {
    fields = fields.split(',').join(' ');
  }

  return await Brand.find()
    .select(fields)
    .sort({ createdAt: -1 })
    .lean().exec();
}

/**
 * Get brand
 * @param {*} identity
 * @returns
 */
async function getOne(identity) {
  const filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };

  return await Brand.findOne(filter).lean().exec();
}

/**
 * Get id and check exist
 * @param {*} identity 
 * @returns _id of document if found, otherwise null
 */
async function getId(identity) {
  const filter = strUtils.isUUID(identity) ? { _id: identity } : { slug: identity };
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
    category.createdBy = createdBy;
    category.updatedBy = createdBy;
  }

  return await brand.save();
}

/**
 * Update brand
 * @param {*} identity, updatedData
 * @param updatedData
 * @returns
 */

async function update(identity, updatedData, updatedBy = null) {
  if (updatedBy) { updatedData = updatedBy; }
  const currentBrand = await getOne(identity);

  const updatedBrand = await Brand.findByIdAndUpdate(currentBrand._id, updatedData, { new: true });
  if (updatedBrand) {
    return updatedBrand;
  } else {
    throw new Error(`Brand '${identity}' not found!`);
  }
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
  let filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  const deletedBrand = await Brand.findOneAndDelete(filter);
  return !!deletedBrand;
}
