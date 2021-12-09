import express from 'express';
import { createPaymentVnPay } from '../../controllers/payment.controller.js';

const router = express.Router();

router.route('/')
  .get(() => {
    console.log('xxxxx');
  });

router.route('/vn_pay')
  .post(createPaymentVnPay);

export default router;
