import ResponseUtils from '../utils/ResponseUtils.js';
import discountService from '../services/discounts.service.js';
import FormatUtils from '../utils/FormatUtils.js';

const formatDiscount = (discount, req) => {
  return FormatUtils.imageUrl(discount, 'image', req);
}

export const getDiscounts = async (req, res, next) => {
  try {
    const fields = req.query.fields || '';

    let discounts = await discountService.getAll({
      fields,
      sortBy: req.query.sortBy || 'createdAt',
      sortType: ((req.query.sort || 'desc') === 'asc') ? 1 : -1,
      isShowAllDate: req.query?.isShowAllDate === '1',
      isShowHidden: req.query?.isShowHidden === '1',
    });
    discounts = discounts.map(discount => formatDiscount(discount, req));
    if (discounts && discounts.length > 0) {
      ResponseUtils.status200(res, 'Gets all discounts successfully', discounts);
    } else {
      ResponseUtils.status200(res, 'No discounts found', []);
    }
  } catch (err) { next(err); }
}

export const getDiscount = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const discount = await discountService.getOne(identity);
    if (discount) {
      ResponseUtils.status200(res, `Get discount '${discount.name}' successfully!`, formatDiscount(discount, req));
    } else {
      ResponseUtils.status404(res, `Discount '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}

export const checkExistedCode = async (req, res, next) => {
  try {
    const { code } = req.params;
    const found = await discountService.getAll({ fields: '_id', filters: { code: code }, isShowHidden: true, isShowAllDate: true });
    ResponseUtils.status200(res, '', (found && found.length > 0) ? '1' : '0');
  } catch (err) { next(err); }
};

export const estDiscountAmt = async (req, res, next) => {
  try {
    const code = (req.query?.code ?? '').trim();
    const orderSubtotal = Number.parseInt(req.query?.orderSubtotal ?? '0', 10);
    const result = await discountService.calculateDiscountAmt(code, orderSubtotal);
    ResponseUtils.status200(res, 'Est success', result);
  } catch (err) { next(err); }
};

export const createDiscount = async (req, res, next) => {
  try {
    const newDiscount = await discountService.create(req.body);
    ResponseUtils.status201(
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
      ResponseUtils.status200(
        res,
        `Update discount '${updateDiscount.name}' successfully!`,
        formatDiscount(updateDiscount, req)
      );
    } else {
      ResponseUtils.status404(res, `Discount '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}

export const hiddenDiscount = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const result = await discountService.hidden(identity);
    if (result) {
      ResponseUtils.status200(
        res,
        `${result.isHide ? 'Show' : 'Hide'} discount '${result.name}' successfully!`,
        formatDiscount(result, req)
      );
    } else {
      ResponseUtils.status404(res, `Discount '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}

export const deleteDiscount = async (req, res, next) => {
  try {
    const { identity } = req.params;
    let result = await discountService.remove(identity);
    if (result) {
      ResponseUtils.status200(res, `Deleted discount '${result.name}' successfully!`, result);
    } else {
      ResponseUtils.status404(res, `Discount '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}
