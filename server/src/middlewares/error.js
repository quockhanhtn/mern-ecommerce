import { ValidationError } from 'express-validation';
import httpStatus from 'http-status';
import APIError from '../utils/APIError.js';
//import { env } from '../../constants';

export default {
  converter,
  notFound,
  handler,
};


/**
 * Converts errors to APIError
 * @param {*} err - Error object
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} _ 
 */
function converter(err, req, res, _) {
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

  handler(convertedError, req, res);
}


/**
 * Handles 404 errors.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 */
function notFound(req, res) {
  const err = new APIError({
    message: 'Not found',
    status: httpStatus.NOT_FOUND,
  });
  handler(err, req, res);
}


/**
 * Handles errors
 * @param {*} err - Error object
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} _ 
 */
function handler(err, req, res, _) {
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
}
