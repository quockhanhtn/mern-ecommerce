import { combineReducers } from 'redux';
import categorySlice from './slices/categorySlice';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';
import accountSlice from './slices/accountSlice';

// import brandsReducer from './reducers/brands';
import brandSlice from './slices/brandSlice';
import discountsReducer from './reducers/discounts';
import productsReducer from './slices/productSlice';
import usersReducer from './reducers/users';
// import accountReducer from './reducers/account';
import ordersReducer from './reducers/orders';
import commentsReduces from './reducers/comments';
import userBehaviorSlice from './slices/userBehaviorSlice';

const rootReducer = combineReducers({
  category: categorySlice,
  cart: cartSlice,
  order: orderSlice,
  account: accountSlice,

  brand: brandSlice,
  discount: discountsReducer,
  product: productsReducer,
  user: usersReducer,
  // account: accountReducer,
  orderManager: ordersReducer,
  comment: commentsReduces,

  userBehavior: userBehaviorSlice
});

export default rootReducer;
