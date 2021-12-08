import express from 'express';
import { createPaymentVnPay } from '../../controllers/payment.vnpay.controller.js';

const router = express.Router();

router.route('/')
  .get(() => {
    console.log('xxxxx');
  });

router.route('/vnpay/create')
  .post(createPaymentVnPay);

export default router;
