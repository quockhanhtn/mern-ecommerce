import * as actionTypes from '../constants/actionTypes';
import * as api from '../api';

export const getAllBrands = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.getAllBrand();
    dispatch({ type: actionTypes.BRAND.GET_ALL, payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/brands/getAllBrands', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const createBrand = (newBrand) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.createBrand(newBrand);
    dispatch({ type: actionTypes.BRAND.CREATE, payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/brands/createBrand', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const updateBrand = (id, updateBrand) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.updateBrand(id, updateBrand);
    dispatch({ type: actionTypes.BRAND.UPDATE, payload: data.data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/brands/updateBrand', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const deleteBrand = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    await api.deleteBrand(id);
    dispatch({ type: actionTypes.BRAND.DELETE, payload: id });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/brands/deleteBrand', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};
