import mongoose from 'mongoose';
import resUtils from '../utils/res-utils.js';
import strUtils from '../utils/str-utils.js';
import Address from '../models/address.model.js';

const getFindOneFilter = (identity) => {
  const filter = {};

  if (strUtils.isUUID(identity)) {
    filter._id = identity;
  } else {
    filter.slug = identity;
  }

  return filter;
};


const getAddressFromRequest = (req) => {
  let address = {};

  if (req.body.laneNumber) { address.laneNumber = req.body.laneNumber; }
  if (req.body.stressName) { address.stressName = req.body.stressName; }
  if (req.body.wardName) { address.wardName = req.body.wardName; }
  if (req.body.districtName) { address.districtName = req.body.districtName; }
  if (req.body.provinceName) { address.provinceName = req.body.provinceName; }

  return address;
};


export const getAddressList = async (req, res) => {
  try {
    let addressList = await Address.find().sort({ createdAt: -1 }).lean().exec();
    if (addressList && addressList.length > 0) {
      resUtils.status200(res, null, addressList);
    } else {
      resUtils.status404(res, 'No address list found');
    }
  } catch (err) { resUtils.status500(res, err); }
}


export const getAddress = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);
    const address = await Address.findOne(filter);
    if (address) {
      resUtils.status200(res, `Get address successfully!`, address);
    } else {
      resUtils.status404(res, `Address '${identity}' not found!`);
    }
  } catch (err) { resUtils.status500(res, err); }
}


export const createAddress = async (req, res) => {
  try {
    const address = new Address({
      _id: new mongoose.Types.ObjectId(),
      ...getAddressFromRequest(req)
    });

    await address.save();
    resUtils.status201(
      res,
      `Create NEW address successfully!`,
      address
    );
  } catch (err) { resUtils.status500(res, err); }
}


export const updateAddress = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);
    let updated = getAddressFromRequest(req);

    const updateAddress = await Brand.findOneAndUpdate(filter, updated, { new: true });
    if (updateAddress) {
      resUtils.status200(
        res,
        `Update address successfully!`,
        updateAddress
      );
    } else {
      resUtils.status404(res, `Address '${identity}' not found!`);
    }
  } catch (err) { resUtils.status500(res, err); }
}


export const hiddenAddress = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);

    const address = await Address.findOne(filter);
    const updateAddress = !address ? null
      : await Address.findOneAndUpdate(filter, { isHide: !address.isHide }, { new: true });

    if (updateAddress) {
      resUtils.status200(
        res,
        `${address.isHide ? 'Show' : 'Hide'} address successfully!`
      );
    } else {
      resUtils.status404(res, `Address '${identity}' not found!`);
    }
  }
  catch (err) { resUtils.status500(res, err); }
}


export const deleteAddress = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);

    const deletedAddress = await Address.findOneAndDelete(filter);
    if (deletedAddress) {
      resUtils.status200(res, `Deleted address successfully!`, deleteAddress);
    } else {
      resUtils.status404(res, `Address '${identity}' not found!`);
    }
  }
  catch (err) { resUtils.status500(res, err); }
}
