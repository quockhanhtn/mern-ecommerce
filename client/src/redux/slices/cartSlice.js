import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

const initialState = {
  isLoading: true,
  error: null,
  isAuthenticated: false,
  selectedItems: [],
  itemsCount: 0,
  allItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : []
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
    getItems(state, action) {
      state.allItems = action.payload;
      state.itemsCount = action.payload.length;
      state.isLoading = false;
      state.error = null;
      localStorage.setItem('cart', JSON.stringify(state.allItems));
    },
    addItem(state, action) {
      state.allItems.push(action.payload);
      state.itemsCount = state.allItems.length;
      state.isLoading = false;
      state.error = null;
      localStorage.setItem('cart', JSON.stringify(state.allItems));
    },
    updateItem(state, action) {
      const { productId, sku, qty } = action.payload;
      const updateIndex = state.allItems.findIndex((item) => item.productId === productId && item.sku === sku);

      state.allItems[updateIndex].qty = qty;
      state.isLoading = false;
      state.error = null;
      localStorage.setItem('cart', JSON.stringify(state.allItems));
    },
    removeItem(state, action) {
      const { productId, sku } = action.payload;

      state.allItems = state.allItems.filter((item) => item.productId !== productId && item.sku !== sku);
      state.itemsCount = state.allItems.length;
      state.isLoading = false;
      state.error = null;
    }
  }
});

const { actions, reducer } = cartSlice;
export default reducer;

export const syncCart = (isAuthenticated) => async (dispatch, getState) => {
  try {
    dispatch(actions.startLoading());
    dispatch(actions.setAuthenticated(isAuthenticated));
    const { data } = await api.getCartItems(getState().cart.allItems);
    dispatch(actions.getItems(data.data || []));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const getCartItems = () => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.getCartItems();
    dispatch(actions.getItems(data.data || []));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const addItemToCart = (item) => async (dispatch, getState) => {
  try {
    dispatch(actions.startLoading());
    if (getState().cart.isAuthenticated) {
      const { data } = await api.addItemToCart(item);
      dispatch(actions.addItem(data.data));
    } else {
      // todo: add item to local storage
    }
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const increaseItemQty = (item) => async (dispatch, getState) => {
  try {
    dispatch(actions.startLoading());
    if (getState().cart.isAuthenticated) {
      await api.increaseQty(item);
    }
    dispatch(actions.updateItem({ ...item, qty: item.qty + 1 }));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const decreaseItemQty = (item) => async (dispatch, getState) => {
  try {
    dispatch(actions.startLoading());
    if (getState().cart.isAuthenticated) {
      await api.decreaseQty(item);
    }
    dispatch(actions.updateItem({ ...item, qty: item.qty - 1 }));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const deleteProductToCartDB = (productInfo) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { productId, sku } = productInfo;
    await api.removeItemFromCart(productId, sku);
    dispatch(actions.removeItem({ productId, sku }));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const cleanProductToCartDB = () => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    await api.cleanCart();
    dispatch(actions.removeItem([]));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};
