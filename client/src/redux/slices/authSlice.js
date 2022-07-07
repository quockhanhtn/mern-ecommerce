import { createSlice } from '@reduxjs/toolkit';
import * as api from '../../api';

const initialState = {
  otp: {
    isLoading: false,
    isSent: false,
    error: null,
    userInput: ''
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoadingOtp(state) {
      state.otp.isLoading = true;
    },
    hasErrorOtp(state, action) {
      state.otp.error = action.payload;
      state.otp.isLoading = false;
    },
    sentOtpSuccess(state) {
      state.otp.isSent = true;
      state.otp.error = null;
      state.otp.isLoading = false;
    },
    setUserInputOtp(state, action) {
      state.otp.userInput = action.payload;
    }
  }
});

const { actions, reducer } = authSlice;

export default reducer;

export const sentEmailOtp = (email) => {
  ///
};
