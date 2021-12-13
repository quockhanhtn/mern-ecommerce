import resUtils from '../utils/res-utils.js';
import orderService from '../services/order.services.js';
import vnpayService from '../services/vnpay.service.js';

// Order manager by user
export const getOne = async (req, res) => {
  try {
    const { orderId } = req.params;

    const order = await orderService.getOne(orderId);
    resUtils.status200(
      res,
      'Get order info success',
      order
    );
  } catch (err) { next(err); }
};

export const getByUser = async (req, res, next) => {
  try {
    const status = req.query.status;
    const userId = req.user._id;
    const orders = await orderService.getListByUser(userId, status);
    resUtils.status200(
      res,
      'Get list order success',
      orders
    );
  } catch (err) { next(err); }
};

export const createByUser = async (req, res, next) => {
  try {
    const userId = req?.user?._id;
    let customerInfo = null;
    if (userId) {
      customerInfo = userId
    } else {
      customerInfo = req.body.customerInfo;
    }

    const order = await orderService.create(
      customerInfo,
      req.body,
      userId || null
    );

    if (req.body.paymentMethod === 'vnpay') {
      const apiUrl = `${req.protocol}://${req.get('host')}`
      const vnpayServiceUrl = await vnpayService.createPaymentUrl(
        req.ip,
        apiUrl,
        order._id.toString(),
        order.total
      );
      res.redirect(vnpayServiceUrl);
      return;
    }

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


// Order manager by admin/staff
export const getAllOrders = async (req, res, next) => {
  try {
    const status = req.query.status;
    const orders = await orderService.getAlls(status);
    resUtils.status200(
      res,
      'Get list order success',
      orders
    );
  } catch (err) { next(err); }
};

export const createOrderByAdminOrStaff = async (req, res, next) => {
  try {
    const createById = req.user._id;
    const userId = req.body?.customer?.userId || null;
    let customerInfo = null;
    if (userId) {
      customerInfo = userId
    } else {
      customerInfo = req.body.customer;
    }

    const order = await orderService.create(
      customerInfo,
      { ...req.body, status: 'confirmed' },
      createById
    );

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

export const updateOrderByAdminOrStaff = async (req, res, next) => {
  try {
    const { orderId } = req.params;
  } catch (err) { next(err); }
};
