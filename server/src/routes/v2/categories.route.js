import { Router } from 'express';
// import { singleImageHandler } from '../../middlewares/image-handler.js';
import { allowImageMineTypes } from '../../constants.js';
import {
  createCategory, deleteCategory, getCategories,
  getCategory, hiddenCategory, updateCategory
} from '../../controllers/categories.controller.js';
import { isAdmin, isAdminOrStaff } from '../../middlewares/jwt-auth.js';
import  UploadUtils from '../../utils/UploadUtils.js';

const router = Router();
const upload = UploadUtils.multerUpload('/categories/', allowImageMineTypes);

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
    UploadUtils.handleFilePath('image'),
    // singleImageHandler('image', 'categories'),
    createCategory
  );

/* identity is _id or slug */
router.route('/:identity')
  .get(getCategory)
  .patch(
    isAdminOrStaff,
    upload.single('image'),
    UploadUtils.handleFilePath('image'),
    // singleImageHandler('image', 'categories'),
    updateCategory
  )
  .delete(isAdmin, deleteCategory);

router.patch('/:identity/hide', isAdminOrStaff, hiddenCategory);


export default router;
