import * as actionTypes from '../constants/actionTypes';
import * as api from '../api';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

export const getAllAddresses = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ACCOUNT.ADDRESS.START_LOADING });

    const { data } = await api.getAddresses();
    if (isDev) console.log('[actions][account][addressed][getAll] result', data);

    dispatch({ type: actionTypes.ACCOUNT.ADDRESS.GET_ALL, payload: data });
    dispatch({ type: actionTypes.ACCOUNT.ADDRESS.END_LOADING });
  } catch (e) {
    console.error('[actions][account][addressed][getAll] error', e);
    dispatch({ type: actionTypes.ACCOUNT.ADDRESS.ERROR, payload: e.data.message });
  }
};

export const createAddress = (newAddress) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ACCOUNT.ADDRESS.START_LOADING });

    if (isDev) console.log('[actions][account][addressed][create] dataInput', newAddress);
    const { data } = await api.addAddress(newAddress);
    if (isDev) console.log('[actions][account][addressed][create] result', data);

    dispatch({ type: actionTypes.ACCOUNT.ADDRESS.CREATE, payload: data });
    dispatch({ type: actionTypes.ACCOUNT.ADDRESS.END_LOADING });
  } catch (e) {
    console.error('[actions][account][addressed][create] error', e);
    dispatch({ type: actionTypes.ACCOUNT.ADDRESS.ERROR, payload: e.data.message });
  }
};

export const updateBrand = (id, updateAddress) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ACCOUNT.ADDRESS.START_LOADING });

    if (isDev) console.log('[actions][account][addressed][update] dataInput', updateAddress);
    const { data } = await api.updateAddress(id, updateAddress);
    if (isDev) console.log('[actions][account][addressed][update] result', data);

    dispatch({ type: actionTypes.ACCOUNT.ADDRESS.UPDATE, payload: data.data });
    dispatch({ type: actionTypes.ACCOUNT.ADDRESS.END_LOADING });
  } catch (e) {
    console.error('Error when get posts in actions/brands/updateBrand', e);
    dispatch({ type: actionTypes.ACCOUNT.ADDRESS.ERROR, payload: e.data.message });
  }
};

export const deleteBrand = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ACCOUNT.ADDRESS.START_LOADING });

    if (isDev) console.error('[actions][account][addressed][delete] dataInput', id);
    await api.deleteAddress(id);

    dispatch({ type: actionTypes.ACCOUNT.ADDRESS.DELETE, payload: id });
    dispatch({ type: actionTypes.ACCOUNT.ADDRESS.END_LOADING });
  } catch (e) {
    if (isDev) console.error('[actions][account][addressed][delete] error', e);
    dispatch({ type: actionTypes.ACCOUNT.ADDRESS.ERROR, payload: e.data.message });
  }
};
