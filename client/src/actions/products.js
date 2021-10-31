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
