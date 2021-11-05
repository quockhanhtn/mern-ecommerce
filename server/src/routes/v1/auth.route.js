import express from 'express';
import Joi from 'joi';
import validateRequest from '../../middlewares/validate-request.js'
import { login, register, refreshToken, logout } from '../../controllers/auth.controller.js';
import uploadUtils from '../../utils/upload-utils.js';

//#region Define schema for request validation
const loginSchema = Joi.object().keys({
  username: Joi.string().required(),
  password: Joi.string().required()
});

const registerSchema = Joi.object().keys({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required()
});
//#endregion

const router = express.Router();
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
const upload = uploadUtils.multerUpload('/users/', allowedMimes);

router.route('/register').post(
  upload.single('avatar'),
  uploadUtils.handleFilePath('avatar'),
  register
);
router.route('/login').post(
  validateRequest(loginSchema),
  login
);
router.route('/refresh-token').post(refreshToken);
router.route('/logout').post(logout);

export default router;
