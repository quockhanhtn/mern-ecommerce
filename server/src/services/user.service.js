import mongoose from 'mongoose';
import constants from '../constants.js';
import User from '../models/user.model.js';
import StringUtils from '../utils/StringUtils.js';

export default {
  getAll,
  getListByRole,
  getOne,
  getOneById,
  getOrCreateByGoogleId,
  create,
  update,
  updateById,
  remove
};

const SELECTED_FIELDS =
  '_id firstName lastName gender dob email phone username avatar role status emptyPassword createdAt updatedAt';

/**
 *
 * @returns all users
 */
async function getAll() {
  return User.find()
    .sort({ createdAt: -1 })
    .lean({ virtuals: true }).exec();
}

/**
 * Get users by role
 * @returns all users
 */
async function getListByRole(role) {
  return User.find({ role })
    .sort({ createdAt: -1 })
    .lean({ virtuals: true }).exec();
}

/**
 * Get user
 * @param {*} identity - username, email or phoneNumber
 * @param {boolean} includeAddresses - include address or not, default is false
 * @returns
 */
async function getOne(identity, selectFields = null, needVirtuals = true) {
  const filter = {};

  if (StringUtils.isUUID(identity)) {
    filter._id = identity;
  }
  else if (StringUtils.isEmailAddress(identity)) {
    filter.email = identity;
  } else if (StringUtils.isPhoneNumber(identity)) {
    filter.phone = identity;
  } else {
    filter.username = identity;
  }

  return User.findOne(filter)
    .select(selectFields)
    .lean({ virtuals: needVirtuals })
    .exec();
}

async function getOneById(id, selectFields = null, needVirtuals = true) {
  if (!selectFields) {
    selectFields = SELECTED_FIELDS;
  }

  return User.findById(id)
    .select(selectFields)
    .lean({ virtuals: needVirtuals })
    .exec();
}

async function getOrCreateByGoogleId(
  googleId,
  email,
  firstName,
  lastName,
  avatar,
  selectFields = null,
  needVirtuals = true
) {
  const user = selectFields ?
    await User.findOne({ googleId }).select(selectFields).lean({ virtuals: needVirtuals }).exec() :
    await User.findOne({ googleId }).lean({ virtuals: needVirtuals }).exec();

  if (user) {
    return user;
  }

  const newUser = new User({
    _id: new mongoose.Types.ObjectId(),
    googleId,
    email,
    firstName,
    lastName,
    avatar,
    role: constants.USER.ROLE.CUSTOMER,
    emptyPassword: true,
    status: constants.USER.STATUS.ACTIVE
  });
  await newUser.save();
  return getOneById(newUser._id, selectFields, needVirtuals);
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
  return user.save();
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
    // username: updatedData.email,
    firstName: updatedData.firstName,
    lastName: updatedData.lastName,
    gender: updatedData.gender,
    dob: updatedData.dob,
    phone: updatedData.phone,
    email: updatedData.email,
    fullName: `${updatedData.firstName} ${updatedData.lastName}`,
  });

  const updatedUser = await User.findByIdAndUpdate(
    currentUser._id,
    updatedDataNew,
    { new: true, fields: SELECTED_FIELDS }
  );
  if (updatedUser) {
    return updatedUser;
  } else {
    throw new Error(`User '${identity}' not found!`);
  }
}

async function updateById(id, updated, selectFields = null) {
  if (!selectFields) { selectFields = SELECTED_FIELDS; }

  return User.findByIdAndUpdate(
    id,
    updated,
    { new: true, select: selectFields }
  );
}

/**
 * Delete user
 * @param {*} identity  user id or slug
 * @returns true if delete successfully else false
 */
async function remove(identity) {
  let filter = StringUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  const deletedUser = await User.findOneAndDelete(filter);
  return !!deletedUser;
}
