import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';
import { removeItem } from './cartSlice';

const initialState = {
  isLoading: false,
  error: null,
  activeStep: 0,
  orderInfo: {},
  orderCreated: null
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.error = action.payload;
      state.isLoading = false;
    },
    setOrderInfo(state, action) {
      state.orderInfo = action.payload;
    },
    backStepOrder(state) {
      state.activeStep -= 1;
    },
    nextStepOrder(state) {
      state.activeStep += 1;
    },
    createdOrder(state, action) {
      state.isLoading = false;
      state.error = null;
      state.orderCreated = action.payload;
    }
  }
});

const { actions, reducer } = orderSlice;
export default reducer;
export const { setOrderInfo, backStepOrder, nextStepOrder } = actions;

export const createOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch(actions.startLoading());

    const { orderInfo } = getState().order;
    const { allItems, selectedItems } = getState().cart;

    const buyItems = allItems
      .filter(
        (item) =>
          selectedItems.findIndex((slcItem) => item.productId === slcItem.productId && item.sku === slcItem.sku) > -1
      )
      .map((item) => ({
        productId: item.productId,
        sku: item.sku,
        qty: item.qty
      }));

    const customer = {
      name: orderInfo.name,
      phone: orderInfo.phone
    };

    const address = {
      street: orderInfo.street,
      ward: orderInfo.ward,
      district: orderInfo.district,
      province: orderInfo.province,
      name: orderInfo.name,
      phone: orderInfo.phone
    };

    const dataToSend = {
      ...orderData,
      ...orderInfo,
      customerInfo: customer,
      address,
      items: buyItems
    };

    const { data } = await api.createOrder(dataToSend);
    dispatch(
      actions.createdOrder({
        ...data.data,
        paymentUrl: data.paymentUrl
      })
    );
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < buyItems.length; i++) {
      const element = buyItems[i];
      dispatch(removeItem(element));
    }
  } catch (error) {
    dispatch(actions.hasError(error));
  }
};
