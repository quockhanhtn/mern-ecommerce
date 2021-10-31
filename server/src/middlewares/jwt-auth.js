import constants from '../constants.js';
import { verifyToken } from '../utils/jwt-utils.js';
import resUtils from '../utils/res-utils.js';

const roleAdmin = constants.USER.ROLE.ADMIN;
const roleStaff = constants.USER.ROLE.STAFF;
const roleAdminOrStaff = [roleAdmin, roleStaff];
const roleCustomer = constants.USER.ROLE.CUSTOMER;

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

  if (!role) {
    return { decoded, message: null };
  }

  if (role && typeof role === 'string') {
    if (decoded.role !== role) {
      return { decoded: null, message: `Unauthorized, you need role ${role} to access` };
    }
  } else if (role && Array.isArray(role)) {
    if (!role.includes(decoded.role)) {
      return { decoded: null, message: `Unauthorized, you need role ${role} to access` };
    }
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
  const { decoded, message } = decodeToken(req, roleAdmin);
  if (decoded) {
    req.user = decoded;
    next();
  } else {
    resUtils.status401(res, message);
  }
};

export function isAdminOrStaff(req, res, next) {
  const { decoded, message } = decodeToken(req, roleAdminOrStaff);
  if (decoded) {
    req.user = decoded;
    next();
  } else {
    resUtils.status401(res, message);
  }
};

export function isStaff(req, res, next) {
  const { decoded, message } = decodeToken(req, roleStaff);
  if (decoded) {
    req.user = decoded;
    next();
  } else {
    resUtils.status401(res, message);
  }
};


export function isCustomer(req, res, next) {
  const { decoded, message } = decodeToken(req, roleCustomer);
  if (decoded) {
    req.user = decoded;
    next();
  } else {
    resUtils.status401(res, message);
  }
};
