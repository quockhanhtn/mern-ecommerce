import { Router } from 'express';
import { allowImageMineTypes } from '../../constants.js';
import {
  createBrand, deleteBrand, getBrand, getBrands, hiddenBrand, updateBrand
} from '../../controllers/brands.controller.js';
import { isAdmin, isAdminOrStaff } from '../../middlewares/jwt-auth.js';
import  UploadUtils from '../../utils/UploadUtils.js';

const router = Router();
const upload = UploadUtils.multerUpload('/brands/', allowImageMineTypes);

/**
 * Authorization
 * Get all, get one     : any user
 * Create, update, hide : admin or staff
 * Delete               : only admin
 */

router.route('/')
  .get(getBrands)
  .post(
    isAdminOrStaff,
    upload.single('image'),
    UploadUtils.handleFilePath('image'),
    createBrand
  );

/* identity is _id or slug */
router.route('/:identity')
  .get(getBrand)
  .patch(
    isAdminOrStaff,
    upload.single('image'),
    UploadUtils.handleFilePath('image'),
    updateBrand
  )
  .delete(isAdmin, deleteBrand);

router.patch('/:identity/hide', hiddenBrand);


export default router;
