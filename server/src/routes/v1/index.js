import express from 'express';

// import all the routes here
import authRoutes from './auth.route.js';
import accountRoutes from './account.route.js';
import userRoutes from './users.route.js';

import categoryRoutes from './categories.route.js';
import brandRoutes from './brands.route.js';
import productRoutes from './products.route.js';
import commentRoutes from './comments.route.js';
import discountRoutes from './discounts.route.js';
import orderRoutes from './order.route.js';
import paymentRoutes from './payment.route.js';
import writeOrderRoutes from "../v2/write-order.route.js";


const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => {
	res.json({
		success: true,
		timestamp: new Date().toISOString(),
		IP: req.ip,
		URL: req.originalUrl,
	});
});

router.use('/auth', authRoutes);
router.use('/account', accountRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/brands', brandRoutes);
router.use('/products', productRoutes);
router.use('/comments', commentRoutes);
router.use('/discounts', discountRoutes);
router.use('/orders', orderRoutes);
router.use('/payment', paymentRoutes);
router.use('/write-order', writeOrderRoutes);

export default router;
