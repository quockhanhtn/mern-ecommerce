import httpStatus from 'http-status';
import { ValidationError } from 'express-validation';
import APIError from '../utils/APIError.js';
//import { env } from '../../constants';


const handler = (err, req, res, next) => {
  const response = {
    code: err.status || httpStatus.INTERNAL_SERVER_ERROR,
    message: err.message || httpStatus[err.status],
    errors: err.errors,
    stack: err.stack,
    timestamp: new Date().toISOString(),
    IP: req.ip,
    URL: req.originalUrl,
  };

  // if (env !== 'development') {
  //   delete response.stack;
  // }

  res.status(response.code);
  res.json(response);
  res.end();
};


const converter = (err, req, res, next) => {
  let convertedError = err;

  if (err instanceof ValidationError) {
    convertedError = new APIError({
      message: 'Validation Error',
      errors: err.errors,
      status: err.status || httpStatus.INTERNAL_SERVER_ERROR,
      stack: err.stack,
    });
  } else if (!(err instanceof APIError)) {
    convertedError = new APIError({
      message: err.message,
      status: err.status || httpStatus.INTERNAL_SERVER_ERROR,
      stack: err.stack,
    });
  }

  return handler(convertedError, req, res);
};

const notFound = (req, res) => {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  return handler(err, req, res);
};

export default {
  handler,
  converter,
  notFound,
};
