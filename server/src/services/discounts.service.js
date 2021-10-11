import mongoose from 'mongoose';
import Discount from '../models/discount.model.js';
import strUtils from '../utils/str-utils.js';
import imagesService from "./images.service.js";

export default {
  getAll,
  getOne,
  create,
  update,
  hidden,
  remove
};

const POPULATE_OPTS = [
  {
    path: 'image',
    select: 'dirPath ext hasSmall hasMedium hasLarge',
    model: 'Image'
  }
];

/**
 *
 * @returns all discounts
 */
async function getAll() {
  return await Discount.find({parent: null})
    .populate(POPULATE_OPTS)
    .sort({createdAt: -1})
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

  const discount = await Discount.findOne(filter);
  return discount;
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

  const newDiscount = await discount.save();
  return newDiscount;
}

/**
 * Update discount
 * @param {*} identity, updatedData
 * @param updatedData
 * @returns update
 */

async function update(identity, updatedData) {
  const currentDiscount = await getOne(identity);

  // delete old image
  if (currentDiscount.image && currentDiscount.image?._id !== updatedData?.image) {
    await imagesService.remove(currentDiscount.image._id);
  }

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
    const updatedDiscount = await Discount.findByIdAndUpdate(
      discount._id,
      { isHide: !discount.isHide },
      { new: true }
    );
    return updatedDiscount;
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
