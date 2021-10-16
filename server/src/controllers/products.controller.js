import resUtils from '../utils/res-utils.js';
import productService from '../services/products.service.js'

const formatProduct = (product, req) => {
  if (product.category?.image) {
    product.category.image = productService.getImageUrlService(req, product.category.image);
  }
  
  if (product.brand?.image) {
    product.brand.image = productService.getImageUrlService(req, product.brand.image);
  }
  
  if (product.variants && product.variants.length > 0) {
    product.variants = product.variants.map(x => {
      if (x.thumbnail) {
        x.thumbnail = productService.getImageUrlService(req, x.thumbnail);
      }
      
      if (x.pictures && x.pictures.length > 0) {
        x.pictures = x.pictures.map(y => productService.getImageUrlService(req, y));
      }
      return x;
    });
  }
  return product;
}
//#endregion

//#region Product variants
export const addProductVariants = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const product = await productService.getOne(identity);
    if (product) {
      const newProduct = productService.addProductVariantsService(req, product);
      resUtils.status201(
        res,
        `Add product variant to '${newProduct.name}' successfully!`,
        formatProduct(newProduct, req)
      );
    } else { resUtils.status404(res, `Product '${identity}' not found!`); }
  } catch (err) { next(err); }
};

export const updateProductVariants = async (req, res, next) => {
  try {
    const { identity } = req.params;
    const updatedProduct = await productService.getOne(identity);
    if (updatedProduct) {
      const saveResult = await productService.updateProductVariantsService(req, updatedProduct);
      if (saveResult) {
        resUtils.status200(
          res,
          `Update product variant of '${updatedProduct.name}' successfully!`,
          formatProduct(updatedProduct, req)
        );
      }
      else { resUtils.status500(res, `Update product variant of '${updatedProduct.name}' failed!`); }
    } else {
      resUtils.status404(res, `Product '${identity}' not found!`);
    }
  } catch (err) { next(err); }
};

export const deleteProductVariants = async (req, res, next) => {
  try {
    const { identity, sku } = req.params;
    await productService.deleteProductVariantsService(identity, sku);
    resUtils.status204(res, `Delete product variant successfully!`,);
  } catch (err) { next(err); }
};
//#endregion

//#region Product info
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await productService.getAllService();
    if (products && products.length > 0) {
      resUtils.status200(res, null, products.map(product => formatProduct(product, req)));
    } else {
      resUtils.status204(res, 'No products found');
    }
  } catch (err) { next(err); }
};


export const getProductById = async (req, res, next) => {
  try {
    const { identity } = req.params;
    // update views and get new data for return
    const product = await productService.getProductByIdService(identity);
    if (product) {
      resUtils.status200(res, null, formatProduct(product, req));
    } else {
      resUtils.status404(res, `Product '${identity}' not found!`);
    }
  } catch (err) { next(err); }
}

export const createProduct = async (req, res, next) => {
  try {
    const newProduct = await productService.createProductService(req);
    resUtils.status201(
      res,
      `Create NEW product '${newProduct.name}' successfully!`,
      formatProduct(newProduct, req)
    );
  } catch (err) { next(err); }
};

export const updateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productService.updateProductService(req);
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
    const deletedProduct = await productService.deleteProductService(req);
    if (deletedProduct) {
      resUtils.status204(res, `Deleted product successfully!`);
    } else {
      resUtils.status404(res, `Product not found!`);
    }
  } catch (err) { next(err); }
};

export const rateProduct = async (req, res, next) => {
  try {
    const updatedProduct = await productService.rateProductService(req);
    if (updatedProduct) {
      resUtils.status200(
        res,
        `Rate product '${updatedProduct.name}' successfully!`,
        formatProduct(updatedProduct, req)
      );
    } else {
      resUtils.status404(res, `Product not found!`);
    }
  } catch (err) { next(err); }
};
//#endregion
