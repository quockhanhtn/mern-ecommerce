// import { createStore, applyMiddleware, compose } from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import rootReducer from './reducers';

// // enable redux dev tools in development mode
// const composeEnhancers =
//   process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose : compose;

// // use redux-thunk as middleware
// const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware));

// const store = createStore(rootReducer, {}, enhancer);
// export default store;

import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import rootReducer from './rootReducer';

const middleware = (getDefaultMiddleware) => {
  let middlewares = getDefaultMiddleware({
    serializableCheck: false
  });

  if (process.env.NODE_ENV === `development`) {
    middlewares = middlewares.concat(logger);
  }
  return middlewares;
};

const store = configureStore({
  middleware,
  reducer: rootReducer
});

export default store;
