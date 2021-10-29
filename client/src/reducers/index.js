import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import brandsReducer from './brands';
import discountsReducer from './discounts';
import productsReducer from './products';
import usersReducer from './users';

const rootReducer = combineReducers({
  category: categoriesReducer,
  brand: brandsReducer,
  discount: discountsReducer,
  product: productsReducer,
  user: usersReducer
});

export default rootReducer;
