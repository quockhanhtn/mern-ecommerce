import express from 'express';
import {
  getOne,
  getByUser,
  createByUser,
  updateByUser,
  rePayOrder,
  getAllOrders,
  createOrderByAdminOrStaff,
  updateOrderByAdminOrStaff
} from '../../controllers/orders.controller.js';
import { isGuestOrAuthorized, isAdminOrStaff } from '../../middlewares/jwt-auth.js';

const router = express.Router();

/**
 * Authorization
 * Get all              : admin or staff
 * Create, update       : admin or staff
 * Delete               : not allowed
 */

 router.route('/manager')
 .get(isAdminOrStaff, getAllOrders)
 .post(isAdminOrStaff, createOrderByAdminOrStaff);

router.route('/manager/:orderId')
 .patch(isAdminOrStaff, updateOrderByAdminOrStaff);


/**
 * No Authorization
 */

router.post('/', isGuestOrAuthorized, createByUser);
router.get('/re-pay/:orderId', rePayOrder);
router.get('/:orderId', getOne);


export default router;
