import * as actionTypes from '../../constants/actionTypes';
import { orderManager as apiOrderMgr } from '../../api';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const handleError = (dispatch, e, logTag) => {
  console.error(`[actions]${logTag} error`, e?.response?.data || e);
  dispatch({ type: actionTypes.ORDER.ERROR, payload: e?.response?.data || e });
};

export const getAllOrders = (search, status, paymentStatus, page, limit) => async (dispatch) => {
  try {
    page = Number.parseInt(page, 10) || 1;
    limit = Number.parseInt(limit, 10) || 10;

    dispatch({ type: actionTypes.ORDER.START_LOADING });

    const { data } = await apiOrderMgr.getAll(search, status, paymentStatus, page, limit);
    if (isDev) console.log('[actions][orders][getAll] result', data);

    dispatch({ type: actionTypes.ORDER.GET_ALL, payload: data });
    dispatch({ type: actionTypes.ORDER.END_LOADING });
  } catch (e) {
    handleError(dispatch, e, '[orders][getAll]');
  }
};

export const createOrder = (newOrder) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ORDER.START_LOADING });

    if (isDev) console.log('[actions][orders][create] dataInput', newOrder);
    const { data } = await apiOrderMgr.create(newOrder);
    if (isDev) console.log('[actions][orders][create] result', data);

    dispatch({ type: actionTypes.ORDER.CREATE, payload: data });
    dispatch({ type: actionTypes.ORDER.END_LOADING });
  } catch (e) {
    handleError(dispatch, e, '[orders][create]');
  }
};

export const updateOrder = (id, updatedOrder) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ORDER.START_LOADING });

    if (isDev) console.log('[actions][orders][update] dataInput', updatedOrder);
    const { data } = await apiOrderMgr.update(id, updatedOrder);
    if (isDev) console.log('[actions][orders][update] result', data);

    dispatch({ type: actionTypes.ORDER.UPDATE, payload: data.data });
    dispatch({ type: actionTypes.ORDER.END_LOADING });
  } catch (e) {
    handleError(dispatch, e, '[orders][update]');
  }
};

export const cancelOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.ORDER.START_LOADING });

    if (isDev) console.error('[actions][orders][cancel] dataInput', id);
    await apiOrderMgr.deleteCategory(id);

    dispatch({ type: actionTypes.ORDER.UPDATE, payload: { _id: id } });
    dispatch({ type: actionTypes.ORDER.END_LOADING });
  } catch (e) {
    handleError(dispatch, e, '[orders][cancel]');
  }
};
