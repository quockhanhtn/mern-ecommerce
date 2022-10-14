import { createSlice } from '@reduxjs/toolkit';
import * as api from '~/api';

const initialState = {
  isLoading: true,
  error: null,
  deletedIds: [],
  item: null,
  list: [],
  listSimple: []
};

const categorySlice = createSlice({
  name: 'category',
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
      return {
        ...state,
        list: state.list.map((cat) => (cat._id === action.payload._id ? action.payload : cat)),
        isLoading: false,
        error: null
      };
    },
    delete(state, action) {
      state.isLoading = false;
      state.error = null;
      state.list = state.list.filter((cat) => cat._id !== action.payload._id);
      state.deletedIds.push(action.payload._id);
    }
  }
});

const { actions, reducer } = categorySlice;

export default reducer;

export const getAllCategories = (isSimple) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.getAllCategory(isSimple ? 'name slug image' : null);
    if (isSimple) {
      dispatch(actions.getSimpleSuccess(data.data));
    } else {
      dispatch(actions.getAllSuccess(data.data));
    }
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const createCategory = (newCategory) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.createCategory(newCategory);
    dispatch(actions.create(data.data));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const updateCategory = (id, updatedCategory) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    const { data } = await api.updateCategory(id, updatedCategory);
    dispatch(actions.update(data.data));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    dispatch(actions.startLoading());
    await api.deleteCategory(id);
    dispatch(actions.delete({ _id: id }));
  } catch (e) {
    dispatch(actions.hasError(e?.response?.data || e));
  }
};
