//import cookieParser from 'cookie-parser';
import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
// import cors from 'cors';

import cors from './middlewares/cors.js';

import error from './middlewares/error.js';
import logger from './middlewares/logger.js';

import routesV1 from './routes/v1/index.js';
import routesV2 from './routes/v2/index.js';

import LogUtils from './utils/LogUtils.js';
import configs from './configs.js';

//------------------------------------------------------------------------------

const app = express();
const __dirname = process.cwd();


// share uploads resource
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/uploads', express.static(path.join(__dirname, 'public', 'uploads')));
app.use('/public/logs', express.static(path.join(__dirname, 'public', 'logs')));

app.get('/favicon.ico', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'favicon.ico'));
});


// User middleware
app.use(cors)
// app.use(cookieParser());
// app.use(cors({
//   // origin: process.env.ALLOW_ORIGIN?.split(',') || '*',
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   preflightContinue: false,
//   optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
//   credentials: true,
//   exposedHeaders: ["set-cookie"],
// }));

app.use((req, _, next) => {
  // This middleware take care of the origin when the origin is undefined.
  // origin is undefined when request is local
  req.headers.origin = req.headers.origin || req.headers.host;
  if (!req.headers.origin.startsWith('http')) {
    req.headers.origin = req.protocol + '://' + req.headers.origin;
  }

  req.ipv4 = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
  next();
});
app.use(logger);
app.use(express.urlencoded({ limit: '30mb', extended: false }));
app.use(express.json({ limit: '30mb' }));


// Routes which should handle requests
app.get('/', (_, res) => res.render("public/index")); // home page
app.use('/api/v1', routesV1);                           // api v1 routes
app.use('/api/v2', routesV2);                           // api v2 routes


// Error handling
app.use(error.converter);   // if error is not an instanceOf APIError, convert it.
app.use(error.notFound);    // catch 404 and forward to error handler
app.use(error.handler);     // error handler, send stacktrace only during development


//Config connection to MongoDb and listen app
mongoose.connect(configs.mongoUri)
  .then(() => LogUtils.info('DATABASE', `Connected successfully to MongoDB`))
  .catch(err => LogUtils.info('DATABASE', 'Connect to MongoDB failed', err));


export default app;
