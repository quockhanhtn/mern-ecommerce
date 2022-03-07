import express from 'express';
import {
  addProductToCartDB
} from '../../controllers/write-order.controller.js';
import { isAuthorized } from '../../middlewares/jwt-auth.js';

const router = express.Router();



router.route('/')
  .post(
    isAuthorized,
    addProductToCartDB
  );



export default router;
