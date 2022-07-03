import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
import * as api from '../api';
import { setAuthenticated } from '../redux/slices/cartSlice';

import { isValidToken, setSession } from '../utils/jwt';

// ----------------------------------------------------------------------

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';

const initialState = {
  isAuthenticated: false,
  isInitialized: false,
  errMessage: null,
  user: null
};

const handlers = {
  INITIALIZE: (state, action) => {
    const { isAuthenticated, user } = action.payload;
    return {
      ...state,
      isAuthenticated,
      isInitialized: true,
      user
    };
  },
  CLEAR: (state) => ({
    ...state,
    isAuthenticated: false,
    isInitialized: true,
    user: null,
    errMessage: null
  }),
  LOGIN: (state, action) => ({
    ...state,
    isAuthenticated: true,
    user: action.payload.user
  }),
  LOGOUT: (state) => ({
    ...state,
    isAuthenticated: false,
    user: null
  }),
  REGISTER: (state, action) => {
    const { user } = action.payload;

    return {
      ...state,
      isAuthenticated: true,
      user
    };
  },
  ERROR: (state, action) => ({
    ...state,
    isAuthenticated: false,
    user: null,
    errMessage: action.payload
  })
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

const reducer = (state, action) => (handlers[action.type] ? handlers[action.type](state, action) : state);

const AuthContext = createContext({
  isAuthenticated: false,
  isInitialized: false,
  user: null,
  register: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  reInitialize: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const initialize = async () => {
    try {
      const accessToken = window.localStorage.getItem('accessToken');

      if (accessToken && isValidToken(accessToken)) {
        setSession(accessToken);

        const { data } = await api.getAccountInfo();
        const userInfo = data.data;

        dispatch({ type: 'INITIALIZE', payload: { isAuthenticated: true, user: userInfo } });
      } else {
        setSession(null); // clear session
        dispatch({ type: 'INITIALIZE', payload: { isAuthenticated: false, user: null } });
      }
    } catch (err) {
      console.error(err);
      dispatch({
        type: 'INITIALIZE',
        payload: {
          isAuthenticated: false,
          user: null
        }
      });
    }
  };

  useEffect(() => {
    initialize();
  }, []);

  const handleError = (e, logTag) => {
    if (isDev) console.log(`[Auth][${logTag}] error`, e?.response?.data || e);
    dispatch({ type: 'ERROR', payload: e?.response?.data?.message || e?.response?.data || e });
  };

  const registerAction = async (registerInfo) => {
    const { data } = await api.register(registerInfo);
    const { accessToken, userData } = data;
    window.localStorage.setItem('accessToken', accessToken);
    dispatch({ type: 'REGISTER', payload: { userData } });
  };

  const googleOAuthAction = async (accessToken) => {
    try {
      dispatch({ type: 'CLEAR' });
      if (isDev) console.log('[Auth][googleOAuth] input', { accessToken });

      const { data } = await api.googleOAuth(accessToken);
      if (isDev) console.log('[Auth][googleOAuth] result', data);

      const { token, refreshToken, user } = data.data;
      setSession(token, refreshToken);

      dispatch({ type: 'LOGIN', payload: { user } });
    } catch (e) {
      handleError(e, 'googleOAuth');
    }
  };

  const loginAction = async (username, password) => {
    try {
      dispatch({ type: 'CLEAR' });
      if (isDev) console.log('[Auth][login] input', { username, password });

      const { data } = await api.login(username, password);
      if (isDev) console.log('[Auth][login] result', data);

      const { token, refreshToken, user } = data.data;
      setSession(token, refreshToken);

      dispatch({ type: 'LOGIN', payload: { user } });
    } catch (e) {
      handleError(e, 'login');
    }
  };

  const logoutAction = async () => {
    localStorage.removeItem('orderLocalStorage');
    localStorage.removeItem('cart');
    setSession(null);
    dispatch({ type: 'LOGOUT' });
    dispatch(setAuthenticated(false));
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        register: registerAction,
        login: loginAction,
        logout: logoutAction,
        googleOAuth: googleOAuthAction,
        reInitialize: initialize
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
