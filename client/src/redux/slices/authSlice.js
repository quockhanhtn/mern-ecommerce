import { createSlice } from '@reduxjs/toolkit';
import { auth as firebaseAuth } from '../../firebase';
import * as api from '../../api';

const initialState = {
  otp: {
    isLoading: false,
    isVerifying: false,
    isSent: false,
    isVerified: false,
    error: null,
    emailOrPhone: '',
    token: '',
    confirmResult: null
  }
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    startLoadingOtp(state) {
      state.otp.isLoading = true;
    },
    startVerifyingOtp(state) {
      state.otp.isVerifying = true;
    },
    hasErrorOtp(state, action) {
      state.otp.isLoading = false;
      state.otp.error = action.payload.error;
      state.otp.emailOrPhone = action.payload.emailOrPhone;
      state.otp.isVerifying = false;
      state.otp.isVerified = false;
    },
    sentEmailOtpSuccess(state, action) {
      state.otp.isSent = true;
      state.otp.error = null;
      state.otp.isLoading = false;
      state.otp.emailOrPhone = action.payload.emailOrPhone;
    },
    sentPhoneOtpSuccess(state, action) {
      state.otp.isSent = true;
      state.otp.error = null;
      state.otp.isLoading = false;
      state.otp.emailOrPhone = action.payload.emailOrPhone;
      state.otp.confirmResult = action.payload.confirmResult;
    },
    checkOtpSuccess(state, action) {
      state.otp.emailOrPhone = action.payload.emailOrPhone;
      state.otp.token = action.payload.token;
      state.otp.isVerifying = false;
      state.otp.isVerified = true;
    },
    setOtpToken(state, action) {
      state.otp.token = action.payload;
    }
  }
});

const { actions, reducer } = authSlice;

export default reducer;

export const sentEmailOtp = (email) => async (dispatch) => {
  try {
    dispatch(actions.startLoadingOtp());
    await api.sendEmailOtp(email);
    dispatch(actions.sentEmailOtpSuccess({ emailOrPhone: email }));
  } catch (e) {
    const error = e?.response?.data || e;
    dispatch(actions.hasErrorOtp({ error, emailOrPhone: email }));
  }
};

export const sendPhoneOtp = (phone) => async (dispatch) => {
  try {
    dispatch(actions.startLoadingOtp());

    const { data } = await api.isExistedAccountPhone(phone);
    console.log('isExistedAccountPhone', data);
    if (data?.data?.isExisted) {
      const appVerifier = window.recaptchaVerifier;

      if (phone.startsWith('0')) {
        phone = `+84${phone.substring(1)}`;
      }

      firebaseAuth
        .signInWithPhoneNumber(phone, appVerifier)
        .then((confirmResult) => {
          console.log(`OTP is sent to ${phone}`);
          dispatch(actions.sentPhoneOtpSuccess({ emailOrPhone: phone, confirmResult }));
        })
        .catch((error) => {
          dispatch(actions.hasErrorOtp({ error, emailOrPhone: phone }));
          console.log('error', error);
        });
    } else {
      dispatch(
        actions.hasErrorOtp({
          error: { message: { vi: 'Tài khoản không tồn tại', en: 'Account not found' } },
          emailOrPhone: phone
        })
      );
    }
  } catch (e) {
    dispatch(actions.hasErrorOtp({ error: e?.response?.data || e, emailOrPhone: phone }));
  }
};

export const checkOtpEmail = (email, otp) => async (dispatch) => {
  try {
    dispatch(actions.startVerifyingOtp());
    const { data } = await api.checkEmailOtp(email, otp);
    dispatch(actions.checkOtpSuccess({ emailOrPhone: email, token: data.data.token }));
  } catch (e) {
    dispatch(actions.hasErrorOtp({ error: e?.response?.data || e, emailOrPhone: email }));
  }
};

export const checkOtpPhone = (phone, otp) => async (dispatch, getState) => {
  dispatch(actions.startVerifyingOtp());

  getState()
    .auth.otp.confirmResult // eslint-disable-next-line react/prop-types
    .confirm(otp)
    .then((res) => {
      const accessToken = res?.user?.za || null;
      const expirationTime = res?.user?.b?.c || null;

      if (accessToken && expirationTime) {
        dispatch(actions.checkOtpSuccess({ emailOrPhone: phone, token: accessToken }));
      }
    })
    .catch((err) => {
      console.log(err);
      actions.hasErrorOtp({
        error: { message: { vi: 'Mã OTP không đúng', en: 'OTP is invalid' } },
        emailOrPhone: phone
      });
    });
};
