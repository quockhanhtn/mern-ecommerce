import otpGenerator from 'otp-generator';
import _Otp from '../models/otp.model.js';
import CipherUtils from '../utils/CipherUtils.js';

export const genOtp = async (email) => {
  const otpCode = otpGenerator.generate(6, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false
  });

  const otpHash = CipherUtils.hashPassword(otpCode);

  const otp = new _Otp({ email, otp: otpHash });

  await otp.save();
  return otpCode;
};

export const validateOtp = async (email, otpCode) => {
  const otpHash = CipherUtils.hashPassword(otpCode);
  const otp = await _Otp.findOne({ otp: otpHash }).sort({ 'time': -1 }).lean();
  return otp.email === email;
};
