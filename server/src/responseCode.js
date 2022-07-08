/* cSpell:disable */

import FormatUtils from './utils/FormatUtils.js';

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
    INVALID_EMAIL: {
      status: 401,
      code: 401003,
      message: {
        en: 'Invalid email',
        vi: 'Email không hợp lệ'
      }
    },
    INVALID_ACCOUNT: {
      status: 401,
      code: 401004,
      message: {
        en: 'Invalid account',
        vi: 'Tài khoản không hợp lệ'
      }
    },
    INVALID_OTP: {
      status: 401,
      code: 401005,
      message: {
        en: 'Invalid OTP',
        vi: 'Mã OTP không hợp lệ'
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
  },
  CATEGORY: {
    CATEGORY_NOT_FOUND: {
      status: 404,
      code: 404001,
      message: {
        en: 'Category not found',
        vi: 'Danh mục không tồn tại'
      }
    },
    CATEGORY_HAS_PRODUCT: {
      status: 400,
      code: 400001,
      message: {
        vi: 'Không thể xóa danh mục này vì nó có sản phẩm',
        en: 'Can not delete category because it has products'
      }
    }
  },
  BRAND: {
    BRAND_NOT_FOUND: {
      status: 404,
      code: 404001,
      message: {
        en: 'Brand not found',
        vi: 'Thương hiệu không tồn tại'
      }
    },
    BRAND_HAS_PRODUCT: {
      status: 400,
      code: 400001,
      message: {
        vi: 'Không thể xóa thương hiệu này vì nó có sản phẩm',
        en: 'Can not delete brand because it has products'
      }
    }
  },
  DISCOUNT: {
    NOT_FOUND: {
      status: 404,
      code: 404001,
      message: {
        en: 'Discount not valid or expired',
        vi: `Mã khuyến mãi không tồn tại hoặc đã hết hạn`
      }
    },
    MINIMUM_TOTAL: (minimumTotal) => ({
      status: 400,
      code: 400001,
      message: {
        en: `Minimun order sub-total is ${FormatUtils.formatCurrency(minimumTotal, 'en')}`,
        vi: `Giá trị đơn hàng tối thiểu là ${FormatUtils.formatCurrency(minimumTotal, 'vi')}`
      }
    }),
  }
}

export default responseDef;