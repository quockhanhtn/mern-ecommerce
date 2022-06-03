import mongoose from 'mongoose';
import User from '../models/user.model.js';
import ApiErrorUtils from '../utils/ApiErrorUtils.js';

export default {
  getList,
  add,
  update,
  setDefault,
  remove
}

async function getUser(userId, includeAddress = false) {
  const projection = { _id: 1, phone: 1, firstName: 1, lastName: 1 };
  if (includeAddress) { projection.addresses = 1; }

  const user = await User.findById(userId, projection).lean().exec();
  if (!user) {
    throw new ApiErrorUtils.simple(`User '${userId}' not found!`, 404);
  }

  return user;
}

function initAddress(data, user) {
  delete data._id;
  
  let address = {};
  if (!data.phone && user.phone) {
    data.phone = user.phone;
  } else if (!data.phone) {
    throw ApiErrorUtils.simple('Phone is required!', 400);
  }

  if (!data.name && (user.firstName || user.lastName)) {
    data.name = `${user.firstName} ${user.lastName}`.trim();
  } else if (!data.name) {
    throw ApiErrorUtils.simple('Name is required!', 400);
  }

  const missingFields = [];
  ['street', 'ward', 'district', 'province'].forEach(field => {
    if (!data?.[field]) {
      missingFields.push(field);
    }
  });
  if (missingFields.length) {
    throw ApiErrorUtils.simple(`${missingFields.join(', ')} is required!`, 400);
  }

  return { ...data, ...address };
};

/**
 * Get list addresses of user
 * @param {string | object} userId - uuid of user
 */
async function getList(userId) {
  const result = await User.findById(userId, { addresses: 1 })
    .lean({ virtuals: true }).exec();

  if (!result) {
    throw ApiErrorUtils.simple('User not found or id not valid!', 404);
  }

  // sort by isDefault
  return result.addresses.sort((a, b) => {
    if (a.isDefault && !b.isDefault) {
      return -1;
    } else if (!a.isDefault && b.isDefault) {
      return 1;
    } else {
      return 0;
    }
  });
}



/**
 * Add address for user
 * @param {*} userId
 * @param data
 * @returns
 */
async function add(userId, data) {
  const user = await getUser(userId);

  const newId = new mongoose.Types.ObjectId();
  const validData = initAddress(data, user);

  // add data to db, mongoose will validate data
  const result = await User.findByIdAndUpdate(
    user._id,
    { $push: { addresses: { _id: newId, ...validData } } },
    { new: true, fields: 'addresses' }
  );

  if (result?.errors?.addresses) {
    throw ApiErrorUtils.simple(result.errors.addresses.message, 400);
  }

  return result?.addresses?.find(address => address._id.equals(newId));
}

/**
 * Update address for user
 * @param {*} userId
 * @param addressId
 * @param updatedData
 * @returns
 */
async function update(userId, addressId, updatedData) {
  const user = await getUser(userId, true);

  const addressList = user.addresses;
  const updateIndex = addressList.findIndex(address => address._id.equals(addressId));
  if (updateIndex === -1) {
    throw ApiErrorUtils.simple('Address not found!', 404);
  }

  const currentAddress = addressList[updateIndex];
  addressList[updateIndex] = { ...currentAddress, ...updatedData };

  const result = await User.findByIdAndUpdate(
    user._id,
    { $set: { addresses: addressList } },
    { new: true, fields: 'addresses' }
  );

  if (result?.errors?.addresses) {
    throw ApiErrorUtils.simple(result.errors.addresses.message, 400);
  }

  return result?.addresses?.find(address => address._id.equals(addressId));
}

async function setDefault(userId, addressId) {
  const user = await getUser(userId, true);

  const addressList = user.addresses;
  const updateIndex = addressList.findIndex(address => address._id.equals(addressId));
  if (updateIndex === -1) {
    throw ApiErrorUtils.simple('Address not found!', 404);
  }

  addressList.forEach(address => address.isDefault = false);
  user.addresses[updateIndex].isDefault = true;

  const result = await User.findByIdAndUpdate(
    user._id,
    { $set: { addresses: user.addresses } },
    { new: true, fields: 'addresses' }
  );
  return result;
}

/**
 * Remove address for user
 * @param {string|object} userId - uuid of user
 * @param {string|object} addressId - uuid of address
 * @returns
 */
async function remove(userId, addressId) {
  const user = await getUser(userId, true);

  const addressList = user.addresses;
  const updateIndex = addressList.findIndex(address => address._id.equals(addressId));
  if (updateIndex === -1) {
    throw ApiErrorUtils.simple('Address not found!', 404);
  }

  addressList.splice(updateIndex, 1);
  const result = await User.findByIdAndUpdate(
    user._id,
    { $set: { addresses: addressList } },
    { new: true, fields: 'addresses' }
  );

  if (result?.errors?.addresses) {
    throw ApiErrorUtils.simple(result.errors.addresses.message, 400);
  }

  if (result?.addresses?.findIndex(a => a._id.equals(addressId)) === -1) {
    return true;
  }

  return false;
}
