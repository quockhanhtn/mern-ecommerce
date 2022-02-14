import * as actionTypes from '../../constants/actionTypes';

const initialState = {
  isLoading: true,
  error: null,
  list: [],
  listSimple: []
};

const commentsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.COMMENT.START_LOADING:
      return { ...state, isLoading: true };

    case actionTypes.COMMENT.END_LOADING:
      return { ...state, isLoading: false };

    case actionTypes.COMMENT.ERROR:
      return { ...state, isLoading: false, error: action.payload };

    case actionTypes.COMMENT.GET_ALL:
      return { ...state, list: payload.data, error: null };

    case actionTypes.COMMENT.GET_ONE:
      return { ...state, item: payload, error: null };

    case actionTypes.COMMENT.CREATE:
      return { ...state, list: [payload.data, ...state.list], error: null };

    case actionTypes.COMMENT.UPDATE:
      return {
        ...state,
        list: state.list.map((o) => (o._id === payload._id ? payload : o)),
        error: null
      };

    case actionTypes.COMMENT.DELETE:
      return { ...state, list: state.list.filter((o) => o._id !== payload._id), error: null };

    default:
      return state;
  }
};

export default commentsReducer;
