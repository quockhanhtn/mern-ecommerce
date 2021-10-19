import { combineReducers } from 'redux';
import categoriesReducer from './categories';

const rootReducer = combineReducers({
  category: categoriesReducer
});

export default rootReducer;
