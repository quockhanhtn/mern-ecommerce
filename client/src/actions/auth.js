import * as actionTypes from '../constants/actionTypes';
import * as api from '../api';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const login = (username, password) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });

    const { data } = await api.login(username, password);
    if (isDev) console.log('[actions][auth][login] result', data.data);

    dispatch({ type: actionTypes.AUTH.LOGIN, payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('[actions][auth][login] error', e);
    dispatch({ type: actionTypes.HAS_ERROR, payload: e.response.data });
  }
};

export const register = (registerData) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });

    if (isDev) console.log('[actions][auth][register] dataInput', registerData);
    const { data } = await api.register(registerData);
    if (isDev) console.log('[actions][auth][register] result', data);

    dispatch({ type: actionTypes.AUTH.REGISTER, payload: data });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('[actions][categories][register] error', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const logout = (refreshToken) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.START_LOADING });

    if (isDev) console.log('[actions][auth][logout] logout', refreshToken);
    await api.logout(refreshToken);
    if (isDev) console.log('[actions][auth][logout] success');

    dispatch({ type: actionTypes.AUTH.LOGOUT });
    dispatch({ type: actionTypes.END_LOADING });
  } catch (e) {
    console.error('[actions][auth][logout] error', e);
    dispatch({ type: actionTypes.HAS_ERROR });
  }
};

export const resetPassword = () => async (dispatch) => {
  // todo
  dispatch({ type: actionTypes.START_LOADING });
  dispatch({ type: actionTypes.END_LOADING });
};

export const getInfo = () => async (dispatch) => {
  // todo
  dispatch({ type: actionTypes.START_LOADING });
  dispatch({ type: actionTypes.END_LOADING });
};
