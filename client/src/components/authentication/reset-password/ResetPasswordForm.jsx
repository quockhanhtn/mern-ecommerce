import PropTypes from 'prop-types';
// form validation
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Box, Button, TextField, Alert, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Link as RouterLink } from 'react-router-dom';
import { PATH_AUTH } from '../../../routes/paths';
// hooks
import { useLocales } from '../../../hooks';

import { regexCons } from '../../../constants';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSendOtp: PropTypes.func,
  isSending: PropTypes.bool,
  errorMgs: PropTypes.string
};

export default function ResetPasswordForm({ onSendOtp, isSending }) {
  const { t } = useLocales();

  const ResetPasswordSchema = Yup.object().shape({
    emailOrPhone: Yup.string()
      .required(t('auth.email-or-phone-required'))
      .test('test-name', (value, { createError }) => {
        // phone
        if (/^\d.+$/.test(value)) {
          if (regexCons.phone.test(value)) {
            return true;
          }
          return createError({ message: t('address.phone-invalid') });
        }
        // email
        if (regexCons.email.test(value)) {
          return true;
        }
        return createError({ message: t('auth.email-invalid') });
      })
  });

  const formik = useFormik({
    initialValues: {
      emailOrPhone: ''
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values) => {
      const { emailOrPhone } = values;
      onSendOtp(emailOrPhone);
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            fullWidth
            {...getFieldProps('emailOrPhone')}
            type="text"
            label={t('auth.email-or-phone')}
            error={Boolean(touched.emailOrPhone && errors.emailOrPhone)}
            helperText={touched.emailOrPhone && errors.emailOrPhone}
          />

          <Box display="flex" justifyContent="center">
            <Button fullWidth size="large" component={RouterLink} to={PATH_AUTH.login} sx={{ mt: 1 }}>
              {t('common.back').toUpperCase()}
            </Button>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSending}>
              {t('auth.send-otp').toUpperCase()}
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
