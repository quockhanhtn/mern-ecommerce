import { combineReducers } from 'redux';
import categoryReducer from './slices/categorySlice';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';
import brandsReducer from './reducers/brands';
import discountsReducer from './reducers/discounts';
import productsReducer from './slices/productSlice';
import usersReducer from './reducers/users';
import accountReducer from './reducers/account';
import ordersReducer from './reducers/orders';
import commentsReduces from './reducers/comments';
import userBehaviorSlice from './slices/userBehaviorSlice';

const rootReducer = combineReducers({
  category: categoryReducer,
  cart: cartSlice,
  order: orderSlice,

  brand: brandsReducer,
  discount: discountsReducer,
  product: productsReducer,
  user: usersReducer,
  account: accountReducer,
  orderManager: ordersReducer,
  comment: commentsReduces,

  userBehavior: userBehaviorSlice
});

export default rootReducer;
