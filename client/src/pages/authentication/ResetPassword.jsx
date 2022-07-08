import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Button, Container, Typography } from '@material-ui/core';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { sendPhoneOtp, sentEmailOtp, checkOtpEmail, checkOtpPhone } from '../../redux/slices/authSlice';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { ResetPasswordForm, OtpInputForm } from '../../components/authentication/reset-password';
//
import { SentIcon } from '../../assets';
import { useLocales } from '../../hooks';
import { regexCons } from '../../constants';
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
  const dispatch = useDispatch();
  const {
    isLoading: isHandlingOtp,
    isVerifying,
    isSent,
    isVerified,
    error: otpError
  } = useSelector((state) => state.auth.otp);

  const [email, setEmail] = useState('');
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
    setEmail(emailOrPhone);

    if (regexCons.email.test(emailOrPhone)) {
      dispatch(sentEmailOtp(emailOrPhone));
    } else {
      dispatch(sendPhoneOtp(emailOrPhone));
    }
  };

  const handleResentOtp = () => {
    if (regexCons.email.test(email)) {
      dispatch(sentEmailOtp(email));
    } else {
      dispatch(sendPhoneOtp(email));
    }
  };

  const handleVerifyOtp = (otpCode) => {
    if (regexCons.email.test(email)) {
      dispatch(checkOtpEmail(email, otpCode));
    } else {
      dispatch(checkOtpPhone(email, otpCode));
    }
  };

  return (
    <RootStyle title={t('auth.page-title.reset-password')}>
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!isSent ? (
            <>
              <Typography variant="h3" paragraph>
                {t('auth.reset-password')}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>{t('auth.reset-password-desc')}</Typography>

              <ResetPasswordForm onSendOtp={handleSendOtp} isSending={isHandlingOtp} errorMgs={errorMgs} />

              <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
                {t('common.back').toUpperCase()}
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

              <Typography variant="h3" gutterBottom>
                Request sent successfully
              </Typography>
              <Typography>
                We have sent a confirmation email to &nbsp;
                <strong>{email}</strong>
                <br />
                Please check your email.
              </Typography>

              <OtpInputForm onResentOtp={handleResentOtp} onVerifyOtp={handleVerifyOtp} isLoading={isVerifying} />
            </Box>
          )}
          <p> verified: {isVerified.toString()}</p>
        </Box>
      </Container>
    </RootStyle>
  );
}
