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
import multerUpload from '../../utils/upload-utils.js';
import { singleImageHandler } from '../../middlewares/image-handler.js';

const router = express.Router();
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
const upload = multerUpload('/products/', allowedMimes, 21); // 21 = 1 thumbnail + 20 images
const uploadFields = [{ name: 'thumbnail', maxCount: 1 }, { name: 'pictures', maxCount: 20 }];


router.get('/', getAllProducts);
router.get('/:identity', getProductById);

router.post('/',
  upload.fields(uploadFields),
  createProduct
);
router.patch('/:identity', updateProduct);
router.delete('/:identity', deleteProduct);
router.patch('/:identity/rate', rateProduct);


router.post('/:identity/variants',
  upload.fields(uploadFields),
  singleImageHandler('thumbnail', 'variants'),
  addProductVariants
);
router.patch('/:identity/variants/:sku',
  upload.fields(uploadFields),
  singleImageHandler('thumbnail', 'variants'),
  updateProductVariants
);
router.delete('/:identity/variants/:sku', deleteProductVariants);

export default router;