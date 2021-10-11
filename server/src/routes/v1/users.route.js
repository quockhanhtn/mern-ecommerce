import express from 'express';
import multerUpload from '../../utils/upload-utils.js';
import { addressUserAdd, addressUserDelete, addressUserUpdate, createUser, getUser, getUsers, updateUser } from '../../controllers/users.controller.js';
import { singleImageHandler } from '../../middlewares/image-handler.js';

const router = express.Router();
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif', 'image/svg+xml'];
const upload = multerUpload('/users/', allowedMimes);


router.route('/')
  .get(getUsers)
  .post(
    upload.single('image'),
    singleImageHandler('image', 'users'),
    createUser);

/* identity is _id or slug */
router.route('/:identity')
  .get(getUser)
  .patch(
    upload.single('image'),
    singleImageHandler('image', 'users'),
    updateUser);

router.route('/:identity/address')
  .post(addressUserAdd);

router.route('/:identity/address/:identityAddress')
  .delete(addressUserDelete)
  .patch(addressUserUpdate);

export default router;