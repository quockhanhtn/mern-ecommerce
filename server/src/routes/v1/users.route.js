import express from 'express';
import { allowImageMineTypes } from '../../constants.js';
import { addressUserAdd, addressUserDelete, addressUserUpdate, createUser, getInfo, getUsers, updateInfo } from '../../controllers/users.controller.js';
import { isAuthorized } from '../../middlewares/jwt-auth.js';
import { handleFilePath, multerUpload } from '../../utils/upload-utils.js';

const router = express.Router();
const upload = multerUpload('/users/', allowImageMineTypes);


router.route('/')
  .get(getUsers)
  .post(
    upload.single('image'),
    handleFilePath('image'),
    createUser
  );

export default router;
