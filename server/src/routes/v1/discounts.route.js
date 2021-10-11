import express from 'express';
import { createDiscount, deleteDiscount, getDiscount, getDiscounts, hiddenDiscount, updateDiscount } from '../../controllers/discounts.controller.js';
import multerUpload from '../../utils/upload-utils.js';
import { singleImageHandler } from '../../middlewares/image-handler.js';

const router = express.Router();
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
const upload = multerUpload('/discounts/', allowedMimes);


router.route('/')
  .get(getDiscounts)
  .post(
    upload.single('image'),
    singleImageHandler('image', 'discounts'),
    createDiscount);

/* identity is _id or slug */
router.route('/:identity')
  .get(getDiscount)
  .patch(
    upload.single('image'),
    singleImageHandler('image', 'discounts'),
    updateDiscount)
  .delete(deleteDiscount);

router.patch('/:identity/hide', hiddenDiscount);
export default router;