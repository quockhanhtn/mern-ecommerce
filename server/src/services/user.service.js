import mongoose from 'mongoose';
import User from '../models/user.model.js';
import strUtils from '../utils/str-utils.js';

export default {
  getAll,
  getListByRole,
  getOne,
  getOneById,
  create,
  update,
  remove
};

/**
 *
 * @returns all users
 */
async function getAll() {
  return await User.find()
    .sort({ createdAt: -1 })
    .lean({ virtuals: true }).exec();
}

/**
 * Get users by role
 * @returns all users
 */
async function getListByRole(role) {
  return await User.find({ role })
    .sort({ createdAt: -1 })
    .lean({ virtuals: true }).exec();
}

/**
 * Get user
 * @param {*} identity - username, email or phoneNumber
 * @param {boolean} includeAddresses - include address or not, default is false
 * @returns
 */
async function getOne(identity, includeAddresses = false) {
  const filter = {
    $or: [
      { email: identity },
      { phone: identity },
      { username: identity }
    ]
  }
  return includeAddresses ?
    await User.findOne(filter).lean({ virtuals: true }).exec() :
    await User.findOne(filter).select('-addresses').lean({ virtuals: true }).exec();
}

async function getOneById(id, selectFields = null, needVirtuals = true) {
  return selectFields ?
    await User.findById(id).select(selectFields).lean({ virtuals: needVirtuals }).exec() :
    await User.findById(id).lean({ virtuals: needVirtuals }).exec();
}

/**
 * Create user
 * @param {*} data
 * @returns
 */

async function create(data) {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    ...data
  });
  return await user.save();
}

/**
 * Update user
 * @param {*} identity, updatedData
 * @param updatedData
 * @returns
 */

async function update(identity, updatedData) {
  const currentUser = await getOne(identity);

  let updatedDataNew = new User({
    ...updatedData,
    username: updatedData.email,
    firstName: updatedData.firstName,
    lastName: updatedData.lastName,
    gender: updatedData.gender,
    birthDay: updatedData.birthDay,
    phone: updatedData.phone,
    fullName: `${updatedData.firstName} ${updatedData.lastName}`,
  });

  const updatedUser = await User.findByIdAndUpdate(currentUser._id, updatedDataNew, { new: true });
  if (updatedUser) {
    return updatedUser;
  } else {
    throw new Error(`User '${identity}' not found!`);
  }
}

/**
 * Delete user
 * @param {*} identity  user id or slug
 * @returns true if delete successfully else false
 */
async function remove(identity) {
  let filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  const deletedUser = await User.findOneAndDelete(filter);
  return !!deletedUser;
}
