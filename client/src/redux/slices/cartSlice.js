import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';
import { trackingInCart } from './userBehaviorSlice';

const calculateFee = (allItems, selectedItems) => {
  let saveMoney = 0;
  let subTotal = 0;
  const discount = 0;
  const shipping = 0;
  allItems
    .filter(
      (item) =>
        selectedItems.findIndex((slcItem) => item.productId === slcItem.productId && item.sku === slcItem.sku) > -1
    )
    .forEach((item) => {
      subTotal += item.price * item.qty;
      saveMoney += (item.marketPrice - item.price) * item.qty;
    });

  // if (subTotal <= 100000) {
  //   shipping = 10000;
  // }
  // if (subTotal > 100000) {
  //   discount = 9000;
  //   shipping = 10000;
  // } else if (subTotal > 1000000) {
  //   discount = 50000;
  // } else if (subTotal > 5000000) {
  //   discount = 1000000;
  // } else {
  //   discount = 2500000;
  // }
  saveMoney += discount;

  return { subTotal, saveMoney, discount, shipping, total: subTotal - discount + shipping };
};

const handleUpdateTrackingCart = (productId) => (dispatch, getState) => {
  const { allItems } = getState().cart;
  const countMap = {};

  allItems.forEach((item) => {
    if (countMap[item.productId]) {
      countMap[item.productId] += item.qty;
    } else {
      countMap[item.productId] = item.qty;
    }
  });

  Object.keys(countMap).forEach((productId) => {
    dispatch(
      trackingInCart({
        productId,
        qty: countMap[productId]
      })
    );
  });

  // use when remove item from cart
  if (productId) {
    if (allItems.findIndex((item) => item.productId === productId) < 0) {
      dispatch(trackingInCart({ productId, qty: 0 }));
    }
  }
};

const initialState = {
  isAuthenticated: false,
  isLoading: false,
  error: null,
  allItems: localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [],
  selectedItems: [],
  itemsCount: 0,
  fee: {
    subTotal: 0,
    saveMoney: 0,
    discount: 0,
    shipping: 0,
    total: 0
  }
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
      state.selectedItems = action.payload.map((item) => ({ productId: item.productId, sku: item.sku }));
      state.itemsCount = action.payload.length;
      state.isLoading = false;
      state.error = null;
      state.fee = calculateFee(state.allItems, state.selectedItems);
      localStorage.setItem('cart', JSON.stringify(state.allItems));
    },
    addItem(state, action) {
      const product = state.allItems?.find(
        ({ productId, sku }) => productId === action.payload.productId && sku === action.payload.sku
      );
      if (product && product.skuVariant === action.payload.skuVariant) {
        const index = state.allItems.findIndex(
          (product) => product.productId === action.payload.productId && product.sku === action.payload.sku
        );
        state.allItems.splice(index, 1);
        product.qty += action.payload.qty;
        state.allItems.push(product);
      } else {
        state.allItems.push(action.payload);
      }
      state.selectedItems.push({ productId: action.payload.productId, sku: action.payload.sku });
      state.itemsCount = state.allItems.length;
      state.isLoading = false;
      state.error = null;
      state.fee = calculateFee(state.allItems, state.selectedItems);
      localStorage.setItem('cart', JSON.stringify(state.allItems));
    },
    updateItem(state, action) {
      const { productId, sku, qty } = action.payload;
      const updateIndex = state.allItems.findIndex((item) => item.productId === productId && item.sku === sku);

      state.allItems[updateIndex].qty = qty;
      state.isLoading = false;
      state.error = null;
      state.fee = calculateFee(state.allItems, state.selectedItems);
      localStorage.setItem('cart', JSON.stringify(state.allItems));
    },
    removeItem(state, action) {
      const { productId, sku } = action.payload;

      state.allItems = state.allItems.filter((item) => item.productId !== productId || item.sku !== sku);
      state.selectedItems = state.selectedItems.filter((item) => item.productId !== productId || sku.sku !== sku);
      state.itemsCount = state.allItems.length;
      state.isLoading = false;
      state.error = null;
      state.fee = calculateFee(state.allItems, state.selectedItems);
      localStorage.setItem('cart', JSON.stringify(state.allItems));
    },
    changeSelect(state, action) {
      const { productId, sku, isSelect } = action.payload;

      state.selectedItems = state.selectedItems.filter((item) => item.productId !== productId || item.sku !== sku);
      if (isSelect) {
        state.selectedItems.push({ productId, sku });
      }
      state.fee = calculateFee(state.allItems, state.selectedItems);
    },
    // eslint-disable-next-line no-unused-vars
    selectAllItems(state, action) {
      if (state.selectedItems.length === state.itemsCount) {
        state.selectedItems = [];
      } else {
        state.selectedItems = state.allItems.map((item) => ({ productId: item.productId, sku: item.sku }));
      }
      state.fee = calculateFee(state.allItems, state.selectedItems);
    }
  }
});

const { actions, reducer } = cartSlice;
export default reducer;
export const { setAuthenticated, changeSelect, selectAllItems } = actions;

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

export const addItemToCart = (item, extraInfo) => async (dispatch, getState) => {
  try {
    dispatch(actions.startLoading());
    if (getState().cart.isAuthenticated) {
      const { data } = await api.addItemToCart(item);
      dispatch(actions.addItem(data.data));
    } else {
      dispatch(actions.addItem({ ...item, ...extraInfo }));
    }
    dispatch(handleUpdateTrackingCart());
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
    dispatch(handleUpdateTrackingCart());
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
    dispatch(handleUpdateTrackingCart());
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const removeItem = (item) => async (dispatch, getState) => {
  try {
    dispatch(actions.startLoading());
    const { productId, sku } = item;
    if (getState().cart.isAuthenticated) {
      await api.removeItemFromCart(productId, sku);
    }
    dispatch(actions.removeItem(item));
    dispatch(handleUpdateTrackingCart(productId));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const cleanCart = () => async (dispatch, getState) => {
  try {
    dispatch(actions.startLoading());

    if (getState().cart.isAuthenticated) {
      await api.cleanCart();
    }

    dispatch(actions.getItems([]));
    dispatch(handleUpdateTrackingCart());
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};
