import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';
import { removeItem } from './cartSlice';

const initialState = {
  isLoading: false,
  error: null,
  activeStep: 0,
  orderInfo: {},
  orderCreated: null,
  fee: {
    subTotal: 0,
    saveMoney: 0,
    discount: 0,
    shipping: 0,
    total: 0
  },
  discountApplied: {}
};

const calculateShippingFee = (orderInfo, currentFee) => {
  let shipping;
  if (currentFee.subTotal > 500000 || orderInfo?.isReceiveAtStore) {
    shipping = 0;
  } else if (orderInfo?.province?.toUpperCase().includes('HỒ CHÍ MINH')) {
    shipping = 20000;
  } else {
    shipping = 30000;
  }
  const total = currentFee.subTotal + shipping - currentFee.discount;
  return { ...currentFee, total, shipping };
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
      state.fee = calculateShippingFee(action.payload, state.fee);
    },
    setAppliedDiscount(state, action) {
      state.fee = {
        ...state.fee,
        total: state.fee.subTotal + state.fee.shipping - action.payload.amount,
        discount: action.payload.amount
      };
      state.discountApplied = action.payload.info;
    },
    backStepOrder(state) {
      state.activeStep -= 1;
    },
    nextStepOrder(state) {
      state.activeStep += 1;
    },
    updateFee(state, action) {
      state.fee = { ...action.payload };
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
export const { setOrderInfo, backStepOrder, nextStepOrder, setAppliedDiscount } = actions;

export const updateFeeFromCart = () => async (dispatch, getState) => {
  const { fee } = getState().cart;
  dispatch(actions.updateFee(fee));
};

export const createOrder = (orderData) => async (dispatch, getState) => {
  try {
    dispatch(actions.startLoading());

    const { orderInfo, discountApplied } = getState().order;
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
      items: buyItems,
      discountCode: discountApplied.code
    };

    const { data } = await api.createOrder(dataToSend);
    if (data && data?.message === 'Create order success') {
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
    } else {
      dispatch(
        actions.hasError({
          message: 'Đặt hàng thất bại, vui lòng thử lại !'
        })
      );
    }
  } catch (error) {
    dispatch(actions.hasError(error));
  }
};
