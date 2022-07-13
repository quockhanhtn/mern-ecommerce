import ResponseUtils from '../utils/ResponseUtils.js';
import userService from '../services/user.service.js';
import addressService from '../services/addresses.service.js';
import authServices from '../services/auth.service.js';

export const getInfo = async (req, res, next) => {
  try {
    const user = await userService.getOneById(req.user._id);
    if (user) {
      ResponseUtils.status200(res, `Get info successfully!`, user);
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
        updateUser
        // formatOneUser(updateUser, req)
      );
    } else {
      ResponseUtils.status404(res, `User '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}

export const updateEmail = async (req, res, next) => {
  try {
    const updateUser = await userService.updateEmail(req.user._id, req.body);
    if (updateUser) {
      ResponseUtils.status200(
        res,
        `Update info successfully!`,
        updateUser
        // formatOneUser(updateUser, req)
      );
    } else {
      ResponseUtils.status404(res, `User '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}


export const updatePhone = async (req, res, next) => {
  try {
    const updateUser = await userService.updatePhone(req.user._id, req.body);
    if (updateUser) {
      ResponseUtils.status200(
        res,
        `Update info successfully!`,
        updateUser
        // formatOneUser(updateUser, req)
      );
    } else {
      ResponseUtils.status404(res, `User '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}


export const changePassword = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const currentPassword = req.body.currentPassword;
    const newPassword = req.body.newPassword;

    const result = await authServices.changePassword(userId, currentPassword, newPassword);
    if (result) {
      ResponseUtils.status200(res, `Change password successfully!`, result);
    } else {
      ResponseUtils.status404(res, `Change password failed`);
    }
  } catch (err) { next(err); }
};

export const isExistedEmail = async (req, res, next) => {
  try {
    const { email } = req.params;
    const isExisted = await userService.isExistEmail(email);
    ResponseUtils.sendJson(res, 200, '', { isExisted });
  } catch (err) { next(err); }
};

export const isExistedPhone = async (req, res, next) => {
  try {
    const { phone } = req.params;
    const isExisted = await userService.isExistPhone(phone);
    ResponseUtils.sendJson(res, 200, '', { isExisted });
  } catch (err) { next(err); }
};


// Add address --------------------------------------------
export const getAddresses = async (req, res, next) => {
  try {
    const addresses = await addressService.getList(req.user._id);
    ResponseUtils.status200(res, `Get list addresses successfully!`, addresses);
  } catch (err) { next(err); }
};

export const addAddress = async (req, res, next) => {
  try {
    const address = await addressService.add(req.user._id, req.body);
    ResponseUtils.status201(res, `Add address successfully!`, address);
  } catch (err) { next(err); }
};

export const updateAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const address = await addressService.update(req.user._id, addressId, req.body);
    ResponseUtils.status200(res, `Update address successfully!`, address);
  } catch (err) { next(err); }
};

export const setDefaultAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const address = await addressService.setDefault(req.user._id, addressId);
    ResponseUtils.status200(res, `Set address default successfully!`, address);
  } catch (err) { next(err); }
};

export const deleteAddress = async (req, res, next) => {
  try {
    const { addressId } = req.params;
    const isDeleted = await addressService.remove(req.user._id, addressId);
    if (isDeleted) {
      ResponseUtils.status200(res, `Delete address successfully!`);
    } else {
      ResponseUtils.status404(res, `Error when delete address!`);
    }
  } catch (err) { next(err); }
}
