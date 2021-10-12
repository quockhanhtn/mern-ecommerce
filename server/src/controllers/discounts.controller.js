import resUtils from '../utils/res-utils.js';
import imagesService from "../services/images.service.js";
import discountService from "../services/discounts.service.js";

const formatDiscount = (discount, req) => {
  if (discount.image) {
    discount.image = imagesService.formatPath(discount.image, req.headers.origin);
  }
  return discount;
}

export const getDiscounts = async (req, res, next) => {
  try {
    let discounts = await discountService.getAll();
    discounts = discounts.map(discount => formatDiscount(discount, req));
    if (discounts && discounts.length > 0) {
      resUtils.status200(res, 'Gets all discounts successfully', discounts);
    } else {
      resUtils.status404(res, 'No discounts found');
    }
  } catch (err) { next(err); }
}

export const getDiscount = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const discount = await discountService.getOne(identity);
    if (discount) {
      resUtils.status200(res, `Get discount '${discount.name}' successfully!`, formatDiscount(discount, req));
    } else {
      resUtils.status404(res, `Discount '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}

export const createDiscount = async (req, res, next) => {
  try {
    const newDiscount = await discountService.create(req.body);
    resUtils.status201(
      res,
      `Create NEW discount '${newDiscount.name}' successfully!`,
      formatDiscount(newDiscount, req)
    );
  } catch (err) { next(err); }
}

export const updateDiscount = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const updateDiscount = await discountService.update(identity, req.body);
    if (updateDiscount) {
      resUtils.status200(
        res,
        `Update discount '${updateDiscount.name}' successfully!`,
        formatDiscount(updateDiscount, req)
      );
    } else {
      resUtils.status404(res, `Discount '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}

export const hiddenDiscount = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const result = await discountService.hidden(identity);
    if (result) {
      resUtils.status200(
        res,
        `${result.isHide ? 'Show' : 'Hide'} discount '${result.name}' successfully!`,
        formatDiscount(result, req)
      );
    } else {
      resUtils.status404(res, `Discount '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}

export const deleteDiscount = async (req, res, next) => {
  try {
    const { identity } = req.params;
    let result = await discountService.remove(identity);
    if (result) {
      resUtils.status200(res, `Deleted discount '${result.name}' successfully!`, result);
    } else {
      resUtils.status404(res, `Discount '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}
