import RefreshToken from '../models/refresh-token.model.js';
import userService from './user.service.js';
import { randomBytes } from 'crypto';
import { generateToken } from '../utils/jwt-utils.js';
import { comparePassword } from '../utils/cipher-utils.js';
import ApiError from '../utils/APIError.js';


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
  const refreshToken = generateRefreshToken(user._id, ipAddress);

  // save refresh token
  await refreshToken.save();

  return {
    user,
    jwtToken,
    refreshToken: refreshToken.token
  };
}

async function refreshToken(refreshToken, ipAddress) {
  const currentRfToken = await getRefreshToken(refreshToken);
  if (currentRfToken.createdByIp !== ipAddress) {
    throw ApiError.simple('Can\'t refresh token from other ip address', 401);
  }

  const { user } = currentRfToken;

  // replace old refresh token with a new one and save
  const newRfToken = generateRefreshToken(user._id, ipAddress);
  currentRfToken.revokedAt = Date.now();
  currentRfToken.revokedByIp = ipAddress;
  currentRfToken.replacedByToken = newRfToken.token;
  await currentRfToken.save();
  await newRfToken.save();

  // generate new jwt
  const jwtToken = generateToken({ _id: user._id });

  // return basic details and tokens
  return {
    user: user.toObject(),
    jwtToken,
    refreshToken: newRfToken.token
  };
}

async function revokeToken(refreshToken, ipAddress) {
  const currentRfToken = await getRefreshToken(refreshToken);

  // revoke token and save
  currentRfToken.revokedAt = Date.now();
  currentRfToken.revokedByIp = ipAddress;
  await currentRfToken.save();
}

async function getRefreshToken(token) {
  const refreshToken = await RefreshToken
    .findOne({ token })
    .populate({ path: 'user', select: '-addresses -password' });
  if (!refreshToken || !refreshToken.isActive) {
    throw ApiError.simple('Invalid token', 400);
  }
  return refreshToken;
}

function generateRefreshToken(userId, ipAddress) {
  // create a refresh token that expires in 7 days
  return new RefreshToken({
    user: userId,
    token: randomBytes(64).toString('hex'),
    expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    createdByIp: ipAddress
  });
}
