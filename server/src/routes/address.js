import express from 'express';
import { createAddress, deleteAddress, getAddress, getAddressList, hiddenAddress, updateAddress } from '../controllers/address.controller.js';
import multerUpload from '../utils/upload-utils.js';

const router = express.Router();
const allowedMimes = ['image/jpeg', 'image/jpeg', 'image/png', 'image/gif'];
const upload = multerUpload('/brands/', allowedMimes);


router.route('/')
  .get(getAddressList)
  .post(upload.single('image'), createAddress);

/* identity is _id or slug */
router.route('/:identity')
  .get(getAddress)
  .patch(updateAddress)
  .delete(deleteAddress);

router.patch('/:identity/hide', hiddenAddress);
export default router;