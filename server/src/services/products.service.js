import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import categoryService from './categories.service.js'
import brandService from './brands.service.js'
import strUtils from '../utils/str-utils.js';

export default {
  getImageUrlService,
  getProductFromRequestService,
  getProductVariantFromRequestService,
  getOne,
  formatPathService,
  findBrandIdService,
  findCategoryIdService,
  addProductVariantsService,
  updateProductVariantsService,
  deleteProductVariantsService,
  getAllService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
  rateProductService,
};

const SELECT_FIELD = '_id name slug desc video specifications category brand tags views rate variants createdAt updatedAt';
const POPULATE_OPTS = [
  {
    path: 'category',
    select: 'name slug image -_id -children',
    model: 'Category'
  },
  {
    path: 'brand',
    select: 'name slug image -_id',
    model: 'Brand'
  }
];

/**
 *  Get Image Url
 * @returns string
 * @param req
 * @param path
 */
async function getImageUrlService(req, path){
  if (path.startsWith('/')) {
    return `${req.protocol}://${req.get('host')}${path}`;
  }
  return path;
}

/**
 *  Find Category by Id
 * @returns Category
 * @param categoryId
 */
async function findCategoryIdService(categoryId) {
  const category = await categoryService.getOne(categoryId);
  return !!category ? category._id : null;
}

/**
 *  Find Brand by Id
 * @returns Brand
 * @param brandId
 */
async function findBrandIdService(brandId) {
  const brand = await brandService.getOne(brandId);
  return !!brand ? brand._id : null;
}

/**
 *  Format Path
 * @returns string
 * @param path
 */
function formatPathService (path) {
  return '/' + strUtils.replaceAll(path, '\\', '/');
}

/**
 *  get Product Variant From Request
 * @returns
 * @param req
 */
function getProductVariantFromRequestService(req) {
  let variant = {};
  
  if (req.body.sku) { variant.sku = req.body.sku; }
  if (req.body.variantName) { variant.variantName = req.body.variantName; }
  
  if (req.body.price) { variant.price = Number.parseInt(req.body.price) }
  if (req.body.marketPrice) { variant.marketPrice = Number.parseInt(req.body.marketPrice) }
  
  if (req.body.quantity) { variant.quantity = Number.parseInt(req.body.quantity); }
  
  if (req.body.addSpecifications) {
    if (typeof req.body.addSpecifications === 'string') {
      variant.addSpecifications = JSON.parse(req.body.addSpecifications);
    } else if (req.body.addSpecifications) {
      variant.addSpecifications = req.body.addSpecifications;
    }
  }
  
  // product thumbnail
  let thumbnail = req?.files?.thumbnail?.[0]?.path;
  if (thumbnail) { variant.thumbnail = formatPathService(thumbnail); }
  
  // product pictures
  if (req?.files?.pictures?.length > 0) {
    variant.pictures = [];
    req?.files?.pictures.forEach(x => variant.pictures.push(formatPathService(x.path)));
  }
  return variant;
}

/**
 *  get Product  FroRequest
 * @returns
 * @param req
 * @param isAddNew
 */
function getProductFromRequestService(req, isAddNew = false) {
  let product = {};
  
  if (req.body.name) { product.name = req.body.name; }
  if (req.body.desc) { product.desc = req.body.desc; }
  if (req.body.video) { product.video = req.body.video; }
  if (req.body.specifications) {
    if (typeof req.body.specifications === 'string') {
      product.specifications = JSON.parse(req.body.specifications);
    } else if (req.body.specifications) {
      product.specifications = req.body.specifications;
    }
  }
  if (req.body.tags) { product.tags = strUtils.splitsAndTrim(req.body.tags, ','); }
  
  if (req.body.releaseTime) { product.releaseTime = new Date(Date.parse(req.body.releaseTime)); }
  if (req.body.warrantyPeriod) { product.warrantyPeriod = Number.parseInt(req.body.warrantyPeriod); }
  if (req.body.origin) { product.origin = Number.parseInt(req.body.origin); }
  
  if (isAddNew) {
    let firstVariant = getProductVariantFromRequestService(req);
    product.variants = [firstVariant];
    product.defaultVariant = firstVariant.sku;
  } else if (req.body.defaultVariant) {
    product.defaultVariant = req.body.defaultVariant;
  }
  
  return product;
}

/**
 * Get product
 * @param {*} identity
 * @returns
 */
async function getOne(identity) {
  const filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };

  return Product.findOne(filter).populate(POPULATE_OPTS).lean().exec();
}

async function addProductVariantsService(req, product) {
  product.variants.push(getProductVariantFromRequestService(req));
  product.markModified('variants');
  return await product.save();
}

async function updateProductVariantsService (req, updatedProduct) {
  const { sku } = req.params;
  let variantUpdate = getProductVariantFromRequestService(req);
  
  let index = updatedProduct.variants.findIndex(x => x.sku === sku);
  for (const property in variantUpdate) {
    updatedProduct.variants[index][property] = variantUpdate[property];
  }
  updatedProduct.markModified('variants');
  return await updatedProduct.save();
}

async function deleteProductVariantsService (identity, sku) {
  const filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  await Product.findOneAndUpdate(filter, { $pull: { variants: { sku: sku } } });
}


//#region Product info
async function getAllService() {
  return await Product.find()
    .select(SELECT_FIELD)
    .sort({createdAt: -1})
    .populate(POPULATE_OPTS)
    .lean().exec();
}

async function getProductByIdService(identity) {
  const filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };

  return await Product.findOneAndUpdate(filter, {$inc: {views: 1}}, {new: true})
    .select(SELECT_FIELD)
    .populate(POPULATE_OPTS)
    .lean().exec();
}

async function createProductService(req) {
  const categoryId = await findCategoryIdService(req.body.categoryId);
  if (!categoryId) { throw new Error(`Category '${req.body.categoryId}' not found!`); }
  
  const brandId = await findBrandIdService(req.body.brandId);
  if (!brandId) { throw new Error(`Brand '${req.body.brandId}' not found!`); }
  
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    category: categoryId,
    brand: brandId,
    ...getProductFromRequestService(req, true),
  });
  return await product.save();
}

async function updateProductService(req) {
  const { identity } = req.params;
  const filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  let updated = getProductFromRequestService(req);

  return Product.findOneAndUpdate(filter, updated, {new: true});
}

async function deleteProductService(req) {
  const { identity } = req.params;
  const filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  return Product.findOneAndDelete(filter);
}

async function rateProductService(req) {
  const { identity } = req.params;
  const filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  console.log(filter)
  const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  const rateStar = Number.parseFloat(req.body.rateStar) || 0;
  
  if (rateStar < 1 || rateStar > 5) {
    throw new Error('Rate must be between 1 and 5');
  }
  await Product.findOneAndUpdate(filter, { $pull: { rates: { ip: ip } } }); // remove old rate if exist
  return Product.findOneAndUpdate(filter, {$addToSet: {rates: {ip: ip, star: rateStar}}}, {new: true});
}
