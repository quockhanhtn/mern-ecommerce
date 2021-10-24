import * as actionTypes from '../constants/actionTypes';
import * as api from '../api';

export const getAllDiscounts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.getAllDiscount();
    dispatch({ type: actionTypes.DISCOUNT.GET_ALL, payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/discounts/getAllDiscounts', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const createDiscount = (newBrand) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.createDiscount(newBrand);
    dispatch({ type: actionTypes.DISCOUNT.CREATE, payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/discounts/createDiscount', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const updateDiscount = (id, updatedCategory) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.updateDiscount(id, updatedCategory);
    console.log('updateBrand', data);
    dispatch({ type: actionTypes.DISCOUNT.UPDATE, payload: data.data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/discounts/updateDiscount', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const deleteDiscount = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.deleteDiscount(id);
    dispatch({ type: actionTypes.DISCOUNT.DELETE, payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/discounts/deleteDiscount', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};
