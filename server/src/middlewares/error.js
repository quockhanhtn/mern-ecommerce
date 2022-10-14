import { ValidationError } from 'express-validation';
import httpStatus from 'http-status';
import ApiErrorUtils from '../utils/ApiErrorUtils.js';
import UploadUtils from '../utils/UploadUtils.js';
import SlackUtils from '../utils/SlackUtils.js';

export default {
  converter,
  notFound,
  handler,
};


/**
 * Converts errors to ApiErrorUtils
 * @param {*} err - Error object
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} _ 
 */
function converter() {
  return (err, req, res, next) => {
    let convertedError = err;

    if (err instanceof ValidationError) {
      convertedError = new ApiErrorUtils({
        message: 'Validation Error',
        errors: err.errors,
        status: err.status || httpStatus.INTERNAL_SERVER_ERROR,
        stack: err.stack,
      });
    } else if (!(err instanceof ApiErrorUtils)) {
      convertedError = new ApiErrorUtils({
        message: err.message,
        status: err.status || httpStatus.INTERNAL_SERVER_ERROR,
        stack: err.stack,
      });
    }

    next(convertedError, req, res, next);
  };
}


/**
 * Handles 404 errors.
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 */
function notFound() {
  return (req, res, next) => {
    const err = new ApiErrorUtils({
      message: 'Not found',
      status: httpStatus.NOT_FOUND,
    });
    next(err, req, res, next);
  };
}


/**
 * Handles errors
 * @param {*} err - Error object
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} _ 
 */
function handler() {
  return (err, req, res, _) => {
    const response = {
      code: err.status || httpStatus.INTERNAL_SERVER_ERROR,
      message: err.message || httpStatus[err.status],
      errors: err.errors,
      stack: err.stack,
      timestamp: new Date().toISOString(),
      ip: req.ipv4,
      url: req.originalUrl,
    };

    let mgs = `❌ A Request from ip: *${req.ipv4}*, path: *${req.originalUrl}* has error: \`${response.message}\``;
    mgs += `\n\`\`\`${JSON.stringify(response, null, 2)}\`\`\``;

    SlackUtils.sendMessage(mgs, 'C03FMRF45K7');

    if (process.env.NODE_ENV !== 'dev') {
      delete response.stack;
    } else {
      console.log(response);
    }
    // clear uploaded files
    UploadUtils.clearUploadFile(req);

    res.set('Content-Type', 'application/json')
    res.status(response.code);
    res.json(response);
    res.end();
  };
}
