import express from 'express';
import { allowImageMineTypes } from '../../constants.js';
import { getInfo, updateInfo } from '../../controllers/me.controller.js';
import { isAuthorized } from '../../middlewares/jwt-auth.js';
import { handleFilePath, multerUpload } from '../../utils/upload-utils.js';

const router = express.Router();
const upload = multerUpload('/users/', allowImageMineTypes);

router.route('/')
  .get(isAuthorized, getInfo)
  .patch(
    isAuthorized,
    upload.single('avatar'),
    handleFilePath('avatar'),
    updateInfo
  );

router.route('/addresses')
  .get(isAuthorized, getInfo)
  .patch(
    isAuthorized,
    upload.single('avatar'),
    handleFilePath('avatar'),
    updateInfo
  );


export default router;
