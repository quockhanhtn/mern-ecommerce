import PropTypes from 'prop-types';
// form validation
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
// material
import { Stack, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import { useLocales } from '../../../hooks';
//
import * as typeUtils from '../../../utils/typeUtils';

// ----------------------------------------------------------------------

NewPasswordForm.propTypes = {
  onChangePassword: PropTypes.func,
  isLoading: PropTypes.bool,
  errorMgs: PropTypes.string
};

export default function NewPasswordForm({ onChangePassword, isLoading }) {
  const { t } = useLocales();

  const ChangePasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, t('auth.new-password-min'))
      .max(32, t('auth.new-password-max'))
      .required(t('auth.new-password-required')),
    confirmNewPassword: Yup.string()
      .required(t('auth.confirm-password-required'))
      .oneOf([Yup.ref('newPassword'), null], t('auth.confirm-password-not-match'))
  });

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values) => {
      if (typeUtils.isFunction(onChangePassword)) {
        const { newPassword } = values;
        onChangePassword(newPassword);
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          <TextField
            {...getFieldProps('newPassword')}
            fullWidth
            autoComplete="on"
            type="password"
            label={t('auth.new-password')}
            error={Boolean(touched.newPassword && errors.newPassword)}
            helperText={touched.newPassword && errors.newPassword}
          />

          <TextField
            {...getFieldProps('confirmNewPassword')}
            fullWidth
            autoComplete="on"
            type="password"
            label={t('auth.confirm-new-password')}
            error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
            helperText={touched.confirmNewPassword && errors.confirmNewPassword}
          />

          <LoadingButton size="large" type="submit" variant="contained" loading={isLoading}>
            {t('common.save-change').toUpperCase()}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
