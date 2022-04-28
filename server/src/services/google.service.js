// ref: https://developers.google.com/identity/sign-in/web/backend-auth

import { OAuth2Client } from 'google-auth-library';
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export default {
  verify
};

/**
 * Verify a Google token and return the user's data
 * @param {string} googleCredential Google credential/ access token, get from Google One tap login in the frontend
 * @returns user data - more info: https://developers.google.com/identity/sign-in/web/backend-auth#calling-the-tokeninfo-endpoint
 * @sample return data: {
 */
async function verify(googleCredential) {
  const ticket = await client.verifyIdToken({
    idToken: googleCredential,
    audience: process.env.GOOGLE_CLIENT_ID
  });
  return ticket.getPayload();
}

// {
//   // These six fields are included in all Google ID Tokens.
//   "iss": "https://accounts.google.com",
//   "sub": "110169484474386276334",
//   "azp": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
//   "aud": "1008719970978-hb24n2dstb40o45d4feuo2ukqmcc6381.apps.googleusercontent.com",
//   "iat": "1433978353",
//   "exp": "1433981953",
 
//   // These seven fields are only included when the user has granted the "profile" and
//   // "email" OAuth scopes to the application.
//   "email": "testuser@gmail.com",
//   "email_verified": "true",
//   "name" : "Test User",
//   "picture": "https://lh4.googleusercontent.com/-kYgzyAWpZzJ/ABCDEFGHI/AAAJKLMNOP/tIXL9Ir44LE/s99-c/photo.jpg",
//   "given_name": "Test", // first name
//   "family_name": "User", // last name
//   "jti":"748d24e06e0a4f7f8c9f0f8b0c0a0d0a"
//  }