import express from 'express';

// import all the routes here
import categoryRoutes from './categories.route.js';
import brandRoutes from './brands.route.js';
import productRoutes from './products.route.js';
import commentRoutes from './comments.route.js';
import userRoutes from './users.route.js';
import discountRoutes from './discounts.route.js';


const router = express.Router();

/**
 * GET v1/status
 */
router.get('/status', (req, res) => {
	res.json({
		message: 'OK',
		timestamp: new Date().toISOString(),
		IP: req.ip,
		URL: req.originalUrl,
	});
});

router.use('/categories', categoryRoutes);
router.use('/brands', brandRoutes);
router.use('/products', productRoutes);
router.use('/comments', commentRoutes);
router.use('/users', userRoutes);
router.use('/discounts', discountRoutes);


export default router;
