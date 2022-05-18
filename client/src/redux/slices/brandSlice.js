import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

const initialState = {
  isLoading: true,
  error: null,
  deletedIds: [],
  item: null,
  list: [],
  listSimple: []
};

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    getSimpleSuccess(state, action) {
      state.listSimple = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getAllSuccess(state, action) {
      state.list = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    getOneSuccess(state, action) {
      state.item = action.payload;
      state.isLoading = false;
      state.error = null;
    },
    create(state, action) {
      state.list.push(action.payload);
      state.isLoading = false;
      state.error = null;
    },
    update(state, action) {
      state.isLoading = false;
      state.error = null;
      state.list = state.list.map((brand) => (brand._id === action.payload._id ? action.payload : brand));
    },
    delete(state, action) {
      state.isLoading = false;
      state.error = null;
      state.list = state.list.filter((brand) => brand._id !== action.payload._id);
      state.deletedIds.push(action.payload._id);
    }
  }
});

const { actions, reducer } = brandSlice;

export default reducer;

export const getAllBrands = (isSimple) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.getAllBrand(isSimple ? 'name slug image' : null);
    if (isSimple) {
      dispatch(actions.getSimpleSuccess(data.data));
    } else {
      dispatch(actions.getAllSuccess(data.data));
    }
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const createBrand = (newBrand) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.createBrand(newBrand);
    dispatch(actions.create(data.data));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const updateBrand = (id, updateBrand) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.updateBrand(id, updateBrand);
    dispatch(actions.update(data.data));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const deleteBrand = (id) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    await api.deleteBrand(id);
    dispatch(actions.delete({ _id: id }));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};
