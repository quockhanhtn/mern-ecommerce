import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { cors } from './middlewares/cors.js';
import { logger } from './middlewares/logger.js';
import logging from './utils/logging.js';

import categoryRoutes from './routes/categories.js';
import brandRoutes from './routes/brands.js';
import productRoutes from './routes/products.js';
import userRoutes from './routes/users.js';
import discountRoutes from './routes/discounts.js';


const app = express();
const __dirname = process.cwd();


// share uploads resource
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/uploads', express.static(path.join(__dirname, 'public', 'uploads')));


// User middleware
app.use(logger);
app.use(express.urlencoded({ limit: '30mb', extended: false }));
app.use(express.json({ limit: '30mb' }));
app.use(cors);


// Routes which should handle requests
app.get('/', (req, res) => res.render("public/index"));
app.use('/api/categories', categoryRoutes);
app.use('/api/brands', brandRoutes);
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/discounts', discountRoutes);


// Handle error
app.use((req, res, next) => {
  const error = new Error('Not found');
  next({ ...error, status: 404 });
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ success: false, error: error });
});


//Config connection to MongoDb and listen app
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logging.info('DATABASE', `Connected successfully to MongoDB`))
  .catch(err => logging.info('DATABASE', 'Connect to MongoDB failed', err));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

export default app;