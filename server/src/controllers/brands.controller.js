import resUtils from '../utils/res-utils.js';
import imagesService from "../services/images.service.js";
import brandService from "../services/brands.service.js";

const formatBrand = (brand, req) => {
  if (brand.image) {
    brand.image = imagesService.formatPath(brand.image, req.headers.origin);
  }
  return brand;
}

export const getBrands = async (req, res, next) => {
  try {
    let brands = await brandService.getAll();
    brands = brands.map(brand => formatBrand(brand, req));
    if (brands && brands.length > 0) {
      resUtils.status200(res, 'Gets all brands successfully', brands);
    } else {
      resUtils.status404(res, 'No brands found');
    }
  } catch (err) { next(err); }
}


export const getBrand = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const brand = await brandService.getOne(identity);
    if (brand) {
      resUtils.status200(res, `Get brand '${brand.name}' successfully!`, formatBrand(brand, req));
    } else {
      resUtils.status404(res, `Brand '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}


export const createBrand = async (req, res, next) => {
  try {
    const newBrand = await brandService.create(req.body);
    resUtils.status201(
        res,
        `Create NEW brand '${newBrand.name}' successfully!`,
        formatBrand(newBrand, req)
    );
  } catch (err) { next(err); }
}


export const updateBrand = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const updateBrand = await brandService.update(identity, req.body);
    if (updateBrand) {
      resUtils.status200(
        res,
        `Update brand '${updateBrand.name}' successfully!`,
        formatBrand(updateBrand, req)
      );
    } else {
      resUtils.status404(res, `Brand '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}


export const hiddenBrand = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const result = await brandService.hidden(identity);
    if (result) {
      resUtils.status200(
        res,
        `${result.isHide ? 'Show' : 'Hide'} brand '${result.name}' successfully!`,
        formatBrand(result, req)
      );
    } else {
      resUtils.status404(res, `Brand '${identity}' not found!`);
    }

  } catch (err) { next(err); }
}


export const deleteBrand = async (req, res, next) => {
  try {
    const { identity } = req.params;
    let result = await brandService.remove(identity);
    if (result) {
      resUtils.status200(res, `Deleted brand '${result.name}' successfully!`, result);
    } else {
      resUtils.status404(res, `Brand '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}
