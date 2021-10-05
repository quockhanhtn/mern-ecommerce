import express from 'express';
import {
  createCategory, deleteCategory, getCategories,
  getCategory, hiddenCategory, updateCategory
} from '../../controllers/categories.controller.js';
import multerUpload from '../../utils/upload-utils.js';
import { singleImageHandler } from '../../middlewares/image-handler.js';

const router = express.Router();
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
const upload = multerUpload('/categories/', allowedMimes);


router.route('/')
  .get(getCategories)
  .post(
    upload.single('image'),
    singleImageHandler('image', 'categories'),
    createCategory
  );

/* identity is _id or slug */
router.route('/:identity')
  .get(getCategory)
  .patch(
    upload.single('image'),
    singleImageHandler('image', 'categories'),
    updateCategory
  )
  .delete(deleteCategory);

router.patch('/:identity/hide', hiddenCategory);
export default router;