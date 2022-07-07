import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { TextField, Alert, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import { useState } from 'react';
import { useAuth, useLocales } from '../../../hooks';

import { regexCons } from '../../../constants';

// ----------------------------------------------------------------------

ResetPasswordForm.propTypes = {
  onSent: PropTypes.func,
  onGetEmail: PropTypes.func
};

export default function ResetPasswordForm() {
  const { resetPassword } = useAuth();
  const { t } = useLocales();
  const [isLoading, setIsLoading] = useState(false);

  const ResetPasswordSchema = Yup.object().shape({
    emailOrPhone: Yup.string()
      .required(t('auth.email-or-phone-required'))
      .test('test-name', (value, { createError }) => {
        console.log('Yup.string', value);
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
      if (regexCons.phone.test(emailOrPhone)) {
        // handle when phone number
      } else {
        // handle when email
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            {...getFieldProps('emailOrPhone')}
            type="text"
            label={t('auth.email-or-phone')}
            error={Boolean(touched.emailOrPhone && errors.emailOrPhone)}
            helperText={touched.emailOrPhone && errors.emailOrPhone}
          />

          <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading}>
            {t('auth.send-otp').toUpperCase()}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
