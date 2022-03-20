import resUtils from '../utils/res-utils.js';
import writeOrderService from "../services/write-order.service.js";

/**
 * Add product
 * @returns item
 */
export const addProductToCartDB = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const product = req.body;
    const addProductsAdded = await writeOrderService.addProduct(userId, product);
  
    if (addProductsAdded) {
      resUtils.status200(res, 'Added successfully');
    } else {
      resUtils.status200(res, 'Added not successfully');
    }
  } catch (err) { next(err); }
}

/**
 * Get list product of user
 * @returns list
 */
export const getListProductOfUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const currentField = await writeOrderService.getOne(userId);
    
    if (currentField) {
      resUtils.status200(res, 'Get list successfully', currentField.listProducts);
    } else {
      resUtils.status200(res, 'Get list not successfully');
    }
  } catch (err) { next(err); }
}

/**
 * Delete product in cart
 * @returns item
 */
export const deleteProductInCartDB = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productInfo = req.body;
    const deleteProduct = await writeOrderService.deleteProduct(userId, productInfo);
    
    if (deleteProduct) {
      resUtils.status200(res, 'Delete successfully');
    } else {
      resUtils.status200(res, 'Delete not successfully');
    }
  } catch (err) { next(err); }
}

/**
 * Increase product in cart
 * @returns item
 */
export const increaseProductInCartDB = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productInfo = req.body;
    const increaseProduct = await writeOrderService.increaseProduct(userId, productInfo);
    
    if (increaseProduct) {
      resUtils.status200(res, 'Increase successfully');
    } else {
      resUtils.status200(res, 'Increase not successfully');
    }
  } catch (err) { next(err); }
}

/**
 * Decrease product in cart
 * @returns item
 */
export const decreaseProductInCartDB = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productInfo = req.body;
    const decreaseProduct = await writeOrderService.decreaseProduct(userId, productInfo);
    
    if (decreaseProduct) {
      resUtils.status200(res, 'Decrease successfully');
    } else {
      resUtils.status200(res, 'Decrease not successfully');
    }
  } catch (err) { next(err); }
}

/**
 * Clean all product after order
 * @returns item
 */
export const cleanProductInCartDB = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cleaned = await writeOrderService.cleanProducts(userId);
    
    if (cleaned) {
      resUtils.status200(res, 'Clean list successfully');
    } else {
      resUtils.status200(res, 'Clean list not successfully');
    }
  } catch (err) { next(err); }
}