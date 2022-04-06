import ResponseUtils from '../utils/ResponseUtils.js';
import brandService from "../services/brands.service.js";
import FormatUtils from '../utils/FormatUtils.js';

const formatBrand = (brand, req) => {
  return FormatUtils.imageUrl(brand, 'image', req);
}

export const getBrands = async (req, res, next) => {
  try {
    const { fields } = req.query;
    let brands = await brandService.getAll(fields);
    brands = brands.map(brand => formatBrand(brand, req));
    if (brands && brands.length > 0) {
      ResponseUtils.status200(res, 'Gets all brands successfully', brands);
    } else {
      ResponseUtils.status200(res, 'No brands found', []);
    }
  } catch (err) { next(err); }
}


export const getBrand = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const brand = await brandService.getOne(identity);
    if (brand) {
      ResponseUtils.status200(res, `Get brand '${brand.name}' successfully!`, formatBrand(brand, req));
    } else {
      ResponseUtils.status404(res, `Brand '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}


export const createBrand = async (req, res, next) => {
  try {
    const newBrand = await brandService.create(
      req.body,
      req.user._id
    );
    ResponseUtils.status201(
      res,
      `Create NEW brand '${newBrand.name}' successfully!`,
      formatBrand(newBrand, req)
    );
  } catch (err) { next(err); }
}


export const updateBrand = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const updateBrand = await brandService.update(
      identity,
      req.body,
      req.user._id
    );
    if (updateBrand) {
      ResponseUtils.status200(
        res,
        `Update brand '${updateBrand.name}' successfully!`,
        formatBrand(updateBrand, req)
      );
    } else {
      ResponseUtils.status404(res, `Brand '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}


export const hiddenBrand = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const result = await brandService.hidden(identity);
    if (result) {
      ResponseUtils.status200(
        res,
        `${result.isHide ? 'Show' : 'Hide'} brand '${result.name}' successfully!`,
        formatBrand(result, req)
      );
    } else {
      ResponseUtils.status404(res, `Brand '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}


export const deleteBrand = async (req, res, next) => {
  try {
    const { identity } = req.params;
    let result = await brandService.remove(identity);
    if (result) {
      ResponseUtils.status200(res, `Deleted brand '${result.name}' successfully!`, result);
    } else {
      ResponseUtils.status404(res, `Brand '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}
