import ResponseUtils from '../utils/ResponseUtils.js';
import imagesService from '../services/images.service.js';
import userService from '../services/user.service.js';
import FormatUtils from '../utils/FormatUtils.js';

const formatOneUser = (user, req) => {
  user = FormatUtils.imageUrl(user, 'avatar', req);
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

export const createUser = (role) => async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body);
    ResponseUtils.status201(
      res,
      `Create NEW user '${newUser.fullName}' successfully!`,
      formatOneUser(newUser, req)
    );
  } catch (err) { next(err); }
}

export const getUsers = (role) => async (req, res, next) => {
  try {
    let users = await userService.getListByRole(role);
    users = users.map(user => formatAllUser(user, req));
    if (users && users.length > 0) {
      ResponseUtils.status200(res, 'Gets all users successfully', users);
    } else {
      ResponseUtils.status404(res, 'No users found');
    }
  } catch (err) { next(err); }
}

export const getInfo = async (req, res, next) => {
  try {
    const user = await userService.getOneById(req.user._id, '-addresses -password');
    if (user) {
      ResponseUtils.status200(res, `Get info successfully!`, formatOneUser(user, req));
    } else {
      ResponseUtils.status404(res, `User not found!`);
    }
  } catch (err) { next(err); }
}

export const updateInfo = async (req, res, next) => {
  try {
    const updateUser = await userService.updateBasicInfo(req.user._id, req.body);
    if (updateUser) {
      ResponseUtils.status200(
        res,
        `Update info successfully!`,
        formatOneUser(updateUser, req)
      );
    } else {
      ResponseUtils.status404(res, `User '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}

// Add address
export const addressUserAdd = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const address = await userService.addressAdd(identity, req.body);
    ResponseUtils.status201(
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
    ResponseUtils.status201(
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
    ResponseUtils.status200(res, `Deleted address successfully!`);
  } catch (err) { next(err); }
}
