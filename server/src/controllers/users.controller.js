import resUtils from '../utils/res-utils.js';
import imagesService from '../services/images.service.js';
import userService from '../services/user.service.js';
import { formatImageUrl } from '../utils/format-utils.js';

const formatOneUser = (user, req) => {
  user = formatImageUrl(user, 'image', req);
  user = user.toObject();
  if (user.password) { delete user.password; }
  return user;
}

const formatAllUser = (user, req) => {
  if (user.image) {
    user.image = imagesService.formatPath(user.image, req.headers.origin);
  }
  if (user.password) { delete user.password; }
  return user;
}

export const createUser = async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body);
    resUtils.status201(
      res,
      `Create NEW user '${newUser.fullName}' successfully!`,
      formatOneUser(newUser, req)
    );
  } catch (err) { next(err); }
}

export const updateUser = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const updateUser = await userService.update(identity, req.body);
    if (updateUser) {
      resUtils.status200(
        res,
        `Update user '${updateUser.fullName}' successfully!`,
        formatOneUser(updateUser, req)
      );
    } else {
      resUtils.status404(res, `User '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}

export const getUsers = async (req, res, next) => {
  try {
    let users = await userService.getAll();
    users = users.map(user => formatAllUser(user, req));
    if (users && users.length > 0) {
      resUtils.status200(res, 'Gets all users successfully', users);
    } else {
      resUtils.status404(res, 'No users found');
    }
  } catch (err) { next(err); }
}

export const getUser = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const user = await userService.getOne(identity);
    if (user) {
      resUtils.status200(res, `Get user '${user.fullName}' successfully!`, formatOneUser(user, req));
    } else {
      resUtils.status404(res, `User '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}

// Add address
export const addressUserAdd = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const address = await userService.addressAdd(identity, req.body);
    resUtils.status201(
      res,
      `Create NEW address successfully!`,
      address
    );
  } catch (err) { next(err); }
}

// Update address
export const addressUserUpdate = async (req, res, next) => {
  try {
    const { identity, identityAddress } = req.params;
    const updateAddressed = await userService.addressUpdate(identity, identityAddress, req.body);
    resUtils.status201(
      res,
      `Update address successfully!`,
      updateAddressed
    );
  } catch (err) { next(err); }
}

// Delete address
export const addressUserDelete = async (req, res, next) => {
  try {
    const { identity, identityAddress } = req.params;
    await userService.addressDelete(identity, identityAddress);
    resUtils.status200(res, `Deleted address successfully!`);
  } catch (err) { next(err); }
}
