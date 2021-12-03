import resUtils from '../utils/res-utils.js';
import productService from '../services/products.service.js'
import { formatImageUrl } from '../utils/format-utils.js';

const formatProduct = (product, req) => {
  product.category = formatImageUrl(product.category, 'image', req);
  product.brand = formatImageUrl(product.brand, 'image', req);

  if (product.variants && product.variants.length > 0) {
    product.variants = product.variants.map(x => {
      x = formatImageUrl(x, 'thumbnail', req);
      x = formatImageUrl(x, 'pictures', req);
      return x;
    });
  }
  return product;
}

const initPagination = (total, limit, page) => {
  const pagination = {
    total,
    totalPages: Math.ceil(total / limit),
    limit,
    page,
    hasNextPage: false,
    nextPage: null,
    hasPrevPage: false,
    prevPage: null
  };

  // Set prev page
  if (page > 1) {
    pagination.hasPrevPage = true;
    pagination.prevPage = page - 1;
  }

  // Set next page
  if (page < pagination.totalPages) {
    pagination.hasNextPage = true;
    pagination.nextPage = page + 1;
  }

  return pagination;
};

//#region Product variants
export const addProductVariants = async (req, res, next) => {
  try {
    const { identity } = req.params;

    const updatedProduct = await productService.addProductVariants(identity, req.body);
    if (updatedProduct) {
      resUtils.status201(
        res,
        `Add product variant to '${updatedProduct.name}' successfully!`,
        formatProduct(updatedProduct, req)
      );
    } else {
      resUtils.status500(res, `Has error when add variant to product '${identity}`);
    }
  } catch (err) { next(err); }
};

export const updateProductVariants = async (req, res, next) => {
  try {
    const { identity, sku } = req.params;
    const updatedProduct = await productService.updateProductVariants(identity, sku, req.body);

    if (updatedProduct) {
      resUtils.status200(
        res,
        `Update product variant of '${updatedProduct.name}' successfully!`,
        formatProduct(updatedProduct, req)
      );
    } else {
      resUtils.status500(res, `Update product variant of '${updatedProduct.name}' failed!`);
    }

  } catch (err) { next(err); }
};

export const deleteProductVariants = async (req, res, next) => {
  try {
    const { identity, sku } = req.params;
    await productService.deleteProductVariants(identity, sku);
    resUtils.status204(res, `Delete product variant successfully!`,);
  } catch (err) { next(err); }
};
//#endregion

//#region Product info
export const getAllProducts = async (req, res, next) => {
  try {
    const category = req.query.c || null;
    const brand = req.query.b || null;
    const search = req.query.search || null;

    const fields = req.query.fields || null;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    let filters = {};
    if (category) { filters.category = category; }
    if (brand) { filters.brand = brand; }
    if (search) { filters.name = { $regex: search, $options: 'i' }; }

    let { list: products, total } = await productService.getAllProducts(fields, limit, page, filters);
    products = products.map(p => formatProduct(p, req));

    const pagination = initPagination(total, limit, page);

    if (products && products.length > 0) {
      resUtils.status200(res, 'Get all products successfully!', products, { pagination });
    } else {
      resUtils.status200(res, 'No products found', []);
    }
  } catch (err) { next(err); }
};

export const getProductFilter = async (req, res, next) => {
  try {
    // url in format: /products/:category?b=brand&filter?fields=name,price&limit=10&page=1
    const category = req.params.category || 'all';
    const brand = req.params.b || 'all';
    const q = req.params.q || null;

    const fields = req.query.fields || null;
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    let filters = {};
    if (category !== 'all') { filters.category = category; }
    if (brand !== 'all') { filters.brand = brand; }
    if (q !== null) { filters.name = { $regex: q, $options: 'i' }; }

    let { list: products, total } = await productService.getAllProducts(fields, limit, page, filters);
    products = products.map(p => formatProduct(p, req));
    const pagination = initPagination(total, limit, page);

    if (products && products.length > 0) {
      resUtils.status200(res, 'Get all products successfully!', products, { pagination });
    } else {
      resUtils.status200(res, 'No products found', []);
    }
  } catch (err) { next(err); }
};

export const getProductById = async (req, res, next) => {
  try {
    const { identity } = req.params;
    // inc views and get new data for return
    const product = await productService.getOneProduct(identity, true);
    if (product) {
      resUtils.status200(res, null, formatProduct(product, req));
    } else {
      resUtils.status404(res, `Product '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    resUtils.status201(
      res,
      `Create NEW product '${newProduct.name}' successfully!`,
      formatProduct(newProduct, req)
    );
  } catch (err) { next(err); }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const updatedProduct = await productService.updateProduct(identity, req.body);
    if (updatedProduct) {
      resUtils.status200(
        res,
        `Update product '${updatedProduct.name}' successfully!`,
        formatProduct(updatedProduct, req)
      );
    } else {
      resUtils.status404(res, `Product not found!`);
    }
  } catch (err) { next(err); }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const result = await productService.removeProduct(identity);
    if (result) {
      resUtils.status204(res, `Deleted product successfully!`);
    } else {
      resUtils.status404(res, `Product not found!`);
    }
  } catch (err) { next(err); }
};

export const rateProduct = async (req, res, next) => {
  try {
    const { identity } = req.params;

    const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    const rateStar = Number.parseFloat(req.body.rateStar) || 0;

    if (rateStar < 1 || rateStar > 5) {
      throw new Error('Rate must be between 1 and 5');
    }

    const result = await productService.rateProduct(identity, ip, rateStar);
    if (result) {
      resUtils.status200(
        res,
        `Rate product '${result.name}' successfully!`,
        formatProduct(result, req)
      );
    } else {
      resUtils.status404(res, `Product not found!`);
    }
  } catch (err) { next(err); }
};
//#endregion

//#region Product extra info
export const getProductSpecifications = async (req, res, next) => {
  try {
    const data = await productService.getSpecifications();
    resUtils.status200(res, 'Get product specifications successfully!', data);
  } catch (err) { next(err); }
};
//#endregion