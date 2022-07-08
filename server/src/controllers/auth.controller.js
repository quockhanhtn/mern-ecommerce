import userService from '../services/user.service.js';
import authService from '../services/auth.service.js';
import googleServices from '../services/google.service.js';
import ResponseUtils from '../utils/ResponseUtils.js';
import FormatUtils from '../utils/FormatUtils.js';
import JwtUtils from '../utils/JwtUtils.js';

export const register = async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body);
    if (newUser && newUser._doc) {
      const userData = FormatUtils.imageUrl(newUser._doc, 'avatar', req);
      delete userData.password;
      delete userData.addresses;

      ResponseUtils.status201(
        res,
        'Register successfully !',
        { token: JwtUtils.generateToken(userData), user: userData }
      );
    }
    throw new Error('Register failed !');
  } catch (err) { next(err) }
};


export const googleOAuth = async (req, res, next) => {
  try {
    const { googleCredential, clientId = null } = req.body;
    const ipAddress = req.ipv4;

    const payload = await googleServices.verify(googleCredential, clientId);
    if (!payload) {
      throw new Error('Google OAuth failed !');
    }

    const result = await authService.googleAuthenticate(payload, ipAddress);
    const userData = FormatUtils.imageUrl(result.user, 'avatar', req);
    delete userData.password;

    ResponseUtils.status200(
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
    const ipAddress = req.ipv4;

    const result = await authService.authenticate(username, password, ipAddress);
    const userData = FormatUtils.imageUrl(result.user, 'avatar', req);
    delete userData.password;

    ResponseUtils.status200(
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
    const ipAddress = req.ipv4;
    const refreshToken = req.body.refreshToken;

    const result = await authService.refreshToken(refreshToken, ipAddress);
    const userData = FormatUtils.imageUrl(result.user, 'image', req);
    delete userData.password;

    ResponseUtils.status200(
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
    const ipAddress = req.ipv4;
    const refreshToken = req.body.refreshToken;
    await authService.revokeToken(refreshToken, ipAddress);
    ResponseUtils.status204(res);
  } catch (err) { next(err) }
};

export const sendOtpCode = async (req, res, next) => {
  try {
    const email = req.body?.email ?? '';
    const language = req.headers['accept-language'];
    await authService.sendOtpViaMail(email, language);
    ResponseUtils.status200(res, 'Send OTP success');
  } catch (err) { next(err) }
};

export const checkOtp = async (req, res, next) => {
  try {
    const email = req.body?.email ?? '';
    const otp = req.body?.otp ?? '';
    const token = await authService.checkEmailOtp(email, otp);
    ResponseUtils.status200(res, 'Send OTP success', { token });
  } catch (err) { next(err) }
};

export const resetPassword = async (req, res, next) => {
  try {
    const {
      account = '',     // email or phone number
      token = '',  // otp token (from auth/check-otp) or firebase token
      newPassword = ''
    } = req.body;

    await authService.resetPassword(account, token, newPassword);

    ResponseUtils.status204(res);
  } catch (err) { next(err) }
};
