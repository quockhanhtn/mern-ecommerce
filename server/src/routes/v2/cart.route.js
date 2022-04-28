import { Router } from 'express';
import {
  getCartItems,
  addItem,
  updateItemQty,
  deleteItem,
  cleanCart,
} from '../../controllers/cart.controller.js';
import { isAuthorized, isGuestOrAuthorized } from '../../middlewares/jwt-auth.js';

const router = Router();

/**
 * Authorization
 * all routes : any user
 */

router.route('/').post(isGuestOrAuthorized, getCartItems)
  //.post(isAuthorized, addItem)
  .patch(isAuthorized, updateItemQty)

router.route('/add').post(isAuthorized, addItem);

router.route('/:productId/:sku').delete(isAuthorized, deleteItem);
router.route('/clean').delete(isAuthorized, cleanCart);

export default router;
