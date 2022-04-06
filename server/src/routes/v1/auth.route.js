import { Router } from 'express';
import Joi from 'joi';
import { allowImageMineTypes } from '../../constants.js';
import * as authController from '../../controllers/auth.controller.js';
import validateRequest from '../../middlewares/validate-request.js';
import UploadUtils from '../../utils/UploadUtils.js';

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

const router = Router();
const upload = UploadUtils.multerUpload('/users/', allowImageMineTypes);

router.route('/register').post(
  upload.single('avatar'),
  UploadUtils.handleFilePath('avatar'),
  authController.register
);
router.route('/login').post(
  validateRequest(loginSchema),
  authController.login
);
router.route('/refresh-token').post(authController.refreshToken);
router.route('/logout').post(authController.logout);

// Google OAuth
router.route('/google').post(authController.googleOAuth);

export default router;
