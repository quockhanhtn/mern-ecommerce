import mongoose from 'mongoose';
import resUtils from '../utils/res-utils.js';
import strUtils from '../utils/str-utils.js';
import Category from '../models/category.model.js';
import Brand from '../models/brand.model.js';
import Product from '../models/product.model.js';

const SELECT_FIELD = '_id name slug desc video specifications category brand tags views rate variants createdAt updatedAt';
const populateOptions = [
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


const getImageUrl = (req, path) => {
  if (path.startsWith('/')) {
    return `${req.protocol}://${req.get('host')}${path}`;
  }
  return path;
}

const getFindOneFilter = (identity) => {
  if (strUtils.isUUID(identity)) {
    return { _id: identity };
  } else {
    return { slug: identity };
  }
};

const validateCategory = async (categoryId) => {
  if (!categoryId) { return { id: null, mess: 'Missing category for product!' }; }

  let filter = getFindOneFilter(categoryId);
  const category = await Category.findOne(filter);

  if (category) { return { id: category._id, mess: null }; }
  return { id: null, mess: `Category '${categoryId}' not found!` };
};

const validateBrand = async (brandId) => {
  if (!brandId) { return { id: null, mess: 'Missing brand for product!' }; }

  let filter = getFindOneFilter(brandId);
  const brand = await Brand.findOne(filter);

  if (brand) { return { id: brand._id, mess: null }; }
  return { id: null, mess: `Brand '${brandId}' not found!` };
};

const formatPath = (path) => {
  return '/' + strUtils.replaceAll(path, '\\', '/');
}

const formatProduct = (product, req) => {

  if (product.category?.image) {
    product.category.image = getImageUrl(req, product.category.image);
  }

  if (product.brand?.image) {
    product.brand.image = getImageUrl(req, product.brand.image);
  }


  if (product.variants && product.variants.length > 0) {
    product.variants = product.variants.map(x => {
      if (x.thumbnail) { x.thumbnail = getImageUrl(req, x.thumbnail); }

      if (x.pictures && x.pictures.length > 0) {
        x.pictures = x.pictures.map(y => getImageUrl(req, y));
      }

      return x;
    });
  }
  return product;
}

const getProductVariantFromRequest = (req) => {
  let variant = {};

  if (req.body.sku) { variant.sku = req.body.sku; }
  if (req.body.variantName) { variant.variantName = req.body.variantName; }

  if (req.body.quantity) { variant.quantity = Number.parseInt(req.body.quantity); }
  if (req.body.price) { variant.price = Number.parseInt(req.body.price) }
  if (req.body.marketPrice) { variant.marketPrice = Number.parseInt(req.body.marketPrice) }

  if (req.body.addSpecifications) {
    if (typeof req.body.addSpecifications === 'string') {
      variant.addSpecifications = JSON.parse(req.body.addSpecifications);
    } else if (req.body.addSpecifications) {
      variant.addSpecifications = req.body.addSpecifications;
    }
  }

  // product thumbnail
  let thumbnail = req?.files?.thumbnail?.[0]?.path;
  if (thumbnail) { variant.thumbnail = formatPath(thumbnail); }

  // product pictures
  if (req?.files?.pictures?.length > 0) {
    variant.pictures = [];
    req?.files?.pictures.forEach(x => variant.pictures.push(formatPath(x.path)));
  }

  return variant;
}

const getProductFromRequest = (req, isAddNew = false) => {
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

  if (isAddNew) {
    product.variants = [getProductVariantFromRequest(req)];
    product.variants[0].isDefault = true;
  }

  return product;
};


export const getAllProducts = async (req, res) => {
  try {
    let products = await Product.find()
      .select(SELECT_FIELD)
      .sort({ createdAt: -1 })
      .populate(populateOptions)
      .lean().exec();
    if (products && products.length > 0) {
      resUtils.status200(res, null, products.map(product => formatProduct(product, req)));
    } else {
      resUtils.status204(res, 'No products found');
    }
  } catch (err) { resUtils.status500(res, err); }
};

export const getProductById = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);
    const product = await Product.findOne(filter)
      .select(SELECT_FIELD)
      .populate(populateOptions)
      .lean().exec();
    if (product) {
      resUtils.status200(res, null, formatProduct(product, req));
    } else {
      resUtils.status404(res, `Product '${identity}' not found!`);
    }
  } catch (err) { resUtils.status500(res, err); }
}

export const createProduct = async (req, res) => {
  try {
    const { id: categoryId, mess: messCat } = await validateCategory(req.body.categoryId);
    if (categoryId === null) { return resUtils.status400(res, messCat); }

    const { id: brandId, mess: messBrand } = await validateBrand(req.body.brandId);
    if (brandId === null) { return resUtils.status400(res, messBrand); }

    const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      category: categoryId,
      brand: brandId,
      ...getProductFromRequest(req, true),
    });

    const newProduct = await product.save();
    resUtils.status201(
      res,
      `Create NEW product '${newProduct.name}' successfully!`,
      formatProduct(newProduct, req)
    );
  } catch (err) { resUtils.status500(res, err); }
};

export const addProductVariants = async (req, res) => {
  try {
    const { identity } = req.params;
    let filter = getFindOneFilter(identity);
    const product = await Product.findOne(filter);
    if (product) {
      product.variants.push(getProductVariantFromRequest(req));
      product.markModified('variants');
      const newProduct = await product.save();
      resUtils.status201(
        res,
        `Add product variant to '${newProduct.name}' successfully!`,
        formatProduct(newProduct, req)
      );
    } else { resUtils.status404(res, `Product '${identity}' not found!`); }
  } catch (err) { resUtils.status500(res, err); }
};
