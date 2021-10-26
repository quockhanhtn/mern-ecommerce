import express from 'express';
import { createDiscount, deleteDiscount, getDiscount, getDiscounts, hiddenDiscount, updateDiscount } from '../../controllers/discounts.controller.js';
import uploadUtils from '../../utils/upload-utils.js';

const router = express.Router();
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
const upload = uploadUtils.multerUpload('/discounts/', allowedMimes);


router.route('/')
  .get(getDiscounts)
  .post(
    upload.single('image'),
    uploadUtils.handleFilePath('image'),
    createDiscount
  );

/* identity is _id or slug */
router.route('/:identity')
  .get(getDiscount)
  .patch(
    upload.single('image'),
    uploadUtils.handleFilePath('image'),
    updateDiscount
  )
  .delete(deleteDiscount);

router.patch('/:identity/hide', hiddenDiscount);


export default router;
