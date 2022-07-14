import ResponseUtils from '../utils/ResponseUtils.js';
import productService from '../services/products.service.js'
import FormatUtils from '../utils/FormatUtils.js';

const formatProduct = (product, req) => {
  product.category = FormatUtils.imageUrl(product.category, 'image', req);
  product.brand = FormatUtils.imageUrl(product.brand, 'image', req);

  if (product.variants && product.variants.length > 0) {
    product.variants = product.variants.map(x => {
      x = FormatUtils.imageUrl(x, 'thumbnail', req);
      x = FormatUtils.imageUrl(x, 'pictures', req);
      return x;
    });
  }
  return product;
}

//#region Product variants
export const addProductVariants = async (req, res, next) => {
  try {
    const { identity } = req.params;

    const updatedProduct = await productService.addProductVariants(identity, req.body);
    if (updatedProduct) {
      ResponseUtils.status201(
        res,
        `Add product variant to '${updatedProduct.name}' successfully!`,
        formatProduct(updatedProduct, req)
      );
    } else {
      ResponseUtils.status500(res, `Has error when add variant to product '${identity}`);
    }
  } catch (err) { next(err); }
};

export const updateProductVariants = async (req, res, next) => {
  try {
    const { identity, sku } = req.params;
    const updatedProduct = await productService.updateProductVariants(identity, sku, req.body);

    if (updatedProduct) {
      ResponseUtils.status200(
        res,
        `Update product variant of '${updatedProduct.name}' successfully!`,
        formatProduct(updatedProduct, req)
      );
    } else {
      ResponseUtils.status500(res, `Update product variant of '${updatedProduct.name}' failed!`);
    }

  } catch (err) { next(err); }
};

export const deleteProductVariants = async (req, res, next) => {
  try {
    const { identity, sku } = req.params;
    await productService.deleteProductVariants(identity, sku);
    ResponseUtils.status204(res, `Delete product variant successfully!`,);
  } catch (err) { next(err); }
};
//#endregion

//#region Product info
export const getAllProducts = async (req, res, next) => {
  try {
    const category = req.query.c || '';
    const brand = req.query.b || '';
    const search = decodeURI(req.query.search || '');

    const fields = req.query.fields || '';
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;

    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || 0;

    if (minPrice > maxPrice) {
      ResponseUtils.status400(res, `Min price must be less than max price!`);
      return;
    }

    let sortBy = req.query.sortBy || 'createdAt';
    let sortType = ((req.query.sort || 'desc') === 'asc') ? 1 : -1;

    let filters = {};
    let projection = null;
    if (category) {
      if (category === 'null') {
        filters.category = null;
      } else {
        filters.category = [...category.split(',')];
      }
    }
    if (brand) {
      if (brand === 'null') {
        filters.brand = null;
      } else {
        filters.brand = [...brand.split(',')];
      }
    }
    if (search) {
      // filters.name = { $regex: search, $options: 'i' };
      filters['$text'] = { $search: new RegExp(search, 'gmi') }
      projection = { score: { $meta: "textScore" } }
      sortBy = 'score';
      sortType = { $meta: 'textScore' };
    }

    if (minPrice > 0) { filters.minPrice = { $gte: minPrice }; }
    if (maxPrice > 0) { filters.maxPrice = { $lte: maxPrice }; }

    let { list: products, total, countAll, ...other } = await productService.getAllProducts({
      fields,
      limit,
      page,
      filters,
      projection,
      sortBy,
      sortType,
      getCategoryFilter: req.query?.getCategoryFilter === '1',
      getBrandFilter: req.query?.getBrandFilter === '1',
      isShowHidden: req.query?.isShowHidden === '1',
      fullTextSearch: req.query?.fullTextSearch === '1',
      keyword: search
    });
    products = products.map(p => formatProduct(p, req));

    const pagination = {
      countAll,
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

    ResponseUtils.status200(res, 'Get all products successfully!', products, { pagination, ...other });
  } catch (err) { next(err); }
};

export const getProductById = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const { fields } = req.query;
    // inc views and get new data for return
    const product = await productService.getOneProduct(identity, true, false, fields);
    if (product) {
      ResponseUtils.status200(res, null, formatProduct(product, req));
    } else {
      ResponseUtils.status404(res, `Product '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}

export const getBestSellerProducts = async (req, res, next) => {
  try {
    const { limit } = req.query || 10;
    const products = await productService.getBestSellerProducts(limit);
    ResponseUtils.status200(
      res,
      'Get best seller products successfully!',
      products.map(p => formatProduct(p, req))
    );
  } catch (err) { next(err); }
}

export const getListProductsByIds = async (req, res, next) => {
  try {
    const {
      list,
      fields
    } = req.body;
    const filters = { '_id': { $in: list } };

    let result = await productService.getAllProducts({
      fields,
      limit: list.length,
      filters
    });
    let products = result.list.map(p => formatProduct(p, req));
    if (products) {
      ResponseUtils.status200(res, null, products);
    } else {
      ResponseUtils.status404(res, `Product not found!`);
    }
  } catch (err) { next(err); }
}

export const getSuggestProducts = async (req, res, next) => {
  try {
    const { keyword } = req.query;
    const products = await productService.getSuggestProducts(keyword.trim());
    ResponseUtils.status200(res, 'Get suggest products successfully!', products.map(p => formatProduct(p, req)));
  } catch (err) { next(err); }
};

export const getProductRecommend = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const recommend = await productService.getProductRecommend(productId);
    ResponseUtils.status200(res, 'Get recommend products successfully!', recommend);
  } catch (err) { next(err); }
};

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = await productService.createProduct(req.body);
    ResponseUtils.status201(
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
      ResponseUtils.status200(
        res,
        `Update product '${updatedProduct.name}' successfully!`,
        formatProduct(updatedProduct, req)
      );
    } else {
      ResponseUtils.status404(res, `Product not found!`);
    }
  } catch (err) { next(err); }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const result = await productService.removeProduct(identity);
    if (result) {
      ResponseUtils.status204(res, `Deleted product successfully!`);
    } else {
      ResponseUtils.status404(res, `Product not found!`);
    }
  } catch (err) { next(err); }
};

export const toggleHideProduct = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const result = await productService.toggleHideProduct(identity);
    if (result) {
      ResponseUtils.status200(res, `Toggle Hide product successfully!`, result);
    } else {
      ResponseUtils.status404(res, `Product not found!`);
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
      ResponseUtils.status200(
        res,
        `Rate product '${result.name}' successfully!`,
        formatProduct(result, req)
      );
    } else {
      ResponseUtils.status404(res, `Product not found!`);
    }
  } catch (err) { next(err); }
};
//#endregion

//#region Product extra info
export const getProductSpecifications = async (_req, res, next) => {
  try {
    const data = await productService.getSpecifications();
    ResponseUtils.status200(res, 'Get product overSpecs successfully!', data);
  } catch (err) { next(err); }
};
//#endregion

export const getFullAllProducts = async (req, res, next) => {
  try {
    const { fields } = req.query;
    let products = await productService.getFullAll(fields);
    products = products.map(product => formatProduct(product, req));
    if (products && products.length > 0) {
      ResponseUtils.status200(res, 'Gets all products successfully', products);
    } else {
      ResponseUtils.status200(res, 'No products found', []);
    }
  } catch (err) { next(err); }
}