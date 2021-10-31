import express from 'express';
import { createDiscount, deleteDiscount, getDiscount, getDiscounts, hiddenDiscount, updateDiscount } from '../../controllers/discounts.controller.js';
import { isAdmin, isCustomer } from '../../middlewares/jwt-auth.js';
import uploadUtils from '../../utils/upload-utils.js';

const router = express.Router();
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
const upload = uploadUtils.multerUpload('/discounts/', allowedMimes);

/**
 * Authorization
 * Get one                      : any user
 * Get all                      : customer
 * Create, update, hide, delete : admin or staff
 */

router.route('/')
  .get(isCustomer, getDiscounts)
  .post(
    isAdmin,
    upload.single('image'),
    uploadUtils.handleFilePath('image'),
    createDiscount
  );

/* identity is _id or slug */
router.route('/:identity')
  .get(getDiscount)
  .patch(
    isAdmin,
    upload.single('image'),
    uploadUtils.handleFilePath('image'),
    updateDiscount
  )
  .delete(isAdmin, deleteDiscount);

router.patch('/:identity/hide', isAdmin, hiddenDiscount);


export default router;
