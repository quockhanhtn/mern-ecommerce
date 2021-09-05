import mongoose from 'mongoose';
import resUtils from '../utils/res-utils.js';
import strUtils from '../utils/str-utils.js';
import Brand from '../models/brand.model.js';

const getFindOneFilter = (identity) => {
  const filter = {};

  if (strUtils.isUUID(identity)) {
    filter._id = identity;
  } else {
    filter.slug = identity;
  }

  return filter;
};


const getBrandFromRequest = (req) => {
  let brand = {};

  if (req.body.name) { brand.name = req.body.name; }
  if (req.body.desc) { brand.desc = req.body.desc; }
  if (req.body.headQuaters) { brand.headQuaters = req.body.headQuaters; }
  if (req.body.imageCdn) { brand.imageCdn = req.body.imageCdn; }

  if (req?.file?.path) {
    brand.image = '/' + strUtils.replaceAll(req.file.path, '\\', '/');
  }
  return brand;
};


const formatBrand = (brand, req) => {
  if (brand.image && brand.image.startsWith('/')) {
    brand.image = `${req.protocol}://${req.get('host')}${brand.image}`;
  }
  return brand;
}


export const getBrands = async (req, res) => {
  try {
    let brands = await Brand.find().sort({ createdAt: -1 }).lean().exec();
    if (brands && brands.length > 0) {
      resUtils.status200(res, null, brands.map(brand => formatBrand(brand, req)));
    } else {
      resUtils.status404(res, 'No brands found');
    }
  } catch (err) { resUtils.status500(res, err); }
}


export const getBrand = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);
    const brand = await Brand.findOne(filter);
    if (brand) {
      resUtils.status200(res, `Get brand '${brand.name}' successfully!`, formatBrand(brand, req));
    } else {
      resUtils.status404(res, `Brand '${identity}' not found!`);
    }
  } catch (err) { resUtils.status500(res, err); }
}


export const createBrand = async (req, res) => {
  try {
    const brand = new Brand({
      _id: new mongoose.Types.ObjectId(),
      ...getBrandFromRequest(req)
    });

    const newBrand = await brand.save();
    resUtils.status201(
      res,
      `Create NEW brand '${newBrand.name}' successfully!`,
      formatBrand(newBrand, req)
    );
  } catch (err) { resUtils.status500(res, err); }
}


export const updateBrand = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);
    let updated = getBrandFromRequest(req);

    const updateBrand = await Brand.findOneAndUpdate(filter, updated, { new: true });
    if (updateBrand) {
      resUtils.status200(
        res,
        `Update brand '${updateBrand.name}' successfully!`,
        formatBrand(updateBrand, req)
      );
    } else {
      resUtils.status404(res, `Brand '${identity}' not found!`);
    }
  } catch (err) { resUtils.status500(res, err); }
}


export const hiddenBrand = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);

    const brand = await Brand.findOne(filter);
    const updatedBrand = !brand ? null
      : await Brand.findOneAndUpdate(filter, { isHide: !brand.isHide }, { new: true });

    if (updatedBrand) {
      resUtils.status200(
        res,
        `${brand.isHide ? 'Show' : 'Hide'} brand '${updatedBrand.name}' successfully!`,
        formatBrand(updatedBrand, req)
      );
    } else {
      resUtils.status404(res, `Brand '${identity}' not found!`);
    }
  }
  catch (err) { resUtils.status500(res, err); }
}


export const deleteBrand = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);

    const deletedBrand = await Brand.findOneAndDelete(filter);
    if (deletedBrand) {
      resUtils.status200(res, `Deleted brand '${deletedBrand.name}' successfully!`, deletedBrand);
    } else {
      resUtils.status404(res, `Brand '${identity}' not found!`);
    }
  }
  catch (err) { resUtils.status500(res, err); }
}
