import resUtils from '../utils/res-utils.js';
import writeOrderService from "../services/write-order.service.js";

/**
 * Create one  item
 * @returns item
 */
export const addProductToCartDB = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const product = req.body;
    const addProductsAdded = writeOrderService.addProduct(userId, product);
  
    if (addProductsAdded) {
      resUtils.status200(res, 'Added successfully', addProductsAdded);
    } else {
      resUtils.status200(res, 'Added not successfully', []);
    }
  } catch (err) { next(err); }
}
