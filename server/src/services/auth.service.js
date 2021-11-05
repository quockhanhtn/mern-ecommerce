import mongoose from 'mongoose';
import User from '../models/user.model.js';
import RefreshToken from '../models/refresh-token.model.js';
import userService from './user.service.js';
import { generateToken } from '../utils/jwt-utils.js';
import { comparePassword } from '../utils/cipher-utils.js';
import ApiError from '../utils/APIError.js';
import { randomBytes } from 'crypto';

export default {
  authenticate,
  refreshToken,
  revokeToken
};


async function authenticate(username, password, ipAddress) {
  const user = await userService.getOne(username);
  if (!user) { throw ApiError.simple('User not found!', 404); }

  const isMatch = comparePassword(password, user.password);
  if (!isMatch) { throw ApiError.simple('Invalid password!', 400); }

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = generateToken({ _id: user._id });
  const refreshToken = generateRefreshToken(user, ipAddress);

  // save refresh token
  await refreshToken.save();

  return {
    user,
    jwtToken,
    refreshToken: refreshToken.token
  };
}

async function refreshToken({ token, ipAddress }) {
  const refreshToken = await getRefreshToken(token);
  const { user } = refreshToken;

  // replace old refresh token with a new one and save
  const newRefreshToken = generateRefreshToken(user, ipAddress);
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  refreshToken.replacedByToken = newRefreshToken.token;
  await refreshToken.save();
  await newRefreshToken.save();

  // generate new jwt
  const jwtToken = generateJwtToken(user);

  // return basic details and tokens
  return {
    ...basicDetails(user),
    jwtToken,
    refreshToken: newRefreshToken.token
  };
}

async function revokeToken({ token, ipAddress }) {
  const refreshToken = await getRefreshToken(token);

  // revoke token and save
  refreshToken.revoked = Date.now();
  refreshToken.revokedByIp = ipAddress;
  await refreshToken.save();
}

async function getRefreshToken(token) {
  const refreshToken = await db.RefreshToken.findOne({ token }).populate('user');
  if (!refreshToken || !refreshToken.isActive) throw 'Invalid token';
  return refreshToken;
}

function generateRefreshToken(user, ipAddress) {
  // create a refresh token that expires in 7 days
  return new RefreshToken({
    user: user._id,
    token: randomBytes(64).toString('hex'),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress
  });
}

function basicDetails(user) {
  const { id, firstName, lastName, username, role } = user;
  return { id, firstName, lastName, username, role };
}
