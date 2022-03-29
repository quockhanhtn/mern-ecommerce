import * as actionTypes from '../../constants/actionTypes';
import * as api from '../../api';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const getAllProducts = (_search = '', brand = '', category = '', page = 1, limit = 12) => {
  throw new Error('Not implemented');
};

export const getFullAllProducts = () => async (dispatch) => {
  throw new Error('Not implemented');
};

export const getProductById = (id) => async (dispatch) => {
  throw new Error('Not implemented');
};

export const createProduct = (newProduct) => async (dispatch) => {
  throw new Error('Not implemented');
};

export const updateProduct = (id, updateProduct) => async (dispatch) => {
  throw new Error('Not implemented');
};

export const deleteProduct = (id) => async (dispatch) => {
  throw new Error('Not implemented');
};

export const createProductVariant = (id, productVariant) => async (dispatch) => {
  throw new Error('Not implemented');
};

export const updateProductVariant = (id, sku, productVariant) => async (dispatch) => {
  throw new Error('Not implemented');
};

export const deleteProductVariant = (productId, sku) => async (dispatch) => {
  throw new Error('Not implemented');
};
