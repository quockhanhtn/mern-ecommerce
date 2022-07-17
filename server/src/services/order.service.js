import mongoose from 'mongoose';
import Order from '../models/order.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import Discount from '../models/discount.model.js';
import constants from '../constants.js';
import ApiErrorUtils from '../utils/ApiErrorUtils.js';
import discountService from './discounts.service.js';

export default {
  getOne,
  getAlls,
  getListByUser,
  tryCreate,
  create,
  update,
}

const SELECTED_FIELDS = '_id numericId customer user address isReceiveAtStore status paymentMethod paymentStatus items subTotal shippingFee discount total createdAt updatedAt';

const POPULATE_OPT = [
  {
    path: 'user',
    select: '_id name',
  }
];

function formatResult(record) {
  if (!Boolean(record)) { return null; }

  if (Array.isArray(record)) {
    return record.map(item => formatResult(item));
  }

  if (!Boolean(record.customer)) {
    record.customer = {
      name: record?.address?.name,
      phone: record?.address?.phone,
    };
  }

  return record;
  // let itemsToShow = record.items.map(item => {
  //   return {
  //     product: item.product._id,
  //     productName: item.product.name,
  //     sku: item.sku,
  //     quantity: item.quantity,
  //     pricePerUnit: item.pricePerUnit,
  //     variant: item.product.variants.find(variant => variant.sku === item.sku)
  //   };
  // });

  // return {
  //   ...record,
  //   items: itemsToShow,
  // };
}

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
    await session.startTransaction();

    const orderToSave = new Order({
      _id: new mongoose.Types.ObjectId(),
      ...orderData,
      items: [],
      createdBy,
    });

    for (let i = 0; i < orderData.items.length; i++) {
      const cartItem = orderData.items[i];

      const product = await Product.findOne(
        { _id: cartItem.productId, 'variants.sku': cartItem.sku }
      ).lean().exec();

      if (!product || product?.variants?.length === 0) {
        throw new ApiErrorUtils({
          message: 'Product does not exist',
          errors: { productId: cartItem.productId, sku: cartItem.sku },
          status: 404
        });
      }

      const selectedVariant = product.variants.find(variant => variant.sku === cartItem.sku);
      if (!selectedVariant) {
        throw new ApiErrorUtils({
          message: 'Product does not exist',
          errors: { productId: cartItem.productId, sku: cartItem.sku },
          status: 404
        });
      }

      if (selectedVariant.sold + cartItem.qty > selectedVariant.quantity) {
        throw new ApiErrorUtils({
          message: 'Product out of stock',
          errors: { productId: product._id, sku: product.variants[0].sku },
          status: 404
        });
      }

      // update sold
      await Product.findOneAndUpdate(
        { _id: cartItem.productId, 'variants.sku': cartItem.sku },
        { $inc: { 'variants.$.sold': cartItem.qty } },
        { session }
      );

      orderToSave.items.push({
        productId: product._id.toString(),
        sku: product.variants[0].sku,
        productName: product.name,
        variantName: selectedVariant.variantName,
        thumbnail: selectedVariant.thumbnail,
        marketPrice: selectedVariant.marketPrice,
        pricePerUnit: selectedVariant.price,
        quantity: cartItem.qty,
      });
    }

    // calculate total
    const subTotal = orderToSave.items.reduce((acc, cur) => {
      return acc + cur.quantity * cur.pricePerUnit;
    }, 0);

    let discount = 0;
    if (orderData.discountCode) {
      try {
        const { amount, info: discountInfo } = await discountService.calculateDiscountAmt(orderData.discountCode, subTotal);
        discount = amount;
        if (!(discountInfo?.unlimitedQty || false)) {
          await Discount.findByIdAndUpdate(
            discountInfo._id,
            { $inc: { 'quantity': -1 } },
            { session }
          );
        }
      } catch { }
    }

    if (!discount || discount === undefined || isNaN(discount)) { discount = 0; }

    let shippingFee;
    if (subTotal > 500000 || orderData?.isReceiveAtStore) {
      shippingFee = 0;
    } else if (orderData?.address?.province?.toUpperCase().includes('HỒ CHÍ MINH')) {
      shippingFee = 20000;
    } else {
      shippingFee = 30000;
    }

    orderToSave.subTotal = subTotal;
    orderToSave.shippingFee = shippingFee;
    orderToSave.discount = discount;
    orderToSave.total = subTotal + shippingFee - discount;

    orderToSave.status = constants.ORDER.STATUS.PENDING;
    orderToSave.paymentStatus = constants.ORDER.PAYMENT_STATUS.PENDING;

    if (orderToSave.isReceiveAtStore) {
      orderToSave.address = null;
    }

    const order = await orderToSave.save({ session });

    await session.commitTransaction();
    await session.endSession();

    return order;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();

    if (err instanceof ApiErrorUtils) {
      throw err;
    } else {
      throw new ApiErrorUtils({
        message: 'Create order failed: ' + err.message,
        errors: err,
        status: 500
      });
    }
  }
}

async function getList(userId, search, status, paymentStatus, selectedFields = null) {
  if (!selectedFields) { selectedFields = SELECTED_FIELDS; }

  const filter = {};
  if (userId) { filter.user = userId; }
  if (search) {
    if (mongoose.Types.ObjectId.isValid(search)) {
      filter._id = mongoose.Types.ObjectId(search);
    } else if (!search.startsWith('0') && Number.parseInt(search)) {
      filter.numericId = Number.parseInt(search);
    } else {
      filter.$or = [
        { 'customer.name': { $regex: search, $options: 'i' } },
        { 'customer.phone': { $regex: search, $options: 'i' } }
      ];
    }
  }
  if (status && status !== 'all') { filter.status = status; }
  if (paymentStatus && paymentStatus !== 'all') { filter.paymentStatus = paymentStatus; }

  let lists = await Order.find(filter)
    .select(selectedFields)
    .populate(POPULATE_OPT)
    .sort({ createdAt: -1 })
    .lean().exec();

  return formatResult(lists);
}

async function getOne(orderId, selectedFields = null) {
  let filter = {};
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    filter = { numericId: Number.parseInt(orderId) || 0 };
  } else {
    filter = { _id: orderId };
  }

  if (!selectedFields) { selectedFields = SELECTED_FIELDS; }

  let result = await Order.findOne(filter)
    .select(selectedFields)
    .populate(POPULATE_OPT)
    .lean().exec();

  return formatResult(result);
}

async function getAlls(search, status, paymentStatus, selectedFields = null) {
  return getList(null, search, status, paymentStatus, selectedFields);
}

async function getListByUser(userId, search, status, paymentStatus, selectedFields = null) {
  return getList(userId, search, status, paymentStatus, selectedFields);
}

/**
 * Another function to create order, try to create order again if failed cause transaction
 */
async function tryCreate(customerInfo, orderData, createdBy) {
  let countError = 0;
  while (countError < 3) {
    try {
      const order = await create(customerInfo, orderData, createdBy);
      return order;
    } catch (err) {
      const errMsg = (err?.message || '').toLowerCase();
      if (errMsg.startsWith('transaction') && errMsg.endsWith('has been committed.')) {
        countError++;
      } else {
        throw err;
      }
    }
  }
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
      throw new ApiErrorUtils('User does not exist', 400);
    }
    orderData.user = user._id;
  }
  else {
    orderData.customer = {
      name: orderData.address.name,
      phone: orderData.address.phone,
    };
  }

  if (orderData.isReceiveAtStore) {
    orderData.customer = {
      name: orderData.address.name,
      phone: orderData.address.phone,
    };
  }

  if (!orderData.items || orderData.items.length === 0) {
    throw ApiErrorUtils.simple('Invalid order items', 400);
  }

  if (!Object.values(constants.ORDER.PAYMENT_METHOD).includes(orderData.paymentMethod)) {
    throw ApiErrorUtils.simple('Invalid payment method', 400);
  }

  // if (orderData.isReceiveAtStore) {
  //   orderData.isReceiveAtStore = true;
  // } else if (orderData.address) {
  //   orderData.address = data.address;
  // } else {
  //   throw ApiErrorUtils.simple('Invalid address', 400);
  // }

  const order = await createWithTransaction(orderData, createdBy);
  return order;
}

async function update(userId, orderId, data) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiErrorUtils('Invalid user id', 400);
  }
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApiErrorUtils('Invalid order id', 400);
  }

  const currentData = await getOne(orderId);
  if (!currentData) {
    throw new ApiErrorUtils('Order does not exist', 400);
  }

  if (currentData.status === constants.ORDER.CANCELED) {
    throw new ApiErrorUtils('Order has been canceled', 400);
  }

  if (currentData.status === constants.ORDER.COMPLETED) {
    throw new ApiErrorUtils('Order has been completed', 400);
  }

  if (data.status === constants.ORDER.STATUS.CANCELED) {
    if (currentData.status !== constants.ORDER.STATUS.PENDING) {
      throw ApiErrorUtils.simple('Order is not pending', 400);
    }
  }

  data.updatedBy = userId;

  const order = await Order.findOneAndUpdate({ _id: orderId }, data, { new: true }).lean().exec();
  return order;
}