import PropTypes from 'prop-types';
// material
import { Box, Stack, TextField, Button } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// form validation
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// hooks
import { useEffect, useState } from 'react';
import useLocales from '../../../hooks/useLocales';
// firebase
import firebase, { auth as firebaseAuth } from '../../../firebase';

// ----------------------------------------------------------------------

PhoneInputForm.propTypes = {
  onOtpSent: PropTypes.func.isRequired,
  onGoBack: PropTypes.func
};

export default function PhoneInputForm({ onOtpSent, onGoBack }) {
  const { t } = useLocales();
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
    phone: Yup.string()
      .required(t('address.phone-required'))
      .matches(/^\(?(([0-9]{3})|(\+84[0-9]{2}))\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, t('address.phone-invalid'))
  });

  const formik = useFormik({
    initialValues: {
      phone: process.env.NODE_ENV === 'development' ? '+84123456789' : ''
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
        .then((confirmResult) => {
          console.log(`OTP is sent to ${values.phone}`);
          onOtpSent(confirmResult);
        })
        .catch((error) => {
          setErrors({ phone: t('address.phone-invalid') });
          setSubmitting(false);
          console.log('error', error);
        });
      setIsLoading(false);
    }
  });

  const { errors, touched, getFieldProps, handleSubmit } = formik;

  return (
    <Box sx={{ width: '100%' }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack direction="column" spacing={3} justifyContent="center" sx={{ minHeight: '200px' }}>
            <TextField
              required
              fullWidth
              label="Số điện thoại"
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />

            <Box display="flex" justifyContent="center">
              <Button fullWidth onClick={onGoBack} color="inherit" sx={{ m: 1 }}>
                Trở lại
              </Button>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading} sx={{ m: 1 }}>
                Gửi mã
              </LoadingButton>
            </Box>
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
}
