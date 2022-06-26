export const USER = {
  GENDER: {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other'
  },
  ROLE: {
    ADMIN: 'admin',
    STAFF: 'staff',
    CUSTOMER: 'customer'
  },
  STATUS: {
    ACTIVE: 'active',
    INACTIVE: 'inactive',
    LOCKED: 'locked'
  }
}

export const ORDER = {
  STATUS: {
    PENDING: 'pending',       // order created, waiting for confirm by admin or staff
    CONFIRMED: 'confirmed',   // order confirmed by admin or staff
    SHIPPING: 'shipping',     // order has been picked up by staff and is being shipped
    COMPLETED: 'completed',   // order has been delivered
    CANCELLED: 'cancelled'    // order has been cancelled
  },
  PAYMENT_METHOD: {
    CASH: 'cash',             // paid at store
    COD: 'cod',               // paid at delivery (cash on delivery)
    VNPAY: 'vnpay',           // paid by VNPAY
    MOMO: 'momo',             // paid by Momo
    PAYPAL: 'paypal',         // paid by Paypal
    ZALO_PAY: 'zalopay'       // paid by Zalo PAY
  },
  PAYMENT_STATUS: {
    PENDING: 'pending',       // payment is pending
    PAID: 'paid',             // payment has been made
    CANCELLED: 'cancelled'    // payment has been cancelled
  }
};

export const DISCOUNT_CONS = {
  TYPE: {
    PERCENT: 'percent',
    PRICE: 'price'
  }
}

export const REGEX = {
  /*
    * Username regex validation explain
    * Reference https://stackoverflow.com/a/12019115
    * ^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$
    * └─────┬────┘└───┬──┘└─────┬─────┘└─────┬─────┘ └───┬───┘
    *       │         │         │            │           no _ or . at the end
    *       │         │         │            │
    *       │         │         │            allowed characters
    *       │         │         │
    *       │         │         no __ or _. or ._ or .. inside
    *       │         │
    *       │         no _ or . at the beginning
    *       │
    *       username is 5-20 characters long
   */
  USERNAME: /^(?=.{5,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/,
  PHONE: /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/,
  EMAIL: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
};

/* eslint-disable */
export const allowImageMineTypes = [
  'image/bmp',                // .bmp       - Windows OS/2 Bitmap Graphics
  'image/jpeg',               // .jpeg .jpg - JPEG images
  'image/png',                // ..png      - Portable Network Graphics
  'image/gif',                // .gif       - Graphics Interchange Format (GIF)
  'image/tiff',               // .tif .tiff - Tagged Image File Format (TIFF)
  'image/svg+xml',            // .svg       - Scalable Vector Graphics (SVG)
  'image/vnd.microsoft.icon', // .ico       - Icon format
  'image/x-icon'              // same above
];
// read more at: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types

export default {
  USER,
  ORDER,
  REGEX
}
