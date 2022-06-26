import { Router } from 'express';
import { allowImageMineTypes } from '../../constants.js';
import { createDiscount, deleteDiscount, getDiscount, checkExistedCode, getDiscounts, hiddenDiscount, updateDiscount, estDiscountAmt } from '../../controllers/discounts.controller.js';
import { isAdmin } from '../../middlewares/jwt-auth.js';
import UploadUtils from '../../utils/UploadUtils.js';

const router = Router();
const upload = UploadUtils.multerUpload('/discounts/', allowImageMineTypes);

/**
 * Authorization
 * Get one                      : any user
 * Get all                      : customer
 * Create, update, hide, delete : admin or staff
 */

router.route('/')
  .get(getDiscounts)
  .post(
    isAdmin,
    upload.single('image'),
    UploadUtils.handleFilePath('image'),
    createDiscount
  );

router.get('/isExistedCode/:code', isAdmin, checkExistedCode);
router.get('/estAmount', estDiscountAmt);

/* identity is _id or slug */
router.route('/:identity')
  .get(getDiscount)
  .patch(
    isAdmin,
    upload.single('image'),
    UploadUtils.handleFilePath('image'),
    updateDiscount
  )
  .delete(isAdmin, deleteDiscount);

router.patch('/:identity/hide', isAdmin, hiddenDiscount);


export default router;
