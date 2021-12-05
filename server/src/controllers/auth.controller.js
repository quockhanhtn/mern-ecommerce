import userService from '../services/user.service.js';
import authService from '../services/auth.service.js';
import googleServices from '../services/google.services.js';
import resUtils from '../utils/res-utils.js';
import { formatImageUrl } from '../utils/format-utils.js';
import { generateToken } from '../utils/jwt-utils.js';

export const register = async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body);
    if (newUser && newUser._doc) {
      const userData = formatImageUrl(newUser._doc, 'avatar', req);
      delete userData.password;
      delete userData.addresses;

      resUtils.status201(
        res,
        'Register successfully !',
        { token: generateToken(userData), user: userData }
      );
    }
    throw new Error('Register failed !');
  } catch (err) { next(err) }
};


export const googleOAuth = async (req, res, next) => {
  try {
    const { googleCredential } = req.body;
    const ipAddress = req.ip;

    const payload = await googleServices.verify(googleCredential);
    if (!payload) {
      throw new Error('Google OAuth failed !');
    }

    const result = await authService.googleAuthenticate(payload, ipAddress);
    const userData = formatImageUrl(result.user, 'avatar', req);
    delete userData.password;

    resUtils.status200(
      res,
      'Google OAuth successful !',
      {
        user: userData,
        token: result.jwtToken,
        refreshToken: result.refreshToken
      }
    );
  } catch (err) { next(err) }
};

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const ipAddress = req.ip;

    const result = await authService.authenticate(username, password, ipAddress);
    const userData = formatImageUrl(result.user, 'avatar', req);
    delete userData.password;

    resUtils.status200(
      res,
      'Login successful !',
      {
        user: userData,
        token: result.jwtToken,
        refreshToken: result.refreshToken
      }
    );
  } catch (err) { next(err) }
};

export const refreshToken = async (req, res, next) => {
  try {
    const ipAddress = req.ip;
    const refreshToken = req.body.refreshToken;

    const result = await authService.refreshToken(refreshToken, ipAddress);
    const userData = formatImageUrl(result.user, 'image', req);
    delete userData.password;

    resUtils.status200(
      res,
      'Refresh Token successful !',
      {
        user: userData,
        token: result.jwtToken,
        refreshToken: result.refreshToken
      }
    );
  } catch (err) { next(err); }
};

export const logout = async (req, res, next) => {
  try {
    const ipAddress = req.ip;
    const refreshToken = req.body.refreshToken;
    await authService.revokeToken(refreshToken, ipAddress);
    resUtils.status204(res);
  } catch (err) { next(err) }
};
