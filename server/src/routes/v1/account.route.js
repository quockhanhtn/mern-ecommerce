import express from 'express';
import { allowImageMineTypes } from '../../constants.js';

import {
  getInfo,
  updateInfo,
  getAddresses,
  addAddress,
  updateAddress,
  deleteAddress
} from '../../controllers/account.controller.js';
import {
  getByUser,
  createByUser,
  updateByUser,
} from '../../controllers/orders.controller.js';

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

// Start defining routes for addresses
router.route('/addresses')
  .get(isAuthorized, getAddresses)
  .post(isAuthorized, addAddress);

router.route('/addresses/:addressId')
  .patch(isAuthorized, updateAddress)
  .delete(isAuthorized, deleteAddress);
// End defining routes for addresses

// Start defining routes for orders
router.route('/orders')
  .get(isAuthorized, getByUser)
  .post(isAuthorized, createByUser);
router.route('/orders/:orderId')
  .patch(isAuthorized, updateByUser);
// End defining routes for orders


export default router;
