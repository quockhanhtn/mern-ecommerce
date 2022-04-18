import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

const initialState = {
  isLoading: true,
  error: null,
  item: null,
  list: []
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
    getAllSuccess(state, action) {
      state.list = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    create(state, action) {
      state.list.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    update(state, action) {
      return {
        ...state,
        list: state.list.map((cat) => (cat._id === action.payload._id ? action.payload : cat)),
        isLoading: false,
        error: null
      };
    },
    delete(state, action) {
      return {
        ...state,
        list: state.list.filter((cat) => cat._id !== action.payload._id),
        isLoading: false,
        error: null
      };
    }
  }
});

const { actions, reducer } = cartSlice;

export default reducer;

export const addItemToCart = (item) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.addItemToCart(item);
    dispatch(actions.create(data.data));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const increaseProductToCartDB = (productInfo) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.increaseQty(productInfo);
    dispatch(actions.update(data.data));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const decreaseProductToCartDB = (productInfo) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.decreaseQty(productInfo);
    dispatch(actions.update(data.data));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const deleteProductToCartDB = (productInfo) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { productId, sku } = productInfo;
    await api.removeItem(productId, sku);
    dispatch(actions.delete({ productId, sku }));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const getProductToCartDB = () => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.getCartItems();
    dispatch(actions.getAllSuccess(data.data || []));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const cleanProductToCartDB = () => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    await api.cleanCart();
    dispatch(actions.delete([]));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};
