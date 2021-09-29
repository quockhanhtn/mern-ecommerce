import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { cors } from './middlewares/cors.js';
import { logger } from './middlewares/logger.js';
import error from './middlewares/error.js'
import logging from './utils/logging.js';

import routesV1 from './routes/v1/index.js';

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
app.get('/', (req, res) => res.render("public/index")); // home page
app.use('/api/v1', routesV1);                           // api v1 routes

// Error handling
app.use(error.converter);   // if error is not an instanceOf APIError, convert it.
app.use(error.notFound);    // catch 404 and forward to error handler
app.use(error.handler);     // error handler, send stacktrace only during development


//Config connection to MongoDb and listen app
mongoose.connect(process.env.MONGO_URI)
  .then(() => logging.info('DATABASE', `Connected successfully to MongoDB`))
  .catch(err => logging.info('DATABASE', 'Connect to MongoDB failed', err));


export default app;