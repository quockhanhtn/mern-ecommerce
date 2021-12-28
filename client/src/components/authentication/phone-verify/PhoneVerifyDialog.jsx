import PropTypes from 'prop-types';
// material
import { Box, Dialog, DialogContent, DialogTitle, Stack, TextField, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// form validation
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// hooks
import { useState, useEffect } from 'react';
import { MotionInView, varFadeInUp } from '../../animate';
import VerifyCodeForm from './VerifyCodeForm';
// firebase
import firebase, { auth as firebaseAuth } from '../../../firebase';

PhoneVerifyDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func,
  onSuccess: PropTypes.func
};

PhoneVerifyDialog.defaultProps = {
  onSuccess: (result) => {
    console.log('onClose', result);
  }
};

export default function PhoneVerifyDialog({ open, onClose, onSuccess }) {
  const [confirmResult, setConfirmResult] = useState(null);
  const [isSent, setIsSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const PhoneInputSchema = Yup.object().shape({
    phone: Yup.string().required('Vui lòng nhập số điện thoại')
  });

  const formik = useFormik({
    initialValues: {
      phone: '+84 1234 56789'
    },
    validationSchema: PhoneInputSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      const appVerifier = window.recaptchaVerifier;

      if (values.phone.startsWith('0')) {
        values.phone = `+84${values.phone.substring(1)}`;
      }

      setIsLoading(true);
      firebaseAuth
        .signInWithPhoneNumber(values.phone, appVerifier)
        .then((confirmationResult) => {
          console.log(`OTP is sent to ${values.phone}`);
          setConfirmResult(confirmationResult);
          setIsSent(true);
          // SMS sent. Prompt user to type the code from the message, then sign the
          // user in with confirmationResult.confirm(code).
          window.confirmationResult = confirmationResult;
          confirmationResult
            .confirm('123456')
            .then((user) => {
              // User signed in successfully.
              console.log('user', user);
            })
            .catch((err) => {
              // User couldn't sign in (bad verification code?)
              console.log('error', err);
              setSubmitting(false);
              setErrors({ phone: 'Mã xác nhận không đúng' });
            });
        })
        .catch((error) => {
          setErrors({ phone: 'Số điện thoại không hợp lệ' });
          setSubmitting(false);
          console.log('error', error);
        });
      setIsLoading(false);
    }
  });

  const { errors, touched, getFieldProps, handleSubmit } = formik;

  const handleResentOtp = () => {
    if (confirmResult) {
      //
    }
  };

  const handleGoBack = () => {
    setIsSent(false);
  };

  const handleSuccess = () => {
    setIsSent(false);
    onClose();
    onSuccess();
  };

  return (
    <Dialog disableEscapeKeyDown onBackdropClick="false" open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h5">{isSent ? 'Nhập mã OTP' : ' Nhập số điện thoại để xác thực'}</Typography>
      </DialogTitle>
      <DialogContent>
        <Box component="div" sx={{ width: '100%', minHeight: '200px', display: 'flex', alignItems: 'center' }}>
          <MotionInView variants={varFadeInUp}>
            {!isSent ? (
              <FormikProvider value={formik}>
                <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box
                      component="img"
                      alt="logo otp"
                      src="/static/icons/ic_otp.svg"
                      sx={{ width: 'auto', height: '250px' }}
                    />
                    <Stack spacing={2}>
                      <TextField
                        required
                        fullWidth
                        label="Số điện thoại"
                        {...getFieldProps('phone')}
                        error={Boolean(touched.phone && errors.phone)}
                        helperText={touched.phone && errors.phone}
                      />
                      <LoadingButton loading={isLoading} type="submit" variant="contained" color="primary">
                        Gửi mã
                      </LoadingButton>
                    </Stack>
                  </Box>
                </Form>
              </FormikProvider>
            ) : (
              <VerifyCodeForm
                confirmResult={confirmResult}
                onResentOtp={handleResentOtp}
                onGoBack={handleGoBack}
                onSuccess={handleSuccess}
              />
            )}
          </MotionInView>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
