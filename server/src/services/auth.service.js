import RefreshToken from '../models/refresh-token.model.js';
import userService from './user.service.js';
import { randomBytes } from 'crypto';
import { generateToken } from '../utils/jwt-utils.js';
import { hashPassword, comparePassword } from '../utils/cipher-utils.js';
import ApiError from '../utils/APIError.js';
import responseDef from '../responseCode.js';


export default {
  googleAuthenticate,
  authenticate,
  refreshToken,
  revokeToken,
  changePassword
};

async function googleAuthenticate(payload, ipAddress) {
  const {
    sub: googleId,
    email,
    given_name: firstName,
    family_name: lastName,
    picture: avatar
  } = payload;

  const user = await userService.getOrCreateByGoogleId(googleId, email, firstName, lastName, avatar);
  if (!user) {
    throw ApiError.simple2(responseDef.AUTH.USER_NOT_FOUND);
  }

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
};

async function authenticate(username, password, ipAddress) {
  const user = await userService.getOne(username, '-addresses');
  if (!user) {
    throw ApiError.simple2(responseDef.AUTH.USER_NOT_FOUND);
  }

  const isMatch = comparePassword(password, user.password);
  if (!isMatch) {
    throw ApiError.simple2(responseDef.AUTH.INVALID_PASSWORD);
  }

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
    throw ApiError.simple2(responseDef.AUTH.INVALID_TOKEN);
  }
  return refreshToken;
}

async function changePassword(userId, oldPassword, newPassword) {
  const user = await userService.getOneById(userId, '_id password emptyPassword googleId email');
  if (!user) {
    throw ApiError.simple2(responseDef.AUTH.USER_NOT_FOUND);
  }

  const updateData = {};
  if (user.emptyPassword) {
    // user created with google/facebook sign-in
    updateData.emptyPassword = false;
  } else {
    const isMatch = comparePassword(oldPassword, user.password);
    if (!isMatch) {
      throw ApiError.simple2(responseDef.AUTH.INVALID_PASSWORD);
    }
  }

  updateData.password = hashPassword(newPassword);
  const result = await userService.updateById(user._id, updateData);
  return result;
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
