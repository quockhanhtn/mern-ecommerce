import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

const BEHAVIOR = {
  VIEW_TIME: 'viewTime',
  VIEW_COUNT: 'viewCount',
  CLICK_COUNT: 'clickCount',
  HOVER_COUNT: 'hoverCount',
  IN_CART_COUNT: 'inCartCount',
  BOUGHT_COUNT: 'bought'
};

const initialState = {
  trackingData: JSON.parse(localStorage.getItem('trackingData')) || {}
};

const userBehaviorSlice = createSlice({
  name: 'userBehavior',
  initialState,
  reducers: {
    updateTrackingData(state, action) {
      const { productId, behaviorData, behaviorProp, mode } = action.payload;

      if (
        Boolean(productId) &&
        (Boolean(behaviorData) || behaviorData === 0) &&
        Boolean(behaviorProp) &&
        Boolean(mode)
      ) {
        if (mode === 'update') {
          if (state.trackingData[productId]) {
            const prevData = state.trackingData[productId]?.[behaviorProp] || 0;
            state.trackingData[productId][behaviorProp] = prevData + behaviorData;
          } else {
            state.trackingData[productId] = {
              [behaviorProp]: behaviorData
            };
          }
        } else if (mode === 'overwrite') {
          state.trackingData[productId] = {
            [behaviorProp]: behaviorData
          };
        }
        localStorage.setItem('userBehavior', JSON.stringify(state.trackingData));
      }
    },
    clearData(state) {
      state.trackingData = {};
      localStorage.setItem('userBehavior', JSON.stringify(state.trackingData));
    }
  }
});

const { actions, reducer } = userBehaviorSlice;
export default reducer;
// export const { trackingViewTime, trackingClick, trackingInCart, trackingBought } = actions;

export const trackingViewTime = (data) => (dispatch) => {
  const { productId, viewTime } = data;
  dispatch(
    actions.updateTrackingData({
      productId,
      behaviorData: viewTime,
      behaviorProp: BEHAVIOR.VIEW_TIME,
      mode: 'update'
    })
  );
};

export const trackingViewCount = (data) => (dispatch) => {
  const { productId } = data;
  dispatch(
    actions.updateTrackingData({
      productId,
      behaviorData: 1,
      behaviorProp: BEHAVIOR.VIEW_COUNT,
      mode: 'update'
    })
  );
};

export const trackingClick = (data) => (dispatch) => {
  const { productId } = data;
  dispatch(
    actions.updateTrackingData({
      productId,
      behaviorData: 1,
      behaviorProp: BEHAVIOR.CLICK_COUNT,
      mode: 'update'
    })
  );
};

export const trackingInCart = (data) => (dispatch) => {
  const { productId, qty } = data;

  dispatch(
    actions.updateTrackingData({
      productId,
      behaviorData: qty,
      behaviorProp: BEHAVIOR.IN_CART_COUNT,
      mode: 'overwrite'
    })
  );
};

export const sendTrackingData = () => async (dispatch, getState) => {
  try {
    const { trackingData } = getState().userBehavior;
    if (trackingData && Object.keys(trackingData).length > 0) {
      await api.sendTrackingData(trackingData);
      dispatch(actions.clearData());
    }
  } catch (e) {
    console.log(e);
  }
};
