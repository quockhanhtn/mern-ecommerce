import express from 'express';
import {
  addProductToCartDB, getListProductOfUser, deleteProductInCartDB, increaseProductInCartDB, decreaseProductInCartDB
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
  )
  .delete(
    isAuthorized,
    deleteProductInCartDB
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
