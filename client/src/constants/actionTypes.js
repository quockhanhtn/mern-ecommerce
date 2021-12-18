export const START_LOADING = 'START_LOADING';
export const END_LOADING = 'END_LOADING';
export const HAS_ERROR = 'HAS_ERROR';

export const AUTH = {
  LOGIN: 'AUTH_LOGIN',
  REGISTER: 'AUTH_REGISTER',
  LOGOUT: 'AUTH_LOGOUT'
};

export const CATEGORY = {
  GET_ALL: 'CATEGORY_GET_ALL',
  GET_ALL_SIMPLE: 'CATEGORY_GET_ALL_SIMPLE',
  GET_ONE: 'CATEGORY_GET_ONE',
  CREATE: 'CATEGORY_CREATE',
  UPDATE: 'CATEGORY_UPDATE',
  DELETE: 'CATEGORY_DELETE'
};

export const BRAND = {
  GET_ALL: 'BRAND_GET_ALL',
  GET_ALL_SIMPLE: 'BRAND_GET_ALL_SIMPLE',
  GET_ONE: 'BRAND_GET_ONE',
  CREATE: 'BRAND_CREATE',
  UPDATE: 'BRAND_UPDATE',
  DELETE: 'BRAND_DELETE'
};

export const DISCOUNT = {
  GET_ALL: 'DISCOUNT_GET_ALL',
  GET_ALL_SIMPLE: 'DISCOUNT_GET_ALL_SIMPLE',
  GET_ONE: 'DISCOUNT_GET_ONE',
  CREATE: 'DISCOUNT_CREATE',
  UPDATE: 'DISCOUNT_UPDATE',
  DELETE: 'DISCOUNT_DELETE'
};

export const PRODUCT = {
  GET_ALL: 'PRODUCT_GET_ALL',
  GET_ONE: 'PRODUCT_GET_ONE',
  CREATE: 'PRODUCT_CREATE',
  UPDATE: 'PRODUCT_UPDATE',
  DELETE: 'PRODUCT_DELETE',
  CREATE_VARIANT: 'PRODUCT_CREATE_VARIANT',
  UPDATE_VARIANT: 'PRODUCT_UPDATE_VARIANT',
  DELETE_VARIANT: 'PRODUCT_DELETE_VARIANT'
};

export const USER = {
  STAFF: {
    GET_ALL: 'USER_STAFF_GET_ALL',
    GET_ONE: 'USER_STAFF_GET_ONE',
    CREATE: 'USER_STAFF_CREATE',
    UPDATE: 'USER_STAFF_UPDATE',
    DELETE: 'USER_STAFF_DELETE'
  },
  GET_ALL: 'USER_GET_ALL',
  GET_ONE: 'USER_GET_ONE',
  CREATE: 'USER_CREATE',
  UPDATE: 'USER_UPDATE',
  DELETE: 'USER_DELETE'
};

export const IMAGE = {
  UPLOADING: 'IMAGE_UPLOADING',
  UPLOAD_SINGLE: 'IMAGE_UPLOAD_SINGLE',
  UPLOAD_MULTI: 'IMAGE_UPLOAD_MULTI'
};

export const ACCOUNT = {
  ADDRESS: {
    START_LOADING: 'ACCOUNT_ADDRESS_START_LOADING',
    END_LOADING: 'ACCOUNT_ADDRESS_END_LOADING',
    ERROR: 'ACCOUNT_ADDRESS_ERROR',

    GET_ALL: 'ACCOUNT_ADDRESS_GET_ALL',
    CREATE: 'ACCOUNT_ADDRESS_CREATE',
    UPDATE: 'ACCOUNT_ADDRESS_UPDATE',
    DELETE: 'ACCOUNT_ADDRESS_DELETE'
  }
};

export const ORDER = {
  START_LOADING: 'ORDER_START_LOADING',
  END_LOADING: 'ORDER_END_LOADING',
  ERROR: 'ORDER_ERROR',

  GET_ALL: 'ORDER_GET_ALL',
  GET_ONE: 'ORDER_GET_ONE',
  CREATE: 'ORDER_CREATE',
  UPDATE: 'ORDER_UPDATE',
  DELETE: 'ORDER_DELETE'
};
