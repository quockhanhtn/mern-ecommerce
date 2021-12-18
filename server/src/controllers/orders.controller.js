import resUtils from '../utils/res-utils.js';
import orderService from '../services/order.services.js';
import vnpayService from '../services/vnpay.service.js';
import constants from '../constants.js';

// Order manager by user
export const getOne = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const order = await orderService.getOne(orderId);
    if (order) {
      resUtils.status200(
        res,
        'Get order info success',
        order
      );
    } else {
      resUtils.status404(
        res,
        'Order not found'
      );
    }
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
    const userId = req?.user?._id || null;

    const order = await orderService.create(
      userId,
      req.body
    );

    let paymentUrl = '';
    if (req.body.paymentMethod === constants.ORDER.PAYMENT_METHOD.VNPAY) {
      const apiUrl = `${req.protocol}://${req.get('host')}`
      paymentUrl = await vnpayService.createPaymentUrl(
        req.ip,
        apiUrl,
        req.headers.origin,
        order._id.toString(),
        order.total
      );
    }

    if (order) {
      resUtils.status201(
        res,
        'Create order success',
        order,
        { paymentUrl }
      );
    } else {
      resUtils.status400(
        res,
        'Create order fail'
      );
    }
  } catch (err) { next(err); }
};

export const rePayOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.getOne(orderId, '_id paymentMethod paymentStatus total');
    if (!order) {
      resUtils.status400(
        res,
        'Order not found'
      );
    } else if (order.paymentStatus === constants.ORDER.PAYMENT_STATUS.PAID) {
      resUtils.status400(
        res,
        'Order has been paid'
      );
    } else if (order.paymentMethod === constants.ORDER.PAYMENT_METHOD.VNPAY) {
      const apiUrl = `${req.protocol}://${req.get('host')}`
      const paymentUrl = await vnpayService.createPaymentUrl(
        req.ip,
        apiUrl,
        req.headers.origin,
        order._id.toString(),
        order.total
      );
      resUtils.status200(
        res,
        'Create payment url success',
        paymentUrl
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
    const search = req.query.search || '';
    const status = req.query.status || null;
    const paymentStatus = req.query.paymentStatus || null;

    const orders = await orderService.getAlls(search, status, paymentStatus);
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
    const userId = req.user._id;

    let updateData = {};
    if (req.body.status) {
      updateData.status = req.body.status;
    }
    if (req.body.paymentStatus) {
      updateData.paymentStatus = req.body.paymentStatus;
    }
    if (req.body.paymentMethod) {
      updateData.paymentMethod = req.body.paymentMethod;
    }

    const order = await orderService.update(userId, orderId, updateData);

    if (order) {
      const result = await orderService.getOne(order._id);
      resUtils.status200(
        res,
        'Update order success',
        result
      );
    } else {
      resUtils.status400(
        res,
        'Update order fail'
      );
    }
  } catch (err) { next(err); }
};
