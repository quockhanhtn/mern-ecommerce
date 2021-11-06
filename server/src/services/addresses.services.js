import userServices from './users.services.js';
import User from '../models/user.model.js';
import ApiError from '../utils/APIError.js';

export default {
  getList,
  create,
  update,
  hidden,
  remove
}

/**
 * Get list addresses of user
 * @param {string | any} userId - uuid of user
 */
async function getList(userId) {
  const filter = { _id: userId };
  const projection = { addresses: 1 };
  const result = await User.findOne(filter, projection)
    .lean({ virtuals: true }).exec();

  if (!result) {
    throw ApiError.simple('User not found or id not valid!', 404);
  }

  return result.addresses;
}



/**
 * Add address for user
 * @param {*} identity
 * @param data
 * @returns
 */
async function create(identity, data) {
  // Get current user
  let user = await getOne(identity);

  // Check user null return
  if (!user) {
    throw new Error(`User '${identity}' not found!`);
  }

  // Get list current address
  const currentAddress = user.addresses;

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
  user.addresses = [...currentAddress, addressItemNew];
  console.log(user.address);

  // Save user
  return User.findByIdAndUpdate(user._id, user, { new: true });
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
  return User.findByIdAndUpdate(user._id, user, { new: true });
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
  return User.findByIdAndUpdate(user._id, user, { new: true });
}
