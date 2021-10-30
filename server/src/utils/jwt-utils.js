import jwt from 'jsonwebtoken';

const secretKey = process.env.JWT_SECRET;
const opts = {
  expiresIn: process.env.JWT_EXPIRES_IN
}

export const generateToken = (payload) => {
  const token = jwt.sign(payload, secretKey, opts);
  return token;
}

export const verifyToken = (token) => {
  const decoded = jwt.verify(token, secretKey);
  return decoded;
};
