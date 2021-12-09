import mongoose from 'mongoose';
import Order from '../models/orders.model.js';
import Product from '../models/product.model.js';
import User from '../models/user.model.js';
import constants from '../constants.js';
import ApiError from '../utils/APIError.js';

export default {
  getAlls,
  getListByUser,
  create,
  update,
}

const SELECTED_FIELDS = '_id user address status items totalPrice totalShipping totalTax totalDiscount total createdAt updatedAt';

async function createWithTransaction(orderData, createdBy) {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    const orderToSave = {
      ...orderData,
      items: [],
      createdBy,
    };

    for (let i = 0; i < orderData.items.length; i++) {
      const element = orderData.items[i];
      const product = await Product.findOne({ _id: element.product, 'variants.sku': element.sku }).lean().exec();
      if (product?.variants?.[0].sold + element.quantity > product?.variants?.[0].quantity) {
        throw new ApiError('Product is out of stock', 400);
      }
      await Product.findOneAndUpdate(
        { _id: element.product, 'variants.sku': element.sku },
        { $inc: { 'variants.$.sold': element.quantity } },
        { session }
      );
      const price = product?.variants?.[0].price;

      orderToSave.items.push({
        product: element.product,
        sku: element.sku,
        quantity: element.quantity,
        pricePerUnit: price
      });
    }

    orderToSave.price = orderData.items.reduce((acc, cur) => {
      return acc + cur.quantity * cur.pricePerUnit;
    }, 0);

    if (orderToSave.paymentMethod === constants.ORDER.PAYMENT_METHOD.TRANSFER) {
      orderToSave.status = constants.ORDER.STATUS.PENDING;
      orderToSave.paymentStatus = constants.ORDER.PAYMENT_STATUS.PENDING;
    }

    orderToSave.status = constants.ORDER.STATUS.PENDING;


    const order = await Order.create(orderToSave, { session });
    await session.commitTransaction();
    session.endSession();

    return order;
  } catch (err) {
    await session.abortTransaction();
    session.endSession();
    throw err;
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

async function getAlls(status, selectedFields = null) {
  return await getList(null, status, selectedFields);
};

async function getListByUser(userId, status, selectedFields = null) {
  return await getList(userId, status, selectedFields);
}

async function create(customerInfo, data, createdBy) {
  const orderData = { ...data };

  if (mongoose.Types.ObjectId.isValid(customerInfo)) {
    const user = await User.findOne({ _id: customerInfo }, { _id: 1 }).lean().exec();
    if (!user) {
      throw new ApiError('Invalid user id', 400);
    }
    orderData.user = user._id;
  } else {
    if (!customerInfo.name) {
      throw new ApiError('Invalid name', 400);
    }
    if (!customerInfo.phone) {
      throw new ApiError('Invalid phone', 400);
    }
    orderData.customer = {
      name: customerInfo.name,
      phone: customerInfo.phone,
    };
  }

  if (orderData.isReceiveAtStore) {
    orderData.isReceiveAtStore = true;
  } else if (orderData.address) {
    orderData.address = data.address;
  } else {
    throw new ApiError('Missing address', 400);
  }

  const order = await createWithTransaction(data, createdBy);
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