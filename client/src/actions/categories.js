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

export const createCategory = (category) => ({
  type: actionTypes.CATEGORY.CREATE,
  payload: category
});

export const updateCategory = (category) => ({
  type: actionTypes.CATEGORY.UPDATE,
  payload: category
});

export const deleteCategory = (category) => ({
  type: actionTypes.CATEGORY.DELETE,
  payload: category
});
