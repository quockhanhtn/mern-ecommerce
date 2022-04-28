import { Router } from 'express';
import {
  getOne,
  getList,
  getByUser,
  createByUser,
  updateByUser,
  rePayOrder,
  getAllOrders,
  createOrderByAdminOrStaff,
  updateOrderByAdminOrStaff
} from '../../controllers/orders.controller.js';
import { isGuestOrAuthorized, isAdminOrStaff } from '../../middlewares/jwt-auth.js';

const router = Router();

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

router.get('/', isGuestOrAuthorized, getList);
router.post('/', isGuestOrAuthorized, createByUser);
router.get('/re-pay/:orderId', isGuestOrAuthorized, rePayOrder);
router.get('/:orderId', isGuestOrAuthorized, getOne);


export default router;
