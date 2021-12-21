/* cSpell:disable */
export const responseDef = {
  AUTH: {
    USER_NOT_FOUND: {
      status: 404,
      code: 404001,
      message: {
        en: 'User not found',
        vi: 'Tài khoản không tồn tại'
      }
    },
    INVALID_PASSWORD: {
      status: 401,
      code: 401002,
      message: {
        en: 'Invalid password',
        vi: 'Mật khẩu không đúng'
      }
    },
    USER_ALREADY_EXISTS: {
      status: 409,
      code: 409002,
      message: 'User already exists',
    },
    INVALID_CREDENTIALS: {
      status: 401,
      message: 'Invalid credentials',
    },
    INVALID_TOKEN: {
      status: 401,
      message: 'Invalid token',
    },
    INVALID_TOKEN_EXPIRED: {
      status: 401,
      message: 'Token expired',
    },
    INVALID_TOKEN_REVOKED: {
      status: 401,
      message: 'Token revoked',
    },
    PASSWORD_NOT_CHANGED: {
      status: 400,
      code: 400004,
      message: {
        en: 'Password not changed',
        vi: 'Mật khẩu chưa được thay đổi'
      }
    },
    PASSWORD_EMPTY: {
      status: 400,
      code: 400001,
      message: {
        en: 'Password is empty',
        vi: 'Mật khẩu không được để trống'
      }
    },
    PASSWORD_TOO_SHORT: {
      status: 400,
      code: 400002,
      message: {
        en: 'Password too short',
        vi: 'Mật khẩu quá ngắn'
      }
    },
    PASSWORD_TOO_LONG: {
      status: 400,
      code: 400003,
      message: {
        en: 'Password too long',
        vi: 'Mật khẩu quá dài'
      }
    },
    401001: 'Unauthorized',
    401002: 'Invalid token',
  }
}

export default responseDef;