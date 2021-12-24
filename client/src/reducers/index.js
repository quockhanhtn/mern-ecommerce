import { combineReducers } from 'redux';
import categoriesReducer from './categories';
import brandsReducer from './brands';
import discountsReducer from './discounts';
import productsReducer from './products';
import usersReducer from './users';
import accountReducer from './account';
import ordersReducer from './orders';
import commentsReduces from './comments';

const rootReducer = combineReducers({
  category: categoriesReducer,
  brand: brandsReducer,
  discount: discountsReducer,
  product: productsReducer,
  user: usersReducer,
  account: accountReducer,
  order: ordersReducer,
  comment: commentsReduces
});

export default rootReducer;
