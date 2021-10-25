import express from 'express';
import {
  createBrand, getBrands, getBrand, updateBrand, hiddenBrand, deleteBrand
} from '../../controllers/brands.controller.js';
import uploadUtils, { handleFilePath } from '../../utils/upload-utils.js';

const router = express.Router();
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
const upload = uploadUtils.multerUpload('/brands/', allowedMimes);


router.route('/')
  .get(getBrands)
  .post(
    upload.single('image'),
    handleFilePath('image'),
    createBrand
  );

/* identity is _id or slug */
router.route('/:identity')
  .get(getBrand)
  .patch(
    upload.single('image'),
    handleFilePath('image'),
    updateBrand
  )
  .delete(deleteBrand);

router.patch('/:identity/hide', hiddenBrand);


export default router;
