import mongoose from 'mongoose';
import resUtils from '../utils/res-utils.js';
import strUtils from '../utils/str-utils.js';
import argon2 from "argon2";
import _ from 'lodash';
import User from '../models/user.model.js';

const getFindOneFilter = (identity) => {
  const filter = {};

  if (strUtils.isUUID(identity)) {
    filter._id = identity;
  }

  return filter;
};


const getUserFromRequest = (req) => {
  let user = {};

  if (req.body.firstName) { user.firstName = req.body.firstName; }
  if (req.body.lastName) { user.lastName = req.body.lastName; }
  if (req.body.gender) { user.gender = req.body.gender; }
  if (req.body.birthDay) { user.birthDay = req.body.birthDay; }
  if (req.body.email) {
    user.email = req.body.email;
    user.username = user.email;
  }
  if (req.body.phone) { user.phone = req.body.phone; }
  if (req.body.password) { user.password = req.body.password; }
  if (req.body.username) { user.username = req.body.username; }
  if (req.body.status) { user.status = req.body.status; }

  // Add full name for user
  user.fullName = `${user.firstName} ${user.lastName}`

  if (req.body.imageCdn) { user.imageCdn = req.body.imageCdn; }
  if (req?.file?.path) {
    user.image = '/' + strUtils.replaceAll(req.file.path, '\\', '/');
  }
  return user;
};


const getUserUpdateFromRequest = (req) => {
  let user = {};

  if (req.body.firstName) { user.firstName = req.body.firstName; }
  if (req.body.lastName) { user.lastName = req.body.lastName; }
  if (req.body.gender) { user.gender = req.body.gender; }
  if (req.body.birthDay) { user.birthDay = req.body.birthDay; }
  if (req.body.phone) { user.phone = req.body.phone; }
  if (req.body.status) { user.status = req.body.status; }

  // Add full name for user
  user.fullName = `${user.firstName} ${user.lastName}`

  if (req.body.imageCdn) { user.imageCdn = req.body.imageCdn; }
  if (req?.file?.path) {
    user.image = '/' + strUtils.replaceAll(req.file.path, '\\', '/');
  }
  return user;
};


const getAddressFromRequest = (req) => {
  let newAddress = {};
  const addressReq = req.body;

  if (addressReq.stressName) { newAddress.stressName = addressReq.stressName; }
  if (addressReq.wardName) { newAddress.wardName = addressReq.wardName; }
  if (addressReq.districtName) { newAddress.districtName = addressReq.districtName; }
  if (addressReq.provinceName) { newAddress.provinceName = addressReq.provinceName; }

  return newAddress;
};


const formatOneUser = (user, req) => {
  if (user.image && user.image.startsWith('/')) {
    user.image = `${req.protocol}://${req.get('host')}${user.image}`;
  }
  const userTemp = new User({ ...user._doc });
  const userRessult = expectPassword(userTemp);
  return userRessult;
}


const formatAllUser = (user, req) => {
  if (user.image && user.image.startsWith('/')) {
    user.image = `${req.protocol}://${req.get('host')}${user.image}`;
  }
  return user;
}

// Expect Password
const expectPassword = (user) => {
  const userOld = new User({ ...user._doc });
  const userResult = _.omit(userOld._doc, ['password']);
  return userResult;
}


// Temp
export const createUser = async (req, res) => {
  try {
    const user = new User({
      _id: new mongoose.Types.ObjectId(),
      ...getUserFromRequest(req)
    });
    // Hash password
    const hashedPassword = await argon2.hash(user.password);
    user.password = hashedPassword;

    // Save
    await user.save();
    resUtils.status201(
      res,
      `Create NEW user '${user.fullName}' successfully!`,
      formatOneUser(user, req)
    );
  } catch (err) { resUtils.status500(res, err); }
}


// Update
export const updateUser = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);
    let updated = getUserUpdateFromRequest(req);

    const updateUser = await User.findOneAndUpdate(filter, updated, { new: true });
    if (updateUser) {
      resUtils.status200(
        res,
        `Update user '${updateUser.fullName}' successfully!`,
        formatOneUser(updateUser, req)
      );
    } else {
      resUtils.status404(res, `User '${identity}' not found!`);
    }
  } catch (err) { resUtils.status500(res, err); }
}


// Get
export const getUsers = async (req, res) => {
  try {
    let users = await User.find().sort({ createdAt: -1 }).lean().exec();
    if (users && users.length > 0) {
      resUtils.status200(res, null, users.map(user => formatAllUser(user, req)));
    } else {
      resUtils.status404(res, 'No users found');
    }
  } catch (err) { resUtils.status500(res, err); }
}


// Get user by id
export const getUser = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);
    const user = await User.findOne(filter);
    if (user) {
      resUtils.status200(res, `Get user '${user.fullName}' successfully!`, formatOneUser(user, req));
    } else {
      resUtils.status404(res, `User '${identity}' not found!`);
    }
  } catch (err) { resUtils.status500(res, err); }
}


// Add address
export const addressUserAdd = async (req, res) => {
  try {
    // Get user
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);
    let user = await User.findOne(filter);

    if (!user) {
      resUtils.status500(res, { message: 'User does not exist.' });
    }

    // Get list address current
    const addressOld = user.address;

    // Create new address
    const address = {
      _id: new mongoose.Types.ObjectId(),
      ...getAddressFromRequest(req)
    };

    //Check address
    if (!address?.stressName || !address?.wardName || !address?.districtName || !address?.provinceName) {
      resUtils.status500(res, { message: 'Address does not exist.' });
    }

    // Add address into list address
    const addressNew = [...addressOld, address];
    user.address = addressNew;
    await user.save();

    resUtils.status201(
      res,
      `Create NEW address for '${user.fullName}' successfully!`,
      address
    );
  } catch (err) { resUtils.status500(res, err); }
}


// Update address
export const addressUserUpdate = async (req, res) => {
  try {
    // Get user
    const { identity, identityAddress } = req.params;
    let filter = getFindOneFilter(identity);
    let user = await User.findOne(filter);

    if (!user) {
      resUtils.status500(res, { message: 'User does not exist.' });
    }

    // Address
    const addressUpdate = {
      _id: identityAddress,
      ...getAddressFromRequest(req)
    };

    //Check address
    if (!addressUpdate?.stressName || !addressUpdate?.wardName || !addressUpdate?.districtName || !addressUpdate?.provinceName) {
      resUtils.status500(res, { message: 'Address does not exist.' });
    }

    // Get list address current
    let address = user.address;

    //Update
    var foundIndex = address.findIndex(x => x._id == identityAddress);
    if (foundIndex < 0) {
      resUtils.status500(res, { message: 'Address does not exist.' });
    }
    address[foundIndex] = addressUpdate;

    user.address = address;
    const updateAddress = await User.findOneAndUpdate(filter, user, { new: true });
    resUtils.status201(
      res,
      `Update address for '${user.fullName}' successfully!`,
      addressUpdate
    );
  } catch (err) { resUtils.status500(res, err); }
}



// Delete address
export const addressUserDelete = async (req, res) => {
  try {
    // Get user
    const { identity, identityAddress } = req.params;
    let filter = getFindOneFilter(identity);
    let user = await User.findOne(filter);

    if (!user) {
      resUtils.status500(res, { message: 'User does not exist.' });
    }
    // Get list address current
    let address = user.address;

    //Update
    let foundIndex = address.findIndex(x => x._id == identityAddress);
    if (foundIndex < 0) {
      resUtils.status500(res, { message: 'Address does not exist.' });
    }
    address.splice(foundIndex, 1);

    user.address = address;
    await User.findOneAndUpdate(filter, user, { new: true });
    resUtils.status200(res, `Deleted address for '${user.fullName}' successfully!`);
  } catch (err) { resUtils.status500(res, err); }
}
