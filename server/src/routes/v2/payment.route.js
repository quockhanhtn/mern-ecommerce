import { Router } from 'express';
import { getVnpayResult } from '../../controllers/payment.controller.js';

const router = Router();

router.route('/vnpay/callback').get(getVnpayResult);

export default router;
