import resUtils from '../utils/res-utils.js';
import cartService from '../services/cart.service.js';

export const getCartItems = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const items = await cartService.getCartItemsByUser(userId);
    if (items) {
      resUtils.status200(res, 'Get cart items successfully !', items);
    } else {
      resUtils.status200(res, 'Your cart is empty !', items);
    }
  } catch (err) { next(err); }
}

export const addItem = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, sku, qty } = req.body;
    const addResult = await cartService.addItem(userId, productId, sku, qty);
    if (addResult) {
      resUtils.status200(res, 'Add item to cart successfully');
    } else {
      resUtils.status500(res, 'Error when at item to cart');
    }
  } catch (err) { next(err); }
}

export const updateItemQty = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, sku, delta } = req.body;

    const updateResult = await cartService.updateItemQty(userId, productId, sku, delta);
    if (updateResult) {
      resUtils.status200(res, 'Update item qty on cart successfully', updateResult);
    } else {
      resUtils.status500(res, 'Has error when update', updateResult);
    }
  } catch (err) { next(err); }
}

export const deleteItem = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const { productId, sku } = req.body;

    const result = await cartService.removeItem(userId, productId, sku);
    if (result) {
      resUtils.status200(res, 'Remove item from cart cart successfully', result);
    } else {
      resUtils.status200(res, 'Has error when remove item from cart', result);
    }
  } catch (err) { next(err); }
}

export const cleanCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cleaned = await cartService.cleanCart(userId);

    if (cleaned) {
      resUtils.status200(res, 'Clean list successfully');
    } else {
      resUtils.status200(res, 'Clean list not successfully');
    }
  } catch (err) { next(err); }
}