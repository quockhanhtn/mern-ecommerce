import mongoose from 'mongoose';
import User from '../models/user.model.js';
import strUtils from '../utils/str-utils.js';
import imagesService from "./images.service.js";
import argon2 from 'argon2';

export default {
  getAll,
  getOne,
  create,
  update,
  hidden,
  remove,
  addressAdd,
  addressUpdate,
  addressDelete
};

const POPULATE_OPTS = [
  {
    path: 'image',
    select: 'dirPath ext hasSmall hasMedium hasLarge',
    model: 'Image'
  }
];

/**
 *
 * @returns all users
 */
async function getAll() {
  return await User.find({parent: null})
    .populate(POPULATE_OPTS)
    .sort({createdAt: -1})
    .lean().exec();
}

/**
 * Get user
 * @param {*} identity
 * @returns
 */
async function getOne(identity) {
  const filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  return await User.findOne(filter).populate(POPULATE_OPTS).lean().exec();
}

/**
 * Create user
 * @param {*} data
 * @returns
 */

async function create(data) {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    ...data,
    username: data.email,
    fullName: `${data.firstName} ${data.lastName}`,
  });

  // Hash password
  user.password = await argon2.hash(user.password);
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

  // delete old image
  if (currentUser.image && currentUser.image?._id !== updatedData?.image) {
    await imagesService.remove(currentUser.image._id);
  }

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
 * Toggle user isHide
 * @param {*} identity slug or id
 * @returns user if found and toggle isHide else null
 */
async function hidden(identity) {
  const user = await getOne(identity);
  if (user) {
    return User.findByIdAndUpdate(
      user._id,
      {isHide: !user.isHide},
      {new: true}
    );
  }
  return null;
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

/**
 * Add address for user
 * @param {*} identity
 * @param data
 * @returns
 */
async function addressAdd(identity, data) {
  // Get current user
  let user = await getOne(identity);

  // Check user null return
  if (!user) {
    throw new Error(`User '${identity}' not found!`);
  }

  // Get list current address
  const currentAddress = user.address;

  // Create new address
  const addressItemNew = {
    _id: new mongoose.Types.ObjectId(),
    ...data
  };

  //Check address
  if (!addressItemNew?.stressName || !addressItemNew?.wardName || !addressItemNew?.districtName || !addressItemNew?.provinceName) {
    throw new Error(`Address does not exist.`);
  }

  // Add address into list address
  user.address = [...currentAddress, addressItemNew];
  console.log(user.address);

  // Save user
  return User.findByIdAndUpdate(user._id, user, {new: true});
}

/**
 * Update address for user
 * @param {*} identity
 * @param identityAddress
 * @param updatedData
 * @returns
 */
async function addressUpdate(identity, identityAddress, updatedData) {
  // Get current user
  let user = await getOne(identity);

  // Check user null return
  if (!user) {
    throw new Error(`User '${identity}' not found!`);
  }

  // Get list current address
  let currentAddress = user.address;

  // Create new address
  const addressItemUpdated = {
    _id: identityAddress,
    ...updatedData
  };

  //Check address
  if (!addressItemUpdated?.stressName || !addressItemUpdated?.wardName || !addressItemUpdated?.districtName || !addressItemUpdated?.provinceName) {
    throw new Error(`Address does not exist.`);
  }

  // Update
  const foundIndex = currentAddress.findIndex(x => x._id.toString() === identityAddress);
  if (foundIndex < 0) {
    throw new Error(`Address does not exist.`);
  }
  currentAddress[foundIndex] = addressItemUpdated;
  user.address = currentAddress;

  // Save user
  return User.findByIdAndUpdate(user._id, user, {new: true});
}

/**
 * Update address for user
 * @param {*} identity
 * @param identityAddress
 * @returns
 */
async function addressDelete(identity, identityAddress) {
  // Get current user
  let user = await getOne(identity);

  // Check user null return
  if (!user) {
    throw new Error(`User '${identity}' not found!`);
  }

  // Get list current address
  let currentAddress = user.address;


  // Update
  const foundIndex = currentAddress.findIndex(x => x._id.toString() === identityAddress);
  if (foundIndex < 0) {
    throw new Error(`Address does not exist.`);
  }
  currentAddress.splice(foundIndex, 1);
  user.address = currentAddress;

  // Save user
  return User.findByIdAndUpdate(user._id, user, {new: true});
}