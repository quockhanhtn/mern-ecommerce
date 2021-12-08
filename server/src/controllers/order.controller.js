import resUtils from '../utils/res-utils.js';
import orderService from '../services/order.services.js';

export const getByUser = async (req, res, next) => {
  try {
    const status = req.query.status;
    const userId = req.user._id;
    const orders = await orderService.getListByUserId(userId, status);
    resUtils.status200(
      res,
      'Get list order success',
      orders
    );
  } catch (err) { next(err); }
};

export const createByUser = async (req, res, next) => {
  try {
    const order = await orderService.createByUserId(req.user._id, req.body);
    if (order) {
      resUtils.status201(
        res,
        'Create order success',
        order
      );
    } else {
      resUtils.status400(
        res,
        'Create order fail'
      );
    }
  } catch (err) { next(err); }
};

export const updateByUser = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const order = await orderService.updateByUserId(req.user._id, orderId, req.body);
    if (order) {
      resUtils.status200(
        res,
        'Update order success',
        order
      );
    } else {
      resUtils.status400(
        res,
        'Update order fail'
      );
    }
  } catch (err) { next(err); }
};