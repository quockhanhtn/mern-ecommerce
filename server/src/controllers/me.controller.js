import resUtils from '../utils/res-utils.js';
import userService from '../services/user.service.js';
import addressService from '../services/addresses.services.js';

export const getInfo = async (req, res, next) => {
  try {
    const user = await userService.getOneById(req.user._id);
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

// Add address --------------------------------------------
export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await addressService.getList(req.user._id);
    resUtils.status200(res, `Get list addresses successfully!`, addresses);
  } catch (err) { next(err); }
};

export const addAddress = async (req, res, next) => {
  try {
    const address = await addressService.add(req.user._id, req.body);
    resUtils.status201(res, `Add address successfully!`, address);
  } catch (err) { next(err); }
};

export const updateAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const address = await addressService.update(req.user._id, addressId, req.body);
    resUtils.status200(res, `Update address successfully!`, address);
  } catch (err) { next(err); }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const isDeleted = await addressService.remove(req.user._id, addressId);
    if (isDeleted) {
      resUtils.status200(res, `Delete address successfully!`);
    } else {
      resUtils.status404(res, `Error when delete address!`);
    }
  } catch (err) { next(err); }
}
