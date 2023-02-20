import admin from 'firebase-admin';
import configs from '../configs.js';

admin.initializeApp({
  credential: admin.credential.cert(configs.firebaseServiceAccount)
});

/**
 * Verify a Firebase ID token and decode
 * @param {string} token - Firebase Auth token
 * @returns decoded token if valid, otherwise returns null
 */
async function verifyToken(token) {
  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    return decodedToken;
  } catch {
    return null;
  }
}

async function verifyTokenWithPhone(phone, token) {
  const decodeData = await verifyToken(token);
  if (!decodeData) {
    return false;
  }

  if (decodeData.exp < Date.now() / 1000) {
    return false;
  }

  const phoneNumber = decodeData.phone_number.replace('+84', '0');
  return phoneNumber === phone;
}

export default {
  verifyToken,
  verifyTokenWithPhone
};