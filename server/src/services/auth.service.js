import { randomBytes } from 'crypto';
import RefreshToken from '../models/refresh-token.model.js';
import userService from './user.service.js';
import firebaseService from './firebase.service.js';
import * as otpService from './otp.service.js';
import * as mailerService from './mailer.service.js';

import responseDef from '../responseCode.js';
import ApiErrorUtils from '../utils/ApiErrorUtils.js';
import CipherUtils from '../utils/CipherUtils.js';
import JwtUtils from '../utils/JwtUtils.js';
import StringUtils from '../utils/StringUtils.js';


export default {
  googleAuthenticate,
  authenticate,
  refreshToken,
  revokeToken,
  sendOtpViaMail,
  checkEmailOtp,
  changePassword,
  resetPassword,
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
    throw ApiErrorUtils.simple2(responseDef.AUTH.USER_NOT_FOUND);
  }

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = JwtUtils.generateToken({ _id: user._id });
  const refreshToken = generateRefreshToken(user._id, ipAddress);

  // save refresh token
  await refreshToken.save();

  return {
    user,
    jwtToken,
    refreshToken: refreshToken.token
  };
}

async function authenticate(username, password, ipAddress) {
  const user = await userService.getOne(username, '-addresses');
  if (!user) {
    throw ApiErrorUtils.simple2(responseDef.AUTH.USER_NOT_FOUND);
  }

  const isMatch = CipherUtils.comparePassword(password, user.password);
  if (!isMatch) {
    throw ApiErrorUtils.simple2(responseDef.AUTH.INVALID_PASSWORD);
  }

  // authentication successful so generate jwt and refresh tokens
  const jwtToken = JwtUtils.generateToken({ _id: user._id });
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
    throw ApiErrorUtils.simple('Can\'t refresh token from other ip address', 401);
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
  const jwtToken = JwtUtils.generateToken({ _id: user._id });

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
    throw ApiErrorUtils.simple2(responseDef.AUTH.INVALID_TOKEN);
  }
  return refreshToken;
}

async function sendOtpViaMail(email, language) {
  if (!StringUtils.isEmailAddress(email)) {
    throw ApiErrorUtils.simple2(responseDef.AUTH.INVALID_EMAIL);
  }
  const isExistUser = await userService.isExistEmail(email);
  if (!isExistUser) {
    throw ApiErrorUtils.simple2(responseDef.AUTH.USER_NOT_FOUND);
  }

  const otpCode = await otpService.genOtp(email);
  await mailerService.sendWithOtpTemplate(email, otpCode, language);
  return true;
}

async function checkEmailOtp(email, otp) {
  const isValidOtp = await otpService.validateOtp(email, otp);
  if (!isValidOtp) {
    throw ApiErrorUtils.simple2(responseDef.AUTH.INVALID_OTP);
  }
  const otpToken = JwtUtils.generateToken({ email: email }, '1h');
  return otpToken;
}

async function changePassword(userId, oldPassword, newPassword) {
  const user = await userService.getOneById(userId, '_id password emptyPassword googleId email');
  if (!user) {
    throw ApiErrorUtils.simple2(responseDef.AUTH.USER_NOT_FOUND);
  }

  const updateData = {};
  if (user.emptyPassword) {
    // user created with google/facebook sign-in
    updateData.emptyPassword = false;
  } else {
    const isMatch = CipherUtils.comparePassword(oldPassword, user.password);
    if (!isMatch) {
      throw ApiErrorUtils.simple2(responseDef.AUTH.INVALID_PASSWORD);
    }
  }

  if (oldPassword === newPassword) {
    throw ApiErrorUtils.simple2(responseDef.AUTH.PASSWORD_NOT_CHANGED);
  }

  if (newPassword === '' || newPassword === null) {
    throw ApiErrorUtils.simple2(responseDef.AUTH.PASSWORD_EMPTY);
  }

  if (newPassword.length < 6) {
    throw ApiErrorUtils.simple2(responseDef.AUTH.PASSWORD_TOO_SHORT);
  }
  if (newPassword.length > 32) {
    throw ApiErrorUtils.simple2(responseDef.AUTH.PASSWORD_TOO_LONG);
  }

  updateData.password = CipherUtils.hashPassword(newPassword);
  const result = await userService.updateById(user._id, updateData);
  return result;
}

async function resetPassword(account, token, newPassword) {
  let isValidOtp = false;
  if (StringUtils.isEmailAddress(account)) {
    isValidOtp = JwtUtils.verifyToken(token).email === account;
  } else if (StringUtils.isPhoneNumber(account)) {
    isValidOtp = await firebaseService.verifyTokenWithPhone(account, token);
  } else {
    throw ApiErrorUtils.simple2(responseDef.AUTH.INVALID_ACCOUNT);
  }

  if (!isValidOtp) {
    throw ApiErrorUtils.simple2(responseDef.AUTH.INVALID_OTP);
  }

  if (newPassword.length < 6) {
    throw ApiErrorUtils.simple2(responseDef.AUTH.PASSWORD_TOO_SHORT);
  }
  if (newPassword.length > 32) {
    throw ApiErrorUtils.simple2(responseDef.AUTH.PASSWORD_TOO_LONG);
  }
  const user = await userService.getOne(account, '_id');
  const passwordHash = CipherUtils.hashPassword(newPassword);
  const result = await userService.updateById(user._id, { password: passwordHash });
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
