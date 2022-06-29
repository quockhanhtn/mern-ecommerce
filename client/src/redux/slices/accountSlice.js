import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

const initialState = {
  addresses: {
    isLoading: false,
    error: null,
    list: []
  }
};

const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    addressesStartLoading(state) {
      state.addresses.isLoading = true;
    },
    addressesHasError(state, action) {
      state.addresses.error = action.payload;
      state.addresses.isLoading = false;
    },
    addressesGetAllSuccess(state, action) {
      state.addresses.list = action.payload;
      state.addresses.isLoading = false;
      state.addresses.error = null;
    },
    addressesCreateSuccess(state, action) {
      state.addresses.list.push(action.payload);
      state.addresses.isLoading = false;
      state.addresses.error = null;
    },
    addressesUpdateSuccess(state, action) {
      state.addresses.list = state.addresses.list.map((add) => (add._id === action.payload._id ? action.payload : add));
      state.addresses.isLoading = false;
      state.addresses.error = null;
    },
    addressesDeleteSuccess(state, action) {
      state.addresses.list = state.addresses.list.filter((add) => add._id !== action.payload._id);
      state.addresses.isLoading = false;
      state.addresses.error = null;
    }
  }
});

const { actions, reducer } = accountSlice;

export default reducer;

export const addressActions = {
  getAll: () => async (dispatch) => {
    try {
      dispatch(actions.addressesStartLoading());
      const { data } = await api.getAddresses();
      dispatch(actions.addressesGetAllSuccess(data.data));
    } catch (e) {
      dispatch(actions.addressesHasError(e?.response?.data || e));
    }
  },
  create: (newAddress) => async (dispatch) => {
    try {
      dispatch(actions.addressesStartLoading());
      const { data } = await api.addAddress(newAddress);
      dispatch(actions.addressesCreateSuccess(data.data));
    } catch (e) {
      dispatch(actions.addressesHasError(e?.response?.data || e));
    }
  },
  update: (id, updateAddress) => async (dispatch) => {
    try {
      dispatch(actions.addressesStartLoading());
      const { data } = await api.updateAddress(id, updateAddress);
      dispatch(actions.addressesUpdateSuccess(data.data));
    } catch (e) {
      dispatch(actions.addressesHasError(e?.response?.data || e));
    }
  },
  delete: (id) => async (dispatch) => {
    try {
      dispatch(actions.addressesStartLoading());
      await api.deleteAddress(id);
      dispatch(actions.addressesDeleteSuccess({ _id: id }));
    } catch (e) {
      dispatch(actions.addressesHasError(e?.response?.data || e));
    }
  }
};
