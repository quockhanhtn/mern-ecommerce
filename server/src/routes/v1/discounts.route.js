import express from 'express';
import { allowImageMineTypes } from '../../constants.js';
import { createDiscount, deleteDiscount, getDiscount, getDiscounts, hiddenDiscount, updateDiscount } from '../../controllers/discounts.controller.js';
import { isAdmin, isCustomer } from '../../middlewares/jwt-auth.js';
import { handleFilePath, multerUpload } from '../../utils/upload-utils.js';

const router = express.Router();
const upload = multerUpload('/discounts/', allowImageMineTypes);

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
    handleFilePath('image'),
    createDiscount
  );

/* identity is _id or slug */
router.route('/:identity')
  .get(getDiscount)
  .patch(
    isAdmin,
    upload.single('image'),
    handleFilePath('image'),
    updateDiscount
  )
  .delete(isAdmin, deleteDiscount);

router.patch('/:identity/hide', isAdmin, hiddenDiscount);


export default router;
