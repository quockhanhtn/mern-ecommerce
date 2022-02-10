import * as actionTypes from '../../constants/actionTypes';

const initialState = { isLoading: true, hasError: false, list: [], listSimple: [] };

const discountsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.START_LOADING:
      return { ...state, isLoading: true };

    case actionTypes.END_LOADING:
      return { ...state, isLoading: false };

    case actionTypes.HAS_ERROR:
      return { ...state, isLoading: false, hasError: true };

    case actionTypes.DISCOUNT.GET_ALL:
      return { ...state, list: payload.data, hasError: false };

    case actionTypes.DISCOUNT.GET_ALL_SIMPLE:
      return { ...state, listSimple: payload.data, hasError: false };

    case actionTypes.DISCOUNT.GET_ONE:
      return { ...state, item: payload, hasError: false };

    case actionTypes.DISCOUNT.CREATE:
      return { ...state, list: [payload.data, ...state.list], hasError: false };

    case actionTypes.DISCOUNT.UPDATE:
      return {
        ...state,
        list: state.list.map((post) => (post._id === payload._id ? payload : post))
      };
    case actionTypes.DISCOUNT.DELETE:
      return { ...state, list: state.list.filter((post) => post._id !== payload._id) };
    default:
      return state;
  }
};

export default discountsReducer;
