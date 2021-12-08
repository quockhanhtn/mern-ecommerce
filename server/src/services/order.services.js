import mongoose from 'mongoose';
import Order from '../models/order.model.js';
import ApiError from '../utils/APIError.js';

export default {
  getListByUserId,
  createByUserId,
  updateByUserId,
}

const SELECTED_FIELDS = '_id user address status items totalPrice totalShipping totalTax totalDiscount total createdAt updatedAt';


async function getListByUserId(userId, status, selectedFields = null) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError('Invalid user id', 400);
  }
  if (!selectedFields) { selectedFields = SELECTED_FIELDS; }

  const filter = { user: userId };
  if (status || status !== 'all') {
    filter.status = status;
  }

  const lists = await Order.find(filter).lean().exec();
  return lists;
}

async function createByUserId(userId, data) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError('Invalid user id', 400);
  }
  const order = new Order({
    user: userId,
    ...data,
  });
  await order.save();
  return order;
}

async function updateByUserId(userId, orderId, data) {
  if (!mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError('Invalid user id', 400);
  }
  if (!mongoose.Types.ObjectId.isValid(orderId)) {
    throw new ApiError('Invalid order id', 400);
  }
  const order = await Order.findOneAndUpdate({ _id: orderId, user: userId }, data, { new: true }).lean().exec();
  return order;
}