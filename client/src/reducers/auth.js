import * as actionTypes from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  error: null,
  isAuthenticated: false,
  user: null
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.START_LOADING:
      return { ...state, isLoading: true };

    case actionTypes.END_LOADING:
      return { ...state, isLoading: false };

    case actionTypes.HAS_ERROR:
      return { ...state, isLoading: false, error: payload };

    case actionTypes.AUTH.REGISTER:
      // to do
      return { ...state, user: payload.data, error: null };

    case actionTypes.AUTH.LOGIN:
      return {
        ...state,
        isAuthenticated: true,
        user: payload.user,
        error: null
      };

    case actionTypes.AUTH.LOGOUT:
      return {
        ...state,
        isAuthenticated: false,
        user: null
      };

    default:
      return state;
  }
};

export default authReducer;
