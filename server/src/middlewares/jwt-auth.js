import constants from '../constants.js';
import userService from '../services/user.service.js';
import ApiErrorUtils from '../utils/ApiErrorUtils.js';
import JwtUtils from '../utils/JwtUtils.js';

const roleAdmin = constants.USER.ROLE.ADMIN;
const roleStaff = constants.USER.ROLE.STAFF;
const roleAdminOrStaff = [roleAdmin, roleStaff];
const roleCustomer = constants.USER.ROLE.CUSTOMER;

function authorized(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User') 
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }

  return [
    // authenticate JWT token and attach user to request object (req.user)
    JwtUtils.jwtMiddleware,

    async (req, _, next) => {
      const user = await userService.getOneById(req.user._id, '_id role', false);
      if (!user) {
        return next(ApiErrorUtils.simple('Unauthorized: User doesn\'t exist!', 401))
      }

      if (roles.length && !roles.includes(user.role)) {
        return next(ApiErrorUtils.simple('Unauthorized: User role is not allowed!', 401))
      }

      req.user.role = user.role;
      next();
    }
  ];
}

export const isAuthorized = authorized();
export const isAdmin = authorized(roleAdmin);
export const isStaff = authorized(roleStaff);
export const isAdminOrStaff = authorized(roleAdminOrStaff);
export const isCustomer = authorized(roleCustomer);

// allow unauthenticated
export const isGuestOrAuthorized = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  if (token) {
    return JwtUtils.jwtMiddleware(req, res, next);
  }

  let uid = req.headers.uid;
  if (!uid) {
    res.end();
  }

  req.userIdentifier = uid;
  next();
}