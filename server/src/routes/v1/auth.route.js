import express from 'express';
import uploadUtils from '../../utils/upload-utils.js';
import { login, register, logout } from '../../controllers/auth.controller.js';

const router = express.Router();
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
const upload = uploadUtils.multerUpload('/brands/', allowedMimes);

router.route('/register').post(
  upload.single('image'),
  uploadUtils.handleFilePath('image'),
  register
);
router.route('/login').post(login);
router.route('/logout').post(logout);

export default router;
