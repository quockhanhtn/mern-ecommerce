import Product from '../models/product.model.js';
import ProductRecom from '../models/product-recom.model.js';

import categoryService from './categories.service.js'
import brandService from './brands.service.js'

import StringUtils from '../utils/StringUtils.js';
import ApiErrorUtils from '../utils/ApiErrorUtils.js';
import ValidUtils from '../utils/ValidUtils.js';

export default {
  getAllProducts,
  getBestSellerProducts,
  getOneProduct,
  getSuggestProducts,
  getProductRecommend,
  createProduct,
  updateProduct,
  toggleHideProduct,
  removeProduct,
  rateProduct,
  countProduct,
  getSpecifications,
  getFullAll,
  addProductVariants,
  updateProductVariants,
  deleteProductVariants,
  updatePriceRange
};

const SELECT_FIELD = '_id name slug desc video overSpecs origin category brand tags views rate variants quantity warrantyPeriod isHide createdAt updatedAt';
const POPULATE_OPTS = [
  {
    path: 'category',
    select: 'name slug image _id -children',
    model: 'Category'
  },
  {
    path: 'brand',
    select: 'name slug image _id',
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

  if (data.addOverSpecs) {
    if (typeof data.addOverSpecs === 'string') {
      variant.addOverSpecs = JSON.parse(data.addOverSpecs);
    } else if (data.addOverSpecs) {
      variant.addOverSpecs = data.addOverSpecs;
    }
  }
  if (data.addDetailSpecs) {
    if (typeof data.addDetailSpecs === 'string') {
      variant.addDetailSpecs = JSON.parse(data.addDetailSpecs);
    } else if (data.addDetailSpecs) {
      variant.addDetailSpecs = data.addDetailSpecs;
    }
  }

  // product thumbnail
  if (data.thumbnail && data.thumbnail.length > 0) {
    if (typeof data.thumbnail === 'string') {
      variant.thumbnail = data.thumbnail;
    } else if (Array.isArray(data.thumbnail)) {
      variant.thumbnail = data.thumbnail[0];
    }
  }
  // product pictures
  if (data.pictures) {
    if (typeof data.pictures === 'string') {
      variant.pictures = StringUtils.splitsAndTrim(data.pictures, ',');
    } else if (Array.isArray(data.pictures)) {
      variant.pictures = data.pictures;
    }
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
    throw new ApiErrorUtils({
      message: `Category '${data.categoryId}' not found!`,
      status: 404
    });
  } else if (categoryId) {
    product.category = categoryId;
  } else { }   // is updated and not change category

  const brandId = await brandService.getId(data.brandId);
  if (!brandId && isAddNew) {
    throw new ApiErrorUtils({
      message: `Brand '${data.brandId}' not found!`,
      status: 404
    });
  } else if (brandId) {
    product.brand = brandId;
  } else { }   // is updated and not change brand
  //#endregion

  if (data.name) { product.name = data.name; }
  if (data.code) { product.code = data.code; }
  if (data.desc) { product.desc = data.desc; }
  if (data.video) { product.video = data.video; }
  if (data.overSpecs) {
    if (typeof data.overSpecs === 'string') {
      product.overSpecs = JSON.parse(data.overSpecs);
    } else if (data.overSpecs) {
      product.overSpecs = data.overSpecs;
    }
  }
  if (data.tags) {
    if (typeof data.tags === 'string') {
      product.tags = StringUtils.splitsAndTrim(data.tags, ',');
    } else if (Array.isArray(data.tags)) {
      product.tags = data.tags;
    }
  }

  // if (data.releaseTime) { product.releaseTime = new Date(Date.parse(data.releaseTime)); }
  if (data.warrantyPeriod) { product.warrantyPeriod = Number.parseInt(data.warrantyPeriod); }
  if (data.origin) { product.origin = data.origin }

  if (isAddNew) {
    let firstVariant = initialProductVariant(data);
    product.variants = [firstVariant];
    product.defaultVariant = firstVariant.sku;
  } else if (data.defaultVariant) {
    product.defaultVariant = data.defaultVariant;
  }

  return product;
}

async function addProductVariants(productIdentity, variantData) {
  const product = await getOneProduct(productIdentity, false, true);
  if (!product) {
    throw new ApiErrorUtils({
      message: `Product ${productIdentity} not found !`,
      status: 404
    })
  }

  const newVariant = initialProductVariant(variantData);
  product.variants.push(newVariant);
  product.markModified('variants');
  return product.save();
}

async function updateProductVariants(productIdentity, sku, variantData) {
  const product = await getOneProduct(productIdentity, false, true);
  if (!product) {
    throw ApiErrorUtils.simple(`Product ${productIdentity} not found !`, 404);
  }

  let variantUpdate = initialProductVariant(variantData);

  let index = product.variants.findIndex(x => x.sku === sku);
  for (const property in variantUpdate) {
    product.variants[index][property] = variantUpdate[property];
  }
  product.markModified('variants');
  return product.save();
}

async function deleteProductVariants(identity, sku) {
  const filter = StringUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  await Product.findOneAndUpdate(filter, { $pull: { variants: { sku: sku } } });
}


//#region Product info
/**
 * Get list products
 * @param {String} fields - Fields to get
 * @param {Number} limit 
 * @param {Number} page 
 * @param {Object} filter
 * @param {String} sortBy 
 * @param {-1 | 1} sortType 
 * @param {Boolean} getCategoryFilter 
 * @param {Boolean} getBrandFilter 
 * @param {Boolean} isShowHidden 
 * @returns 
 */
async function getAllProducts(options = {}) {
  let {
    fields,
    limit = 10,
    page = 1,
    filters = {},
    projection = null,
    sortBy = 'createdAt',
    sortType = -1,
    getCategoryFilter = false,
    getBrandFilter = false,
    isShowHidden = false,
    populateCategory = true,
    populateBrand = true,
    fullTextSearch = false
  } = options;

  if (StringUtils.isBlankOrEmpty(fields)) {
    fields = SELECT_FIELD;
  }

  if (fields.indexOf(',') > -1) {
    fields = fields.split(',').join(' ');
  }

  const populateOpts = [];
  if (fields.includes('category') && populateCategory) {
    populateOpts.push({ path: 'category', select: 'name slug image _id -children', model: 'Category' });
  }
  if (fields.includes('brand') && populateBrand) {
    populateOpts.push({ path: 'brand', select: 'name slug image _id', model: 'Brand' });
  }

  const sortOtp = {};
  sortOtp[sortBy] = sortType;

  if (!isShowHidden) {
    filters.isHide = false;
  }

  const countAll = await Product.estimatedDocumentCount();
  // const total = await countProduct(filters);
  const total = await Product.count(filters, null);
  const list = await Product.find(filters, projection, null, null)
    .select(fields)
    .populate(populateOpts)
    .skip((page - 1) * limit)
    .sort(sortOtp)
    .limit(limit)
    .lean().exec();

  let result = { countAll, total, list };

  if (getCategoryFilter) {
    const lstCatId = await Product.distinct('category', filters).lean().exec();
    result.categoryFilter = await categoryService.getAll('name slug image _id -children', { _id: { $in: lstCatId } });
    if (lstCatId.some(x => !x)) {
      result.categoryFilter = [{ _id: 'null', name: '', slug: '', image: '' }, ...result.categoryFilter];
    }
  }

  if (getBrandFilter) {
    const lstBrandId = await Product.distinct('brand', filters).lean().exec();
    result.brandFilter = await brandService.getAll('name slug image _id', { _id: { $in: lstBrandId } });
    if (lstBrandId.some(x => !x)) {
      result.brandFilter = [{ _id: 'null', name: '', slug: '', image: '' }, ...result.brandFilter];
    }
  }

  return result;
}

async function getBestSellerProducts(limit = 10) {
  const result = await Product.aggregate([
    { "$addFields": { "totalSold": { "$sum": "$variants.sold" } } },
    { "$sort": { "totalSold": -1 } },
    { "$limit": limit + 1 },
    { "$lookup": { "from": "categories", "localField": "category", "foreignField": "_id", "as": "category" } },
    { "$unwind": "$category" },
    { "$lookup": { "from": "brands", "localField": "brand", "foreignField": "_id", "as": "brand" } },
    { "$unwind": "$brand" },
    {
      "$project":
      {
        "name": 1,
        "slug": 1,
        "totalSold": 1,
        "variants": { "thumbnail": 1, "price": 1, "sold": 1 },
        "category": { "name": 1, "_id": 1, "image": 1 },
        "brand": { "name": 1, "_id": 1, "image": 1 }
      }
    }
  ]).exec();
  return result;
}

/**
 * Get product
 * @param {*} identity
 * @param {boolean} needIncView - if true, inc views 1
 * @returns
 */
async function getOneProduct(identity, needIncView = false, notLean = false, fields = SELECT_FIELD) {
  const filter = StringUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };

  const populateOpts = [];
  if (fields.includes('category')) {
    populateOpts.push({ path: 'category', select: 'name slug image _id -children', model: 'Category' },);
  }
  if (fields.includes('brand')) {
    populateOpts.push({ path: 'brand', select: 'name slug image _id', model: 'Brand' },);
  }

  if (needIncView) {
    return Product.findOneAndUpdate(filter, { $inc: { views: 1 } }, { new: true })
      .select(fields)
      .populate(populateOpts)
      .lean().exec();
  } else if (notLean) {
    return Product.findOne(filter).select(fields).populate(populateOpts).exec();
  } else {
    return Product.findOne(filter).select(fields).populate(populateOpts).lean().exec();
  }
}

async function getSuggestProducts(keyword, limit = 10) {
  const result = await Product.find(
    { $text: { $search: new RegExp(keyword, 'gmi') } },
    { score: { $meta: "textScore" } },
    null,
    null
  ).select('slug name variants.variantName variants.sku variants.price variants.marketPrice variants.thumbnail')
    .sort({ score: { $meta: 'textScore' } })
    .limit(limit)
    .lean().exec();
  return result;
}

async function getProductRecommend(productId) {
  if (!ValidUtils.isUuid(productId)) {
    throw ApiErrorUtils.simple(`Product ${productId} not found !`, 404);
  }

  const recommendData = await ProductRecom.findOne({ productId: productId }).lean().exec();
  return recommendData?.recommend || [];
}

async function createProduct(data) {
  const categoryId = await categoryService.getId(data.categoryId);
  if (!categoryId) {
    throw ApiErrorUtils.simple(`Category '${data.categoryId}' not found!`, 404);
  }
  const brandId = await brandService.getId(data.brandId);
  if (!brandId) {
    throw ApiErrorUtils.simple(`Brand '${data.brandId}' not found!`, 404);
  }

  const product = new Product({
    category: categoryId,
    brand: brandId
  });
  if (data.name) { product.name = data.name; }
  if (data.desc) { product.desc = data.desc; }
  if (data.video) { product.video = data.video; }

  if (data.overSpecs) {
    if (typeof data.overSpecs === 'string') {
      product.overSpecs = JSON.parse(data.overSpecs);
    } else if (data.overSpecs) {
      product.overSpecs = data.overSpecs;
    }
  }
  if (data.detailSpecs) {
    if (typeof data.detailSpecs === 'string') {
      product.detailSpecs = JSON.parse(data.detailSpecs);
    } else if (data.overSpecs) {
      product.detailSpecs = data.detailSpecs;
    }
  }
  if (data.specPicture) { product.specPicture = data.specPicture; }
  if (data.tags) {
    if (typeof data.tags === 'string') {
      product.tags = StringUtils.splitsAndTrim(data.tags, ',');
    } else if (Array.isArray(data.tags)) {
      product.tags = data.tags;
    }
  }

  // if (data.releaseTime) { product.releaseTime = new Date(Date.parse(data.releaseTime)); }
  if (data.warrantyPeriod) { product.warrantyPeriod = Number.parseInt(data.warrantyPeriod); }
  if (data.origin) { product.origin = data.origin }

  if (data.policies) {
    if (typeof data.policies === 'string') {
      product.policies = StringUtils.splitsAndTrim(data.policies, ',');
    } else if (Array.isArray(data.policies)) {
      product.policies = data.policies;
    }
  }
  if (data.hightLightPics) {
    if (typeof data.hightLightPics === 'string') {
      product.hightLightPics = StringUtils.splitsAndTrim(data.hightLightPics, ',');
    } else if (Array.isArray(data.hightLightPics)) {
      product.hightLightPics = data.hightLightPics;
    }
  }
  product.variants = [initialProductVariant(data)];

  categoryService.incCountProduct(categoryId);
  brandService.incCountProduct(brandId);
  return product.save().then(p => p.populate(POPULATE_OPTS).lean().exec());

  // const newProduct = new Product({
  //   _id: new mongoose.Types.ObjectId(),
  //   ...product,
  // });
  // const productSearch = await newProduct.save();
  // return Product.findById(productSearch._id).populate(POPULATE_OPTS).lean().exec();
}

async function updateProduct(identity, data) {
  const filter = StringUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };

  let updated = await initialProduct(data);
  return Product.findOneAndUpdate(filter, updated, { new: true });
}

async function toggleHideProduct(identity) {
  const filter = StringUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  const product = await Product.findOne(filter).select('isHide').lean().exec();
  return Product.findOneAndUpdate(filter, { $set: { isHide: !product.isHide } }, { new: true, lean: true, fields: '_id isHide' });
}

async function removeProduct(identity) {
  const filter = StringUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };
  const product = await Product.findOne(filter).exec();
  if (!product) {
    throw ApiErrorUtils.simple(`Product ${identity} not found !`, 404);
  }

  product.remove();
  return Product.findOneAndDelete(filter);
}

async function rateProduct(identity, ip, rateStar) {
  const filter = StringUtils.isUUID(identity)
    ? { _id: identity }
    : { slug: identity };

  await Product.findOneAndUpdate(filter, { $pull: { rates: { ip: ip } } }); // remove old rate if exist
  return Product.findOneAndUpdate(filter, { $addToSet: { rates: { ip: ip, star: rateStar } } }, { new: true });
}

async function countProduct(filter) {
  return Product.countDocuments(JSON.parse(JSON.stringify(filter)), null).exec()
}

async function getSpecifications() {
  const mainSpecs = await Product.distinct('overSpecs').exec();
  const variantSpecs = await Product.distinct('variants.addOverSpecs').exec();
  const allSpecs = [...new Set([...mainSpecs, ...variantSpecs])];

  const groupObj = allSpecs.reduce((acc, cur) => {
    const key = JSON.stringify({ key: cur.key, name: cur.name });
    if (acc[key]) {
      acc[key].push(cur.value);
    } else {
      acc[key] = [cur.value];
    }
    return acc;
  }, {});

  return Object.keys(groupObj).map(k => {
    return {
      key: JSON.parse(k).key,
      name: JSON.parse(k).name,
      values: [... new Set(groupObj[k])]
    };
  });
}

/**
 *
 * @returns all product
 */
async function getFullAll(fields = SELECT_FIELD) {
  if (fields.indexOf(',') > -1) {
    fields = fields.split(',').join(' ');
  }

  return Product.find()
    .select(fields)
    .sort({ createdAt: -1 })
    .lean().exec();
}

async function updatePriceRange() {
  const list = await Product.find({}).select('_id variants').exec();
  for (let i = 0; i < list.length; i++) {
    const product = list[i];
    let minPrice = Number.MAX_SAFE_INTEGER;
    let maxPrice = Number.MIN_SAFE_INTEGER;
    for (let j = 0; j < product.variants.length; j++) {
      const variant = product.variants[j];
      if (variant.price < minPrice) {
        minPrice = variant.price;
      }
      if (variant.price > maxPrice) {
        maxPrice = variant.price;
      }
    }
    await Product.findByIdAndUpdate(product._id, { minPrice, maxPrice });
  }
}
