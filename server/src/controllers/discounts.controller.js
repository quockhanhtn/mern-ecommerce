import mongoose from 'mongoose';
import resUtils from '../utils/res-utils.js';
import strUtils from '../utils/str-utils.js';
import Discount from '../models/discount.model.js';

const getFindOneFilter = (identity) => {
  const filter = {};

  if (strUtils.isUUID(identity)) {
    filter._id = identity;
  } else {
    filter.slug = identity;
  }

  return filter;
};


const getDiscountFromRequest = (req) => {
  let discount = {};

  if (req.body.name) { discount.name = req.body.name; }
  if (req.body.desc) { discount.desc = req.body.desc; }
  if (req.body.code) { discount.code = req.body.code; }
  if (req.body.fromDate) { discount.fromDate = req.body.fromDate; }
  if (req.body.endDate) { discount.endDate = req.body.endDate; }
  if (req.body.quantity) { discount.quantity = req.body.quantity; }
  if (req.body.discount) { discount.discount = req.body.discount; }

  if (req.body.imageCdn) { discount.imageCdn = req.body.imageCdn; }

  if (req?.file?.path) {
    discount.image = '/' + strUtils.replaceAll(req.file.path, '\\', '/');
  }
  return discount;
};


const formatDiscount = (discount, req) => {
  if (discount.image && discount.image.startsWith('/')) {
    discount.image = `${req.protocol}://${req.get('host')}${discount.image}`;
  }
  return discount;
}


export const getDiscounts = async (req, res) => {
  try {
    let discounts = await Discount.find().sort({ createdAt: -1 }).lean().exec();
    if (discounts && discounts.length > 0) {
      resUtils.status200(res, null, discounts.map(discount => formatDiscount(discount, req)));
    } else {
      resUtils.status404(res, 'No discounts found');
    }
  } catch (err) { resUtils.status500(res, err); }
}


export const getDiscount = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);
    const discount = await Discount.findOne(filter);
    if (discount) {
      resUtils.status200(res, `Get discount '${discount.name}' successfully!`, formatDiscount(discount, req));
    } else {
      resUtils.status404(res, `Discount '${identity}' not found!`);
    }
  } catch (err) { resUtils.status500(res, err); }
}


export const createDiscount = async (req, res) => {
  try {
    console.log(req.body)
    const discount = new Discount({
      _id: new mongoose.Types.ObjectId(),
      ...getDiscountFromRequest(req)
    });
    console.log(discount)
    const newDiscount = await discount.save();
    resUtils.status201(
      res,
      `Create NEW discount '${newDiscount.name}' successfully!`,
      formatDiscount(newDiscount, req)
    );
  } catch (err) { resUtils.status500(res, err); }
}


export const updateDiscount = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);
    let updated = getDiscountFromRequest(req);

    const updateDiscount = await Discount.findOneAndUpdate(filter, updated, { new: true });
    if (updateDiscount) {
      resUtils.status200(
        res,
        `Update discount '${updateDiscount.name}' successfully!`,
        formatDiscount(updateDiscount, req)
      );
    } else {
      resUtils.status404(res, `Discount '${identity}' not found!`);
    }
  } catch (err) { resUtils.status500(res, err); }
}


export const hiddenDiscount = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);

    const discount = await Discount.findOne(filter);
    const updatedDiscount = !discount ? null
      : await Discount.findOneAndUpdate(filter, { isHide: !discount.isHide }, { new: true });

    if (updatedDiscount) {
      resUtils.status200(
        res,
        `${discount.isHide ? 'Show' : 'Hide'} discount '${updatedDiscount.name}' successfully!`,
        formatDiscount(updatedDiscount, req)
      );
    } else {
      resUtils.status404(res, `Discount '${identity}' not found!`);
    }
  }
  catch (err) { resUtils.status500(res, err); }
}


export const deleteDiscount = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);

    const deletedDiscount = await Discount.findOneAndDelete(filter);
    if (deletedDiscount) {
      resUtils.status200(res, `Deleted discount '${deletedDiscount.name}' successfully!`, deletedDiscount);
    } else {
      resUtils.status404(res, `Discount '${identity}' not found!`);
    }
  }
  catch (err) { resUtils.status500(res, err); }
}
