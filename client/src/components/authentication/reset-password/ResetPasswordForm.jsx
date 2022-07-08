import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { TextField, Alert, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import { useLocales } from '../../../hooks';

import { regexCons } from '../../../constants';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSendOtp: PropTypes.func,
  isSending: PropTypes.bool,
  errorMgs: PropTypes.string
};

export default function ResetPasswordForm({ onSendOtp, isSending, errorMgs }) {
  const { t } = useLocales();

  const ResetPasswordSchema = Yup.object().shape({
    emailOrPhone: Yup.string()
      .required(t('auth.email-or-phone-required'))
      .test('test-name', (value, { createError }) => {
        // phone
        if (/^[0-9].+$/.test(value)) {
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
          {errorMgs && <Alert severity="error">{errorMgs}</Alert>}

          <TextField
            fullWidth
            {...getFieldProps('emailOrPhone')}
            type="text"
            label={t('auth.email-or-phone')}
            error={Boolean(touched.emailOrPhone && errors.emailOrPhone)}
            helperText={touched.emailOrPhone && errors.emailOrPhone}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSending}>
            {t('auth.send-otp').toUpperCase()}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
