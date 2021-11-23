import resUtils from '../utils/res-utils.js';
import userService from '../services/user.service.js';
import { formatImageUrl } from '../utils/format-utils.js';

export const getInfo = async (req, res, next) => {
  try {
    const user = await userService.getOneById(req.user._id, '-addresses -password');
    if (user) {
      resUtils.status200(res, `Get info successfully!`, user);
    } else {
      resUtils.status404(res, `User not found!`);
    }
  } catch (err) { next(err); }
}

export const updateInfo = async (req, res, next) => {
  try {
    const updateUser = await userService.update(req.user._id, req.body);
    if (updateUser) {
      resUtils.status200(
        res,
        `Update info successfully!`,
        formatOneUser(updateUser, req)
      );
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
