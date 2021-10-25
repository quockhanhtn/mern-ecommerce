import mongoose from 'mongoose';
import Discount from '../models/discount.model.js';
import strUtils from '../utils/str-utils.js';

export default {
  getAll,
  getOne,
  create,
  update,
  hidden,
  remove
};

/**
 *
 * @returns all discounts
 */
async function getAll() {
  return await Discount.find()
    .sort({ createdAt: -1 })
    .lean().exec();
}

/**
 * Get discount
 * @param {*} identity
 * @returns
 */
async function getOne(identity) {
  const filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  return Discount.findOne(filter).lean().exec();
}

/**
 * Create discount
 * @param {*} data
 * @returns
 */

async function create(data) {
  const discount = new Discount({
    _id: new mongoose.Types.ObjectId(),
    ...data
  });
  return await discount.save();
}

/**
 * Update discount
 * @param {*} identity, updatedData
 * @param updatedData
 * @returns update
 */

async function update(identity, updatedData) {
  const currentDiscount = await getOne(identity);

  const updatedDiscount = await Discount.findByIdAndUpdate(currentDiscount._id, updatedData, { new: true });
  if (updatedDiscount) {
    return updatedDiscount;
  } else {
    throw new Error(`Discount '${identity}' not found!`);
  }
}

/**
 * Toggle discount isHide
 * @param {*} identity slug or id
 * @returns discount if found and toggle isHide else null
 */
async function hidden(identity) {
  const discount = await getOne(identity);
  if (discount) {
    return Discount.findByIdAndUpdate(
      discount._id,
      { isHide: !discount.isHide },
      { new: true }
    );
  }
  return null;
}

/**
 * Delete discount
 * @param {*} identity  discount id or slug
 * @returns true if delete successfully else false
 */
async function remove(identity) {
  let filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  const deletedDiscount = await Discount.findOneAndDelete(filter);
  return !!deletedDiscount;
}
