import { combineReducers } from 'redux';
import categoryReducer from './slices/categorySlice';
import brandsReducer from '../reducers/brands';
import discountsReducer from '../reducers/discounts';
import productsReducer from '../reducers/products';
import usersReducer from '../reducers/users';
import accountReducer from '../reducers/account';
import ordersReducer from '../reducers/orders';
import commentsReduces from '../reducers/comments';

const rootReducer = combineReducers({
  category: categoryReducer,

  brand: brandsReducer,
  discount: discountsReducer,
  product: productsReducer,
  user: usersReducer,
  account: accountReducer,
  order: ordersReducer,
  comment: commentsReduces
});

export default rootReducer;
