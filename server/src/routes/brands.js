import express from 'express';
import {
  createBrand, getBrands, getBrand, updateBrand, hiddenBrand, deleteBrand
} from '../controllers/brands.controller.js';
import multerUpload from '../utils/upload-utils.js';

const router = express.Router();
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif'];
const upload = multerUpload('/brands/', allowedMimes);


router.route('/')
  .get(getBrands)
  .post(upload.single('image'), createBrand);

/* identity is _id or slug */
router.route('/:identity')
  .get(getBrand)
  .patch(upload.single('image'), updateBrand)
  .delete(deleteBrand);

router.patch('/:identity/hide', hiddenBrand);
export default router;