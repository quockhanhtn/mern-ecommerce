import express from 'express';
import {
  createBrand, getBrands, getBrand, updateBrand, hiddenBrand, deleteBrand
} from '../../controllers/brands.controller.js';
import { isAdmin, isAdminOrStaff } from '../../middlewares/jwt-auth.js';
import uploadUtils, { handleFilePath } from '../../utils/upload-utils.js';

const router = express.Router();
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
const upload = uploadUtils.multerUpload('/brands/', allowedMimes);

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
    handleFilePath('image'),
    createBrand
  );

/* identity is _id or slug */
router.route('/:identity')
  .get(getBrand)
  .patch(
    isAdminOrStaff,
    upload.single('image'),
    handleFilePath('image'),
    updateBrand
  )
  .delete(isAdmin, deleteBrand);

router.patch('/:identity/hide', hiddenBrand);


export default router;
