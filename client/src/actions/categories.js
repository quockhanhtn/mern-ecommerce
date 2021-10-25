import * as actionTypes from '../constants/actionTypes';
import * as api from '../api';

export const getAllCategories = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.getAllCategory();
    console.log(data);
    dispatch({ type: actionTypes.CATEGORY.GET_ALL, payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/categories/getAllCategories', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const createCategory = (newCategory) => async (dispatch) => {
  try {
    console.log('crae', newCategory);
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.createCategory(newCategory);
    dispatch({ type: actionTypes.CATEGORY.CREATE, payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/categories/createCategory', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const updateCategory = (id, updatedCategory) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.updateCategory(id, updatedCategory);
    console.log('updateCategory', data);
    dispatch({ type: actionTypes.CATEGORY.UPDATE, payload: data.data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/categories/updateCategory', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    await api.deleteCategory(id);
    dispatch({ type: actionTypes.CATEGORY.DELETE, payload: { _id: id } });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/categories/deleteCategory', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};
