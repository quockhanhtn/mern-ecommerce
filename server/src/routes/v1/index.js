import express from 'express';

// import all the routes here
import authRoutes from './auth.route.js';
import meRoutes from './me.route.js';
import userRoutes from './users.route.js';

import categoryRoutes from './categories.route.js';
import brandRoutes from './brands.route.js';
import productRoutes from './products.route.js';
import commentRoutes from './comments.route.js';
import discountRoutes from './discounts.route.js';


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
router.use('/me', meRoutes);
router.use('/users', userRoutes);
router.use('/categories', categoryRoutes);
router.use('/brands', brandRoutes);
router.use('/products', productRoutes);
router.use('/comments', commentRoutes);
router.use('/discounts', discountRoutes);


export default router;
