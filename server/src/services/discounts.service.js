import mongoose from 'mongoose';
import Discount from '../models/discount.model.js';
import responseDef from '../responseCode.js';
import ApiErrorUtils from '../utils/ApiErrorUtils.js';
import StringUtils from '../utils/StringUtils.js';
import { DISCOUNT_CONS } from '../constants.js';

export default {
  getAll,
  getOne,
  calculateDiscountAmt,
  create,
  update,
  hidden,
  remove
};

const SELECT_FIELD = '_id slug name desc code beginDate endDate quantity discount image isHide createdAt updatedAt';

/**
 *
 * @returns all discounts
 */
async function getAll(options = {}) {
  let {
    fields,
    filters = {},
    sortBy = 'createdAt',
    sortType = -1,
    isShowHidden = false,
    isShowAllDate = false,
  } = options;

  if (StringUtils.isBlankOrEmpty(fields)) {
    fields = SELECT_FIELD;
  }

  if (fields.indexOf(',') > -1) {
    fields = fields.split(',').join(' ');
  }

  if (!isShowHidden) {
    filters.isHide = false;
  }

  const today = new Date().toISOString();

  if (!isShowAllDate) {
    filters.beginDate = { $lte: today };
    filters.endDate = { $gte: today };
  }

  const sortOtp = {};
  sortOtp[sortBy] = sortType;

  return Discount.find(filters)
    .select(fields)
    .sort(sortOtp)
    .lean().exec();
}

/**
 * Get discount
 * @param {*} identity
 * @returns
 */
async function getOne(identity) {
  const filter = StringUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  return Discount.findOne(filter).lean().exec();
}

async function calculateDiscountAmt(code, subTotal) {
  const today = new Date().toISOString();

  const filters = {
    code: code,
    $or: [{ quantity: { $gte: 0 } }, { unlimitedQty: true }],
    beginDate: { $lte: today },
    endDate: { $gte: today }
  };

  const discount = await Discount
    .findOne(filters)
    .select('code unlimitedQty discount discountType minimumTotal maximumApplied')
    .lean().exec();
  if (!discount) {
    throw ApiErrorUtils.simple2(responseDef.DISCOUNT.NOT_FOUND);
  }

  if (discount.minimumTotal > subTotal) {
    throw ApiErrorUtils.simple2(responseDef.DISCOUNT.MINIMUM_TOTAL(discount.minimumTotal));
  }

  let discountAmount = 0;
  if (discount.discountType === DISCOUNT_CONS.TYPE.PERCENT) {
    discountAmount = (subTotal * discount.discount) / 100;
    if (discountAmount > discount.maximumApplied) {
      discountAmount = discount.maximumApplied;
    }
  } else {
    discountAmount = discount.discount;
  }
  return {
    amount: discountAmount,
    info: discount
  };
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

  if (!discount.beginDate) {
    discount.beginDate = new Date(Date.now() - 86400000); // yesterday
  }

  if (!discount.endDate) {
    discount.endDate = new Date(8640000000000000);
  }

  return discount.save();
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
  let filter = StringUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  const deletedDiscount = await Discount.findOneAndDelete(filter);
  return !!deletedDiscount;
}
