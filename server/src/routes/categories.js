import express from 'express';
import {
  createCategory, deleteCategory, getCategories,
  getCategory, hiddenCategory, updateCategory
} from '../controllers/categories.controller.js';
import multerUpload from '../utils/upload-utils.js';

const router = express.Router();
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif'];
const upload = multerUpload('/categories/', allowedMimes);


router.route('/')
  .get(getCategories)
  .post(upload.single('image'), createCategory);

/* identity is _id or slug */
router.route('/:identity')
  .get(getCategory)
  .patch(upload.single('image'), updateCategory)
  .delete(deleteCategory);

router.patch('/:identity/hide', hiddenCategory);
export default router;