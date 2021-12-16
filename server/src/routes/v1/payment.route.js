import express from 'express';
import { getVnpayResult } from '../../controllers/payment.controller.js';

const router = express.Router();

router.route('/vnpay/callback').get(getVnpayResult);

export default router;
