import express from 'express';
import { paymentVnPayCallBack } from '../../controllers/payment.controller.js';

const router = express.Router();

router.route('/vnpay/callback')
  .get(paymentVnPayCallBack);

export default router;
