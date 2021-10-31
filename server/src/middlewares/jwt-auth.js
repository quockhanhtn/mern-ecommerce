import { verifyToken } from '../utils/jwt-utils.js';
import resUtils from '../utils/res-utils.js';

const decodeToken = (req, role = null) => {
  // Header 'Authorization: Bearer {access_token}'
  const token = req.headers?.authorization?.split(' ')[1] || '';
  if (!token) {
    return { decoded: null, message: 'No token provided' };
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return { decoded: null, message: 'Invalid token' };
  }

  if (role && decoded.role !== role) {
    return { decoded: null, message: `Unauthorized, you need role ${role} to access` };
  }

  return { decoded: decoded, message: null };
};

export function isAuthenticated(req, res, next) {
  const { decoded, message } = decodeToken(req);
  if (decoded) {
    req.user = decoded;
    next();
  } else {
    resUtils.status401(res, message);
  }
};

export function isAdmin(req, res, next) {
  const { decoded, message } = decodeToken(req, 'ADMIN');
  if (decoded) {
    req.user = decoded;
    next();
  } else {
    resUtils.status401(res, message);
  }
};

export function isStaff(req, res, next) {
  const { decoded, message } = decodeToken(req, 'STAFF');
  if (decoded) {
    req.user = decoded;
    next();
  } else {
    resUtils.status401(res, message);
  }
};


export function isCustomer(req, res, next) {
  const { decoded, message } = decodeToken(req, 'CUSTOMER');
  if (decoded) {
    req.user = decoded;
    next();
  } else {
    resUtils.status401(res, message);
  }
};
