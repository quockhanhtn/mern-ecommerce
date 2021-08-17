import express from 'express';
import mongoose from 'mongoose';
import path from 'path';
import { fileURLToPath, parse as urlParse } from 'url';

import { logger } from './middlewares/logger.js';
import { cors } from './middlewares/cors.js';

import logging from './utils/logging.js';

const app = express();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// share uploads resource
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public/upload', express.static(path.join(__dirname, 'public', 'upload')));

//#region User middleware
app.use(logger);
app.use(express.urlencoded({ limit: '30mb', extended: false }));
app.use(express.json({ limit: '30mb' }));
app.use(cors);
//#endregion

//#region Routes which should handle requests
app.get('/', (req, res) => res.render("public/index"));
//#endregion


//#region Handle error
app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({ success: false, error: error });
});
//#endregion

//#region Config connection to MongoDb and listen app
let mongodb = {};
if (process.env.NODE_ENV === 'dev' || !process.env.MONGO_URI) {
  mongodb = {
    uri: 'mongodb://localhost:27017/ecommerce',
    host: 'local'
  };
} else {
  mongodb = {
    uri: process.env.MONGO_URI,
    host: urlParse(process.env.MONGO_URI.toString()).hostname
  };
}

mongoose.connect(mongodb.uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => logging.info('DB', 'Connected successfully to MongoDB at ' + mongodb.host))
  .catch(err => logging.info('DB', 'Connect to MongoDB failed', err));

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
//#endregion

export default app;