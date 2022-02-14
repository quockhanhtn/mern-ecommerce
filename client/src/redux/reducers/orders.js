import * as actionTypes from '../../constants/actionTypes';

const initialState = {
  isLoading: true,
  error: null,
  list: [],
  listSimple: []
};

const ordersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.ORDER.START_LOADING:
      return { ...state, isLoading: true };

    case actionTypes.ORDER.END_LOADING:
      return { ...state, isLoading: false };

    case actionTypes.ORDER.ERROR:
      return { ...state, isLoading: false, error: action.payload };

    case actionTypes.ORDER.GET_ALL:
      return { ...state, list: payload.data, error: null };

    case actionTypes.ORDER.GET_ONE:
      return { ...state, item: payload, error: null };

    case actionTypes.ORDER.CREATE:
      return { ...state, list: [payload.data, ...state.list], error: null };

    case actionTypes.ORDER.UPDATE:
      return {
        ...state,
        list: state.list.map((o) => (o._id === payload._id ? payload : o)),
        error: null
      };

    case actionTypes.ORDER.DELETE:
      return { ...state, list: state.list.filter((o) => o._id !== payload._id), error: null };

    default:
      return state;
  }
};

export default ordersReducer;
