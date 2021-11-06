import jwt from 'jsonwebtoken';
import ApiError from './APIError.js';

const secretKey = process.env.JWT_SECRET;
const opts = {
  expiresIn: process.env.JWT_EXPIRES_IN
}

export const generateToken = (payload) => {
  const token = jwt.sign(payload, secretKey, opts);
  return token;
}

export const verifyToken = (token) => {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
};

/**
 * Middleware to verify token and set decoded payload to req.user
 * @param {*} req - Express request object
 * @param {*} res - Express response object
 * @param {*} next - Express next function 
 */
export const jwtMiddleware = (req, _, next) => {
  // Header names in Express are auto-converted to lowercase
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (!token) { return next(ApiError.simple('No token provided', 401)); }

  if (/Bearer\s([\w-]*\.[\w-]*\.[\w-]*$)/g.test(token)) {
    token = token.match(/Bearer\s([\w-]*\.[\w-]*\.[\w-]*$)/g)[0].split(' ')[1];
  } else {
    return next(ApiError.simple('Invalid token format. Format is Authorization: Bearer [token]', 400));
  }
  const decoded = verifyToken(token);
  if (!decoded) { return next(ApiError.simple('Invalid token', 401)); }
  req.user = decoded;
  next();
};
