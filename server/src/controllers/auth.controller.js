import userService from '../services/user.service';
import resUtils from '../utils/res-utils.js';
import { formatImageUrl } from '../utils/format-utils.js';
import { generateToken } from '../utils/jwt-utils.js';

export const register = async (req, res, next) => {
  try {
    const newUser = await userService.create(req.body);

    const payload = formatImageUrl({ ...newUser }, 'image', req);
    delete payload.password;
    delete payload.address;

    resUtils.status201(
      res,
      'Register successfully !',
      { token: generateToken(payload), user: payload }
    );
  } catch (err) { next(err) }
}

export const login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const user = await userService.getOne(username);
    if (!user) { throw new Error('User not found'); }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) { throw new Error('Invalid password'); }

    const payload = formatImageUrl({ ...user }, 'image', req);
    delete payload.password;
    delete payload.address;

    resUtils.status200(
      res,
      'Login successful !',
      { token: generateToken(payload), user: payload }
    );
  } catch (err) { next(err) }
}

export const logout = async (req, res, next) => {
  try {

  } catch (err) { next(err) }
}
