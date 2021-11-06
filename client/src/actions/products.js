import * as actionTypes from '../constants/actionTypes';
import * as api from '../api';

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.getAllProduct();
    dispatch({ type: actionTypes.PRODUCT.GET_ALL, payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/products/getAllProducts', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const getProductById = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.getOneProduct(id);
    dispatch({ type: actionTypes.PRODUCT.GET_ONE, payload: data.data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/products/getProductById', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const createProduct = (newProduct) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.createProduct(newProduct);
    dispatch({ type: actionTypes.PRODUCT.CREATE, payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/products/createProduct', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const updateProduct = (id, updateProduct) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.updateProduct(id, updateProduct);
    dispatch({ type: actionTypes.PRODUCT.UPDATE, payload: data.data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/products/updateProduct', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    await api.deleteProduct(id);
    dispatch({ type: actionTypes.PRODUCT.DELETE, payload: id });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/products/deleteProduct', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const createProductVariant = (id, productVariant) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.createProductVariant(id, productVariant);
    dispatch({ type: actionTypes.PRODUCT.CREATE_VARIANT, payload: data.data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/products/createProductVariant', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const updateProductVariant = (id, sku, productVariant) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.updateProductVariant(id, sku, productVariant);
    dispatch({ type: actionTypes.PRODUCT.CREATE_VARIANT, payload: data.data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/products/updateProductVariant', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const deleteProductVariant = (productId, sku) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    await api.deleteProductVariant(productId, sku);
    dispatch({ type: actionTypes.PRODUCT.DELETE_VARIANT, payload: sku });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/products/deleteProductVariant', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};
