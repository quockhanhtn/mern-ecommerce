import { useEffect, useState } from 'react';
// material
import { Alert, Box, Button, Container, Typography } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// redux
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkOtpEmail,
  checkOtpPhone,
  resetPassword as resetPasswordAction,
  resendOtp as resendOtpAction,
  sentOtpViaEmail,
  sentOtpViaPhone,
  clearOtpState
} from '../../redux/slices/authSlice';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// components
import { NewPasswordForm, OtpInputForm, ResetPasswordForm } from '../../components/authentication/reset-password';
import Page from '../../components/Page';
import { PATH_AUTH } from '../../routes/paths';
//
import { CheckIcon, SentIcon } from '../../assets';
import { regexCons } from '../../constants';
import { useLocales } from '../../hooks';
// firebase
import firebase from '../../firebase';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ResetPassword() {
  const { t, currentLang } = useLocales();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    emailOrPhone: account,
    isLoading: isHandlingOtp,
    isVerifying,
    isSent,
    isVerified,
    isChangingPass,
    isChangeSuccess,
    error: otpError
  } = useSelector((state) => state.auth.otp);

  const [errorMgs, setErrorMgs] = useState('');

  useEffect(() => {
    if (!otpError) {
      setErrorMgs(null);
    } else {
      setErrorMgs(otpError?.message?.[currentLang.value] || 'Lỗi');
    }
  }, [currentLang.value, otpError]);

  useEffect(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('invisible-recaptcha', {
      size: 'invisible',
      defaultCountry: 'VN',
      callback: (response) => {
        console.log('response', response);
      }
    });
  }, []);

  const handleSendOtp = (emailOrPhone) => {
    if (regexCons.email.test(emailOrPhone)) {
      dispatch(sentOtpViaEmail(emailOrPhone));
    } else {
      dispatch(sentOtpViaPhone(emailOrPhone));
    }
  };

  const handleResentOtp = () => {
    dispatch(resendOtpAction());
  };

  const handleVerifyOtp = (otpCode) => {
    if (regexCons.email.test(account)) {
      dispatch(checkOtpEmail(account, otpCode));
    } else {
      dispatch(checkOtpPhone(account, otpCode));
    }
  };

  const handleChangePassword = (newPassword) => {
    dispatch(resetPasswordAction(newPassword));
  };

  const handleGotoLogin = (_event) => {
    dispatch(clearOtpState());
    navigate(PATH_AUTH.login);
  };

  const renderBody = () => {
    if (isChangeSuccess) {
      return (
        <Box sx={{ textAlign: 'center' }}>
          <CheckIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

          <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
            {t('auth.set-new-password-success')}
          </Typography>

          <Button fullWidth size="large" onClick={handleGotoLogin} variant="contained">
            {t('auth.login').toUpperCase()}
          </Button>
        </Box>
      );
    }
    if (!isSent) {
      return (
        <>
          <Typography variant="h3" paragraph>
            {t('auth.reset-password')}
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 5 }}>{t('auth.reset-password-desc')}</Typography>

          <ResetPasswordForm onSendOtp={handleSendOtp} isSending={isHandlingOtp} />
        </>
      );
    }
    if (!isVerified) {
      return (
        <Box sx={{ textAlign: 'center' }}>
          <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

          <Typography variant="h3" gutterBottom>
            {t('auth.send-otp-success')}
          </Typography>
          <Typography>{t('auth.send-otp-desc')}</Typography>

          <OtpInputForm onResentOtp={handleResentOtp} onVerifyOtp={handleVerifyOtp} isLoading={isVerifying} />
        </Box>
      );
    }
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom sx={{ mb: 3 }}>
          {t('auth.set-new-password')}
        </Typography>

        <NewPasswordForm onChangePassword={handleChangePassword} isLoading={isChangingPass} />
      </Box>
    );
  };

  return (
    <RootStyle title={t('auth.page-title.reset-password')}>
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {renderBody()}
          {errorMgs && (
            <Alert severity="error" sx={{ mt: 3 }}>
              {errorMgs}
            </Alert>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
