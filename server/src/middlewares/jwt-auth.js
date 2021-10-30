import { verifyToken } from '../utils/jwt-utils.js';
import APIError from '../utils/APIError.js';

const decodeToken = (req) => {
  // Header 'Authorization: Bearer {access_token}'
  const token = req.headers?.authorization?.split(' ')[1] || '';
  console.log('token', token);
  if (!token) {
    throw new APIError({ message: 'No token provided', status: 401 });
  }
  const decoded = verifyToken(token);
  if (!decoded) {
    throw new APIError({ message: 'Invalid token', status: 401 });
  }

  return decoded;
};

export function isAuthenticated(req, _, next) {
  const decoded = decodeToken(req, next);
  console.log(decoded);
  req.user = decoded;
  next();
};

export function isAdmin(req, _, next) {
  const decoded = decodeToken(req);
  if (decoded.role !== 'ADMIN') {
    throw new APIError({ message: 'Unauthorized', status: 401 });
  }
  req.user = decoded;
  next();
};

export function isStaff(req, _, next) {
  const decoded = decodeToken(req);
  if (decoded.role !== 'STAFF') {
    throw new APIError({ message: 'Unauthorized', status: 401 });
  }
  req.user = decoded;
  next();
};


export function isCustomer(req, _, next) {
  const decoded = decodeToken(req);
  if (decoded.role !== 'CUSTOMER') {
    throw new APIError({ message: 'Unauthorized', status: 401 });
  }
  req.user = decoded;
  next();
};
