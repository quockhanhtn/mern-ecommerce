import express from 'express';
import {
  getAllOrders,
  createOrderByAdminOrStaff,
  updateOrderByAdminOrStaff
} from '../../controllers/orders.controller.js';
import { isAdminOrStaff } from '../../middlewares/jwt-auth.js';

const router = express.Router();

/**
 * Authorization
 * Get all              : admin or staff
 * Create, update       : admin or staff
 * Delete               : not allowed
 */



router.route('/')
  .get(isAdminOrStaff, getAllOrders)
  .post(isAdminOrStaff, createOrderByAdminOrStaff);

router.route('/:orderId')
  .patch(isAdminOrStaff, updateOrderByAdminOrStaff);

export default router;
