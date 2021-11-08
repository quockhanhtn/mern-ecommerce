import PropTypes from 'prop-types';
import { createContext, useEffect, useReducer } from 'react';
import * as api from '../api';

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
  method: 'jwt',
  register: () => Promise.resolve(),
  login: () => Promise.resolve(),
  logout: () => Promise.resolve()
});

AuthProvider.propTypes = {
  children: PropTypes.node
};

function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const initialize = async () => {
      try {
        const accessToken = window.localStorage.getItem('accessToken');

        if (accessToken && isValidToken(accessToken)) {
          setSession(accessToken);

          const response = await api.getInfo();
          const userInfo = response.data.data;
          console.log(userInfo);

          dispatch({ type: 'INITIALIZE', payload: { isAuthenticated: true, user: userInfo } });
        } else {
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

    initialize();
  }, []);

  const registerAction = async (registerInfo) => {
    const { data } = await api.register(registerInfo);
    const { accessToken, userData } = data;
    window.localStorage.setItem('accessToken', accessToken);
    dispatch({ type: 'REGISTER', payload: { userData } });
  };

  const loginAction = async (username, password) => {
    try {
      if (isDev) console.log('[JWTAuth][login] input', { username, password });
      const { data } = await api.login(username, password);
      if (isDev) console.log('[JWTAuth][login] result', data);
      const { token, refreshToken, user } = data.data;
      setSession(token, refreshToken);
      dispatch({ type: 'LOGIN', payload: { user } });
    } catch (e) {
      dispatch({ type: 'ERROR', payload: e.response.data.message });
      if (isDev) console.log('[JWTAuth][login] error', e.response);
    }
  };

  const logoutAction = async () => {
    setSession(null);
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'jwt',
        register: registerAction,
        login: loginAction,
        logout: logoutAction
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
