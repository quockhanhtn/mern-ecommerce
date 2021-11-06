import constants from '../constants.js';
import userService from '../services/user.service.js';
import ApiError from '../utils/APIError.js';
import { jwtMiddleware } from '../utils/jwt-utils.js';

const roleAdmin = constants.USER.ROLE.ADMIN;
const roleStaff = constants.USER.ROLE.STAFF;
const roleAdminOrStaff = [roleAdmin, roleStaff];
const roleCustomer = constants.USER.ROLE.CUSTOMER;

export function isAuthorized(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User') 
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    jwtMiddleware,

    async (req, _, next) => {
      const user = await userService.getOneById(req.user._id, '_id role', false);
      if (!user) {
        return next(ApiError.simple('Unauthorized: User doesn\'t exist!', 401))
      }

      if (roles.length && !roles.includes(user.role)) {
        return next(ApiError.simple('Unauthorized: User role is not allowed!', 401))
      }

      req.user.role = user.role;
      next();
    }
  ];
};

export const isAdmin = isAuthorized(roleAdmin);
export const isStaff = isAuthorized(roleStaff);
export const isAdminOrStaff = isAuthorized(roleAdminOrStaff);
export const isCustomer = isAuthorized(roleCustomer);
