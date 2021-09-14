---
title: State Management
---

## State Management

Redux is a predictable state container for JavaScript apps.

It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience

---

#### Creating a new slice

Create new slice inside `src/redux/slices/product.js`

```js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoading: false,
  error: false,
  products: []

const slice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET PRODUCTS
    getProductsSuccess(state, action) {
      state.isLoading = false;
      state.products = action.payload;
    }
  }
});

export default slice.reducer;

export function getProducts() {
  return async dispatch => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/api/products');
      dispatch(slice.actions.getProductsSuccess(response.data.products));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

```

<br/>

#### Import slice

import slice inside `src/redux/rootReducer.js`

```js
import { combineReducers } from 'redux';
import productReducer from './slices/product';

const rootReducer = combineReducers({
  product: productReducer
});

export { rootReducer };
```

if you want to use Redux with localStorage

```js
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import productReducer from './slices/product';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  keyPrefix: 'redux-',
  version: 1,
  whitelist: ['products']
};

const rootReducer = combineReducers({
  product: productReducer
});

export { rootReducer };
```

<br/>

#### Usage

```js
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from 'src/redux/slices/product';

function Shop() {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <div>{product.name}</div>
          <div>{product.price}</div>
          <img src={product.img} alt={product.name} />
        </div>
      ))}
    </div>
  );
}
```
