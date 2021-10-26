import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import brandsReducer from './brands';
import discountsReducer from './discounts';

const rootReducer = combineReducers({
  category: categoriesReducer,
  brand: brandsReducer,
  discount: discountsReducer
});

export default rootReducer;
