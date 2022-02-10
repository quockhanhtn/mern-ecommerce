import * as actionTypes from '../../constants/actionTypes';

const initialState = { isLoading: true, hasError: false, list: [] };

const usersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.START_LOADING:
      return { ...state, isLoading: true };

    case actionTypes.END_LOADING:
      return { ...state, isLoading: false };

    case actionTypes.HAS_ERROR:
      return { ...state, isLoading: false, hasError: true };

    case actionTypes.USER.GET_ALL:
      return { ...state, list: payload.data, hasError: false };

    case actionTypes.USER.GET_ONE:
      return { ...state, item: payload, hasError: false };

    case actionTypes.USER.CREATE:
      return { ...state, list: [payload.data, ...state.list], hasError: false };

    case actionTypes.USER.UPDATE:
      return {
        ...state,
        list: state.list.map((cat) => (cat._id === payload._id ? payload : cat)),
        hasError: false
      };

    case actionTypes.USER.DELETE:
      return { ...state, list: state.list.filter((cat) => cat._id !== payload), hasError: false };

    default:
      return state;
  }
};

export default usersReducer;
