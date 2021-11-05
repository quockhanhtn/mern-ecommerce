import mongoose from 'mongoose';
import Product from '../models/product.model.js';
import categoryService from './categories.service.js'
import brandService from './brands.service.js'
import strUtils from '../utils/str-utils.js';
import ApiError from '../utils/APIError.js';

export default {
  getAllProducts,
  getOneProduct,
  createProduct,
  updateProduct,
  removeProduct,
  rateProduct,

  addProductVariants,
  updateProductVariants,
  deleteProductVariants,
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
 * Initial product variant from data
 * @param {object} data - Data pass from req.body
 * @returns product variant
 */
function initialProductVariant(data) {
  let variant = {};

  if (data.sku) { variant.sku = data.sku; }
  if (data.variantName) { variant.variantName = data.variantName; }

  if (data.price) { variant.price = Number.parseInt(data.price); }
  if (data.marketPrice) { variant.marketPrice = Number.parseInt(data.marketPrice); }
  if (data.quantity) { variant.quantity = Number.parseInt(data.quantity); }

  if (data.addSpecifications) {
    if (typeof data.addSpecifications === 'string') {
      variant.addSpecifications = JSON.parse(data.addSpecifications);
    } else if (data.addSpecifications) {
      variant.addSpecifications = data.addSpecifications;
    }
  }

  // product thumbnail
  if (data.thumbnail && data.thumbnail.length > 0) {
    variant.thumbnail = data.thumbnail[0];
  }
  // product pictures
  if (data.pictures && data.pictures.length > 0) {
    variant.pictures = data.pictures;
  }
  return variant;
}

/**
 * Initial product from data
 * @param {object} data - Data pass from req.body
 * @returns product
 */
async function initialProduct(data, isAddNew = false) {
  let product = {};

  //#region Handle category and brand
  const categoryId = await categoryService.getId(data.categoryId);
  if (!categoryId && isAddNew) {
    throw new ApiError({
      message: `Category '${data.categoryId}' not found!`,
      status: 404
    });
  } else if (categoryId) {
    product.category = categoryId;
  } else { }   // is updated and not change category

  const brandId = await brandService.getId(data.brandId);
  if (!brandId && isAddNew) {
    throw new ApiError({
      message: `Brand '${data.brandId}' not found!`,
      status: 404
    });
  } else if (brandId) {
    product.brand = brandId;
  } else { }   // is updated and not change brand
  //#endregion

  if (data.name) { product.name = data.name; }
  if (data.desc) { product.desc = data.desc; }
  if (data.video) { product.video = data.video; }
  if (data.specifications) {
    if (typeof data.specifications === 'string') {
      product.specifications = JSON.parse(data.specifications);
    } else if (data.specifications) {
      product.specifications = data.specifications;
    }
  }
  if (data.tags) {
    if (typeof data.tags === 'string') {
      product.tags = strUtils.splitsAndTrim(data.tags, ',');
    } else if (Array.isArray(data.tags)) {
      product.tags = data.tags;
    }
  }

  if (data.releaseTime) { product.releaseTime = new Date(Date.parse(data.releaseTime)); }
  if (data.warrantyPeriod) { product.warrantyPeriod = Number.parseInt(data.warrantyPeriod); }
  if (data.origin) { product.origin = Number.parseInt(data.origin); }

  if (isAddNew) {
    let firstVariant = initialProductVariant(data);
    product.variants = [firstVariant];
    product.defaultVariant = firstVariant.sku;
  } else if (data.defaultVariant) {
    product.defaultVariant = data.defaultVariant;
  }

  return product;
}

/**
 * Get product
 * @param {*} identity
 * @param {boolean} needIncView - if true, inc views 1
 * @returns
 */
async function getOneProduct(identity, needIncView = false, notLean = false) {
  const filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };

  if (needIncView) {
    return await Product.findOneAndUpdate(filter, { $inc: { views: 1 } }, { new: true })
      .select(SELECT_FIELD)
      .populate(POPULATE_OPTS)
      .lean().exec();
  } else if (notLean) {
    return Product.findOne(filter).populate(POPULATE_OPTS).exec();
  } else {
    return Product.findOne(filter).populate(POPULATE_OPTS).lean().exec();
  }
}

async function addProductVariants(productIdentity, variantData) {
  const product = await getOneProduct(productIdentity, false, true);
  if (!product) {
    throw new ApiError({
      message: `Product ${productIdentity} not found !`,
      status: 404
    })
  };

  const newVariant = initialProductVariant(variantData);
  product.variants.push(newVariant);
  product.markModified('variants');
  return await product.save();
}

async function updateProductVariants(productIdentity, sku, variantData) {
  const product = await getOneProduct(productIdentity, false, true);
  if (!product) {
    throw new ApiError({
      message: `Product ${productIdentity} not found !`,
      status: 404
    })
  };

  let variantUpdate = initialProductVariant(variantData);

  let index = product.variants.findIndex(x => x.sku === sku);
  for (const property in variantUpdate) {
    product.variants[index][property] = variantUpdate[property];
  }
  product.markModified('variants');
  return await product.save();
}

async function deleteProductVariants(identity, sku) {
  const filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  await Product.findOneAndUpdate(filter, { $pull: { variants: { sku: sku } } });
}


//#region Product info
async function getAllProducts() {
  return await Product.find()
    .select(SELECT_FIELD)
    .sort({ createdAt: -1 })
    .populate(POPULATE_OPTS)
    .lean().exec();
}

async function createProduct(data) {
  const product = await initialProduct(data, true);
  const newProduct = new Product({
    _id: new mongoose.Types.ObjectId(),
    ...product,
  });
  return await newProduct.save();
}

async function updateProduct(identity, data) {
  const filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };

  let updated = await initialProduct(data);
  return Product.findOneAndUpdate(filter, updated, { new: true });
}

async function removeProduct(identity) {
  const filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  return Product.findOneAndDelete(filter);
}

async function rateProduct(identity, ip, rateStar) {
  const filter = strUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };

  await Product.findOneAndUpdate(filter, { $pull: { rates: { ip: ip } } }); // remove old rate if exist
  return Product.findOneAndUpdate(filter, { $addToSet: { rates: { ip: ip, star: rateStar } } }, { new: true });
}
