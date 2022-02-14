import express from 'express';
// import { singleImageHandler } from '../../middlewares/image-handler.js';
import { allowImageMineTypes } from '../../constants.js';
import {
  createCategory, deleteCategory, getCategories,
  getCategory, hiddenCategory, updateCategory
} from '../../controllers/categories.controller.js';
import { isAdmin, isAdminOrStaff } from '../../middlewares/jwt-auth.js';
import { handleFilePath, multerUpload } from '../../utils/upload-utils.js';

const router = express.Router();
const upload = multerUpload('/categories/', allowImageMineTypes);

/**
 * Authorization
 * Get all, get one     : any user
 * Create, update, hide : admin or staff
 * Delete               : only admin
 */

router.route('/')
  .get(getCategories)
  .post(
    isAdminOrStaff,
    upload.single('image'),
    handleFilePath('image'),
    // singleImageHandler('image', 'categories'),
    createCategory
  );

/* identity is _id or slug */
router.route('/:identity')
  .get(getCategory)
  .patch(
    isAdminOrStaff,
    upload.single('image'),
    handleFilePath('image'),
    // singleImageHandler('image', 'categories'),
    updateCategory
  )
  .delete(isAdmin, deleteCategory);

router.patch('/:identity/hide', isAdminOrStaff, hiddenCategory);


export default router;
