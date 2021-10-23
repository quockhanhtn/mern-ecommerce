import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import brandsReducer from './brands';

const rootReducer = combineReducers({
  category: categoriesReducer,
  brand: brandsReducer
});

export default rootReducer;
