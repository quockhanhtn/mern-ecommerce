import * as actionTypes from '../constants/actionTypes';

const initialState = { isLoading: true, hasError: false, list: [] };

const brandsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.START_LOADING:
      return { ...state, isLoading: true };
    case actionTypes.END_LOADING:
      return { ...state, isLoading: false };
    case actionTypes.HAS_ERROR:
      return { ...state, isLoading: false, hasError: true };
    case actionTypes.BRAND.GET_ALL:
      return { ...state, list: payload.data };
    case actionTypes.BRAND.GET_ONE:
      return { ...state, item: payload };
    case actionTypes.BRAND.CREATE:
      return { ...state, list: [payload.data, ...state.list] };
    case actionTypes.BRAND.UPDATE:
      return {
        ...state,
        list: state.list.map((post) => (post._id === payload._id ? payload : post))
      };
    case actionTypes.BRAND.DELETE:
      return { ...state, list: state.list.filter((post) => post._id !== payload._id) };
    default:
      return state;
  }
};

export default brandsReducer;