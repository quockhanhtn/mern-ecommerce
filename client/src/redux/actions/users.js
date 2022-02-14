import * as actionTypes from '../../constants/actionTypes';
import * as api from '../../api';

// --------------------------------- Staff -------------------------------

export const getAllStaffs = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.getAllStaffs();
    dispatch({ type: actionTypes.USER.GET_ALL, payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/users/getAllUsers', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

// --------------------------------- End staff ---------------------------

export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.getAllCustomers();
    dispatch({ type: actionTypes.USER.GET_ALL, payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/users/getAllUsers', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const createUser = (createUser) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.createUser(createUser);
    dispatch({ type: actionTypes.USER.CREATE, payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/users/createUser', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const updateUser = (id, updateUser) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    const { data } = await api.updateUser(id, updateUser);
    dispatch({ type: actionTypes.USER.UPDATE, payload: data.data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/users/updateUser', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });
    await api.deleteUser(id);
    dispatch({ type: actionTypes.USER.DELETE, payload: id });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/users/deleteUser', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};
