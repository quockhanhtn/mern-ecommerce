import ResponseUtils from '../utils/ResponseUtils.js';
import orderService from '../services/order.service.js';
import vnpayService from '../services/vnpay.service.js';
import firebaseService from '../services/firebase.service.js';
import userBehaviorService from '../services/user-behavior.service.js';
import constants from '../constants.js';

// Order manager by user
export const getOne = async (req, res, next) => {
  try {
    const { orderId } = req.params;

    const order = await orderService.getOne(orderId);
    if (order) {
      ResponseUtils.status200(
        res,
        'Get order info success',
        JSON.parse(JSON.stringify(order))
      );
    } else {
      ResponseUtils.status404(
        res,
        'Order not found'
      );
    }
  } catch (err) { next(err); }
};

export const getList = async (req, res, next) => {
  /**
   * If user is authenticated, get list of orders by userId
   * If user is guest, get list of orders by firebase access token (using phone number)
   */
  try {
    const search = req.query.search || '';
    const status = req.query.status || null;
    const paymentStatus = req.query.paymentStatus || null;
    const userId = req?.user?._id || null;

    let result;
    if (userId) {
      result = await orderService.getListByUser(userId, search, status, paymentStatus);
    } else {
      const accessToken = req.query?.accessToken || null;
      if (!accessToken) {
        ResponseUtils.status401(
          res,
          'Access token is required'
        );
        return;
      }

      const decodeData = await firebaseService.verifyToken(accessToken);
      if (!decodeData) {
        ResponseUtils.status401(
          res,
          'Access token is invalid'
        );
        return;
      }

      if (decodeData.exp < Date.now() / 1000) {
        ResponseUtils.status401(
          res,
          'Access token is expired'
        );
        return;
      }

      const phoneNumber = decodeData.phone_number.replace('+84', '0');
      result = await orderService.getAlls(phoneNumber, status, paymentStatus);
    }

    ResponseUtils.status200(
      res,
      'Get order list success',
      result
    );
  } catch (err) { next(err); }
};

export const getByUser = async (req, res, next) => {
  try {
    const status = req.query.status;
    const userId = req.user._id;
    ResponseUtils.status200(
      res,
      'Get list order success',
      orders
    );
  } catch (err) { next(err); }
};

export const createByUser = async (req, res, next) => {
  try {
    const userId = req?.user?._id || null;

    const clientUrl = req.body?.clientUrl || req.headers.origin;

    const order = await orderService.create(
      userId,
      req.body
    );

    if (order) {
      userBehaviorService.handleUpdateBoughtCount(
        userId ?? req.userIdentifier,
        JSON.parse(JSON.stringify(order)).items
      );

      let paymentUrl = '';
      if (req.body.paymentMethod === constants.ORDER.PAYMENT_METHOD.VNPAY) {
        const apiUrl = `${req.protocol}://${req.get('host')}`
        paymentUrl = await vnpayService.createPaymentUrl(
          req.ipv4,
          apiUrl,
          clientUrl,
          order._id.toString(),
          order.total
        );
      }

      ResponseUtils.status201(
        res,
        'Create order success',
        order,
        { paymentUrl }
      );
    } else {
      ResponseUtils.status400(
        res,
        'Create order fail'
      );
    }
  } catch (err) { next(err); }
};

export const rePayOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await orderService.getOne(orderId);
    if (!order) {
      ResponseUtils.status400(
        res,
        'Order not found'
      );
    } else if (order.paymentStatus === constants.ORDER.PAYMENT_STATUS.PAID) {
      ResponseUtils.status400(
        res,
        'Order has been paid'
      );
    } else if (order.paymentMethod === constants.ORDER.PAYMENT_METHOD.VNPAY) {
      const apiUrl = `${req.protocol}://${req.get('host')}`
      const paymentUrl = await vnpayService.createPaymentUrl(
        req.ipv4,
        apiUrl,
        req.headers.origin,
        order._id.toString(),
        order.total
      );
      ResponseUtils.status200(
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
      ResponseUtils.status200(
        res,
        'Update order success',
        order
      );
    } else {
      ResponseUtils.status400(
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
    ResponseUtils.status200(
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
      ResponseUtils.status201(
        res,
        'Create order success',
        order
      );
    } else {
      ResponseUtils.status400(
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
      ResponseUtils.status200(
        res,
        'Update order success',
        result
      );
    } else {
      ResponseUtils.status400(
        res,
        'Update order fail'
      );
    }
  } catch (err) { next(err); }
};
