import express from 'express';
import { createPaymentVnPay, paymentVnPayCallBack } from '../../controllers/payment.controller.js';

const router = express.Router();

router.route('/')
  .get(() => {
    console.log('xxxxx');
  });

router.route('/vn_pay')
  .post(createPaymentVnPay);

router.route('/vn_pay/callback')
  .get(paymentVnPayCallBack);


export default router;
