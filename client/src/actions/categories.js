import * as actionTypes from '../constants/actionTypes';
import * as api from '../api';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const getAllCategories = (isSimple) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });

    const { data } = await api.getAllCategory(isSimple ? 'name slug image' : null);
    if (isDev) console.log('[actions][categories][getAll] result', data);

    dispatch({
      type: isSimple ? actionTypes.CATEGORY.GET_ALL_SIMPLE : actionTypes.CATEGORY.GET_ALL,
      payload: data
    });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('[actions][categories][getAll] error', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const createCategory = (newCategory) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });

    if (isDev) console.log('[actions][categories][create] dataInput', newCategory);
    const { data } = await api.createCategory(newCategory);
    if (isDev) console.log('[actions][categories][create] result', data);

    dispatch({ type: actionTypes.CATEGORY.CREATE, payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('[actions][categories][create] error', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const updateCategory = (id, updatedCategory) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });

    if (isDev) console.log('[actions][categories][update] dataInput', updatedCategory);
    const { data } = await api.updateCategory(id, updatedCategory);
    if (isDev) console.log('[actions][categories][update] result', data);

    dispatch({ type: actionTypes.CATEGORY.UPDATE, payload: data.data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('[actions][categories][update] error', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });

    if (isDev) console.error('[actions][categories][delete] dataInput', id);
    await api.deleteCategory(id);

    dispatch({ type: actionTypes.CATEGORY.DELETE, payload: { _id: id } });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    if (isDev) console.error('[actions][categories][delete] error', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};
