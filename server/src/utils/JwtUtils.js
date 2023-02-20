import jwt from 'jsonwebtoken';
import configs from '../configs.js';
import ApiErrorUtils from './ApiErrorUtils.js';

const secretKey = configs.jwtSecret;
const defaultExpiresIn = configs.jwtExpiresIn;

class JwtUtils {
  /**
   * Generate a JWT token
   * @param {*} payload - token payload
   * @returns jwt token
   */
  static generateToken(payload, expiresIn = defaultExpiresIn) {
    const token = jwt.sign(payload, secretKey, { expiresIn });
    return token;
  }

  static verifyToken(token) {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  }

  /**
   * Middleware to verify token and set decoded payload to req.user
   * @param {*} req - Express request object
   * @param {*} res - Express response object
   * @param {*} next - Express next function 
   */
  static jwtMiddleware(req, _, next) {
    // Header names in Express are auto-converted to lowercase
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) { return next(ApiErrorUtils.simple('No token provided', 401)); }

    if (/Bearer\s([\w-]*\.[\w-]*\.[\w-]*$)/g.test(token)) {
      token = token.match(/Bearer\s([\w-]*\.[\w-]*\.[\w-]*$)/g)[0].split(' ')[1];
    } else {
      return next(ApiErrorUtils.simple('Invalid token format. Format is Authorization: Bearer [token]', 400));
    }
    const decoded = JwtUtils.verifyToken(token);
    if (!decoded) { return next(ApiErrorUtils.simple('Invalid token', 401)); }
    req.user = decoded;
    next();
  }
}

export default JwtUtils;
