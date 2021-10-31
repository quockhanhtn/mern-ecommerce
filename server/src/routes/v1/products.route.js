import express from 'express';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  rateProduct,
  addProductVariants,
  updateProductVariants,
  deleteProductVariants
} from '../../controllers/products.controller.js';
import { isAdmin, isAdminOrStaff } from '../../middlewares/jwt-auth.js';
import uploadUtils from '../../utils/upload-utils.js';

const router = express.Router();
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
const upload = uploadUtils.multerUpload('/products/', allowedMimes, 21); // 21 = 1 thumbnail + 20 images
const uploadFields = [{ name: 'thumbnail', maxCount: 1 }, { name: 'pictures', maxCount: 20 }];

/**
 * Authorization
 * Get all, get one, rate : any user
 * Create, update, hide   : admin or staff
 * Delete                 : only admin
 */

router.get('/', getAllProducts);
router.get('/:identity', getProductById);

router.post('/',
  isAdminOrStaff,
  upload.fields(uploadFields),
  uploadUtils.handleFilePath(uploadFields),
  createProduct
);
router.patch('/:identity', isAdminOrStaff, updateProduct);
router.delete('/:identity', isAdmin, deleteProduct);
router.patch('/:identity/rate', rateProduct);

router.post('/:identity/variants',
  isAdminOrStaff,
  upload.fields(uploadFields),
  uploadUtils.handleFilePath(uploadFields),
  addProductVariants
);
router.patch('/:identity/variants/:sku',
  isAdminOrStaff,
  upload.fields(uploadFields),
  uploadUtils.handleFilePath(uploadFields),
  updateProductVariants
);
router.delete('/:identity/variants/:sku', isAdmin, deleteProductVariants);


export default router;
