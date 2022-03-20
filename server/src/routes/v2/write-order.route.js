import express from 'express';
import {
  addProductToCartDB,
  getListProductOfUser,
  deleteProductInCartDB,
  increaseProductInCartDB,
  decreaseProductInCartDB,
  cleanProductInCartDB
} from '../../controllers/write-order.controller.js';
import { isAuthorized } from '../../middlewares/jwt-auth.js';

const router = express.Router();



router.route('/')
  .get(
    isAuthorized,
    getListProductOfUser
  )
  .post(
    isAuthorized,
    addProductToCartDB
  );

router.route('/delete')
  .post(
    isAuthorized,
    deleteProductInCartDB
  );

router.route('/delete-all')
  .delete(
    isAuthorized,
    cleanProductInCartDB
  );

router.route('/increase')
  .patch(
    isAuthorized,
    increaseProductInCartDB
  );

router.route('/decrease')
  .patch(
    isAuthorized,
    decreaseProductInCartDB
  );



export default router;
