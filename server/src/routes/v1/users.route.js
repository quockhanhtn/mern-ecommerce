import express from 'express';
import uploadUtils from '../../utils/upload-utils.js';
import { addressUserAdd, addressUserDelete, addressUserUpdate, createUser, getInfo, getUsers, updateInfo } from '../../controllers/users.controller.js';
import { isAuthenticated } from '../../middlewares/jwt-auth.js';

const router = express.Router();
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
const upload = uploadUtils.multerUpload('/users/', allowedMimes);


router.route('/')
  .get(getUsers)
  .post(
    upload.single('image'),
    uploadUtils.handleFilePath('image'),
    createUser
  );

router.route('/:identity/address')
  .post(addressUserAdd);

router.route('/:identity/address/:identityAddress')
  .delete(addressUserDelete)
  .patch(addressUserUpdate);


router.route('/me')
  .get(isAuthenticated, getInfo)
  .patch(
    isAuthenticated,
    upload.single('avatar'),
    uploadUtils.handleFilePath('avatar'),
    updateInfo
  );

router.route('/me/addresses')
  .get(isAuthenticated, getInfo)
  .patch(
    isAuthenticated,
    upload.single('avatar'),
    uploadUtils.handleFilePath('avatar'),
    updateInfo
  );


export default router;
