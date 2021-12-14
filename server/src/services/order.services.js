import mongoose from 'mongoose';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import constants from '../constants.js';
import ApiError from '../utils/APIError.js';

export default {
  getOne,
  getAlls,
  getListByUser,
  create,
  update,
}

const SELECTED_FIELDS = '_id user address status items totalPrice totalShipping totalTax totalDiscount total createdAt updatedAt';

/**
 * Create new order with transaction
 * TODO: must run a mongodb replica set if connection to mongodb at localhost
 * @param {*} orderData 
 * @param {*} createdBy
 * @returns 
 */
async function createWithTransaction(orderData, createdBy) {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const orderToSave = new Order({
      _id: new mongoose.Types.ObjectId(),
      ...orderData,
      items: [],
      createdBy,
    });

    for (let i = 0; i < orderData.items.length; i++) {
      const cartItem = orderData.items[i];

      const product = await Product.findOne(
        { _id: cartItem.product, 'variants.sku': cartItem.sku }
      ).lean().exec();
      if (!product || product?.variants?.length === 0) {
        throw new ApiError({
          message: 'Product does not exist',
          errors: { productId: product._id, sku: product.variants[0].sku },
          status: 404
        });
      }

      if (product?.variants?.[0].sold + cartItem.quantity > product?.variants?.[0].quantity) {
        throw new ApiError({
          message: 'Product out of stock',
          errors: { productId: product._id, sku: product.variants[0].sku },
          status: 404
        });
      }

      // update sold
      await Product.findOneAndUpdate(
        { _id: cartItem.product, 'variants.sku': cartItem.sku },
        { $inc: { 'variants.$.sold': cartItem.quantity } },
        { session }
      );

      orderToSave.items.push({
        product: product._id,
        sku: product.variants[0].sku,
        quantity: cartItem.quantity,
        pricePerUnit: product?.variants?.[0].price
      });
    }

    // calculate total
    const subTotal = orderToSave.items.reduce((acc, cur) => {
      return acc + cur.quantity * cur.pricePerUnit;
    }, 0);

    // TODO: calculate shipping fee + check discount if have
    const shippingFee = 0;
    const discount = 0;

    orderToSave.subTotal = subTotal;
    orderToSave.shippingFee = shippingFee;
    orderToSave.discount = discount;
    orderToSave.total = subTotal + shippingFee - discount;

    orderToSave.status = constants.ORDER.STATUS.PENDING;
    orderToSave.paymentStatus = constants.ORDER.PAYMENT_STATUS.PENDING;

    const order = await orderToSave.save({ session });

    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw new ApiError({
      message: 'Create order failed: ' + err.message,
      errors: err,
      status: 500
    });
  }
}

async function getList(userId, status, selectedFields = null) {
  if (!selectedFields) { selectedFields = SELECTED_FIELDS; }

  const filter = {};
  if (userId) { filter.user = userId; }
  if (status || status !== 'all') { filter.status = status; }

  const lists = await Order.find(filter).lean().exec();
  return lists;
}

async function getOne(orderId, selectedFields = null) {
  if (!selectedFields) { selectedFields = SELECTED_FIELDS; }
  const order = await Order.findById(orderId).select(selectedFields).lean().exec();
  return order;
}

async function getAlls(status, selectedFields = null) {
  return await getList(null, status, selectedFields);
}

async function getListByUser(userId, status, selectedFields = null) {
  return await getList(userId, status, selectedFields);
}

/**
 * Create new order
 * @param {string | object} customerInfo - userId or { name, phone }
 * @param {*} orderData - 
 * @param {*} createdBy
 * @returns 
 */
async function create(customerInfo, orderData, createdBy) {
  if (mongoose.Types.ObjectId.isValid(customerInfo)) {
    const user = await User.findOne({ _id: customerInfo }, { _id: 1 }).lean().exec();
    if (!user) {
      throw new ApiError('User does not exist', 400);
    }
    orderData.user = user._id;
  }
  else {
    orderData.customer = {
      name: orderData.address.name,
      phone: orderData.address.phone,
    };
  }

  if (!orderData.items || orderData.items.length === 0) {
    throw ApiError.simple('Invalid order items', 400);
  };

  if (!Object.values(constants.ORDER.PAYMENT_METHOD).includes(orderData.paymentMethod)) {
    throw ApiError.simple('Invalid payment method', 400);
  }

  // if (orderData.isReceiveAtStore) {
  //   orderData.isReceiveAtStore = true;
  // } else if (orderData.address) {
  //   orderData.address = data.address;
  // } else {
  //   throw ApiError.simple('Invalid address', 400);
  // }

  const order = await createWithTransaction(orderData, createdBy);
  return order;
}

async function update(userId, orderId, data) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError('Invalid user id', 400);
  }
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApiError('Invalid order id', 400);
  }
  const order = await Order.findOneAndUpdate({ _id: orderId, user: userId }, data, { new: true }).lean().exec();
  return order;
}