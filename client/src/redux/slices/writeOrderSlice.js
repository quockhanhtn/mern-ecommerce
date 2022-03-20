import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

const initialState = {
  isLoading: true,
  error: null,
  item: null,
  list: []
};

const writeOrderSlice = createSlice({
  name: 'writeOrder',
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

const { actions, reducer } = writeOrderSlice;

export default reducer;

export const addProductToCartDB = (newProduct) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.addProductToCartDB(newProduct);
    dispatch(actions.create(data.data));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const increaseProductToCartDB = (productInfo) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.increaseProductToCartDB(productInfo);
    dispatch(actions.update(data.data));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const decreaseProductToCartDB = (productInfo) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.decreaseProductToCartDB(productInfo);
    dispatch(actions.update(data.data));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const deleteProductToCartDB = (productInfo) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    await api.deleteProductToCartDB(productInfo);
    dispatch(actions.delete({ _id: productInfo.productId }));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const getProductToCartDB = () => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.getProductToCartDB();
    dispatch(actions.getAllSuccess(data.data));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};
