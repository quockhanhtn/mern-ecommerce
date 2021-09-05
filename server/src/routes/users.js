import express from 'express';
import { addressUserAdd, addressUserDelete, addressUserUpdate, createUser, getUser, getUsers, updateUser } from '../controllers/users.controller.js';
import multerUpload from '../utils/upload-utils.js';

const router = express.Router();
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif'];
const upload = multerUpload('/users/', allowedMimes);


router.route('/')
  .get(getUsers)
  .post(upload.single('image'), createUser);

/* identity is _id or slug */
router.route('/:identity')
  .get(getUser)
  .patch(upload.single('image'), updateUser);

router.route('/:identity/address')
  .post(addressUserAdd);

router.route('/:identity/address/:identityAddress')
  .delete(addressUserDelete)
  .patch(addressUserUpdate);


// router.patch('/:identity/hide', hiddenBrand);
export default router;