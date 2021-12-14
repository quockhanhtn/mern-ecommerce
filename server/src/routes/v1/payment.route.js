import express from 'express';
import { payByVnpay } from '../../controllers/payment.controller.js';

const router = express.Router();

router.route('/vnpay/callback').get(payByVnpay);

export default router;
