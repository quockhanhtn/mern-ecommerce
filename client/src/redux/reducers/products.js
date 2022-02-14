import * as actionTypes from '../../constants/actionTypes';

const initialState = { isLoading: true, hasError: false, list: [], listFull: [], item: {}, pagination: {} };

const productsReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.START_LOADING:
      return { ...state, isLoading: true };

    case actionTypes.END_LOADING:
      return { ...state, isLoading: false };

    case actionTypes.HAS_ERROR:
      return { ...state, isLoading: false, hasError: true };

    case actionTypes.PRODUCT.GET_ALL:
      return { ...state, list: payload.data, hasError: false, pagination: payload.pagination };

    case actionTypes.PRODUCT.GET_FULL_ALL:
      return { ...state, listFull: payload.data, hasError: false };

    case actionTypes.PRODUCT.GET_ONE:
      return { ...state, item: payload, hasError: false };

    case actionTypes.PRODUCT.CREATE:
      return { ...state, list: [payload.data, ...state.list], hasError: false };

    case actionTypes.PRODUCT.UPDATE:
      return {
        ...state,
        list: state.list.map((cat) => (cat._id === payload._id ? payload : cat)),
        hasError: false
      };

    case actionTypes.PRODUCT.DELETE:
      return { ...state, list: state.list.filter((cat) => cat._id !== payload), hasError: false };

    case actionTypes.PRODUCT.CREATE_VARIANT:
      return { ...state, list: [payload.data, ...state.list], hasError: false };

    case actionTypes.PRODUCT.UPDATE_VARIANT:
      return {
        ...state,
        list: state.list.map((cat) => (cat._id === payload._id ? payload : cat)),
        hasError: false
      };

    case actionTypes.PRODUCT.DELETE_VARIANT:
      return { ...state, list: state.list.variants.filter((cat) => cat.sku !== payload), hasError: false };

    default:
      return state;
  }
};

export default productsReducer;
