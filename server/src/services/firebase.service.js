import admin from 'firebase-admin';


const serviceAccount = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
}
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
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

export default {
  verifyToken
};