import * as actionTypes from '../../constants/actionTypes';
import * as api from '../../api';

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const handleError = (dispatch, e, logTag) => {
  console.error(`[actions]${logTag} error`, e?.response?.data || e);
  dispatch({ type: actionTypes.COMMENT.ERROR, payload: e?.response?.data || e });
};

export const getAllComments = (product) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.COMMENT.START_LOADING });

    if (isDev) console.log('[actions][comments][getAll] dataInput', product);
    const { data } = await api.getAllComment(product);
    if (isDev) console.log('[actions][comments][getAll] result', data);

    dispatch({ type: actionTypes.COMMENT.GET_ALL, payload: data });
    dispatch({ type: actionTypes.COMMENT.END_LOADING });
  } catch (e) {
    handleError(dispatch, e, '[comments][getAll]');
  }
};

export const createComment = (newComment) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.COMMENT.START_LOADING });

    if (isDev) console.log('[actions][comments][create] dataInput', newComment);
    const { data } = await api.createComment(newComment);
    if (isDev) console.log('[actions][comments][create] result', data);

    dispatch({ type: actionTypes.COMMENT.CREATE, payload: data });
    dispatch({ type: actionTypes.COMMENT.END_LOADING });
  } catch (e) {
    handleError(dispatch, e, '[comments][create]');
  }
};
