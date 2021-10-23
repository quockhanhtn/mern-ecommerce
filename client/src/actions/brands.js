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

export const createBrand = (brand) => ({
  type: actionTypes.BRAND.CREATE,
  payload: brand
});

export const updateBrand = (brand) => ({
  type: actionTypes.BRAND.UPDATE,
  payload: brand
});

export const deleteBrand = (brand) => ({
  type: actionTypes.BRAND.DELETE,
  payload: brand
});
