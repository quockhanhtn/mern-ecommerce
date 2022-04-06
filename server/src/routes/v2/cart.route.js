import { Router } from 'express';
import {
  getCartItems,
  addItem,
  updateItemQty,
  deleteItem,
  cleanCart,
} from '../../controllers/cart.controller.js';
import { isAuthorized } from '../../middlewares/jwt-auth.js';

const router = Router();

/**
 * Authorization
 * all routes : any user
 */

router.route('/').get(isAuthorized, getCartItems)
  .post(isAuthorized, addItem)
  .patch(isAuthorized, updateItemQty)
  .delete(isAuthorized, deleteItem);

router.route('/clean').delete(isAuthorized, cleanCart);

export default router;
