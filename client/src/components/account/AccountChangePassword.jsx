// form validation
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Alert, Stack, Card, TextField } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import useAuth from '../../hooks/useAuth';
import useLocales from '../../hooks/useLocales';
//
import * as api from '../../api';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();
  const { t, currentLang } = useLocales();

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const ChangePasswordSchema = Yup.object().shape({
    isEmptyPassword: Yup.bool().notRequired(),

    currentPassword: Yup.string().when('isEmptyPassword', {
      is: false,
      then: Yup.string().required(t('auth.current-password-required')),
      otherwise: Yup.string().notRequired()
    }),
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
      isEmptyPassword: false,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: ChangePasswordSchema,
    onSubmit: async (values, { resetForm }) => {
      setIsLoading(true);
      try {
        const resBody = {
          currentPassword: values.currentPassword,
          newPassword: values.newPassword
        };
        const { data } = await api.changePassword(resBody);
        if (data.success) {
          enqueueSnackbar(t('auth.change-password-success'), { variant: 'success' });
          setErrorMessage('');
          resetForm();
        }
      } catch (e) {
        const message = e.response?.data?.message?.[currentLang.value] || e.message || JSON.stringify(e);
        setErrorMessage(message);
      }
      setIsLoading(false);
    }
  });

  useEffect(() => {
    if (user) {
      formik.setFieldValue('isEmptyPassword', user.emptyPassword);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const { errors, touched, handleSubmit, getFieldProps, values } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
            {errorMessage && (
              <Alert sx={{ width: '100%' }} severity="error">
                {errorMessage}
              </Alert>
            )}

            {values.isEmptyPassword ? (
              <Alert sx={{ width: '100%' }} severity="info">
                {t('auth.acc-no-pass')}
              </Alert>
            ) : (
              <TextField
                {...getFieldProps('currentPassword')}
                fullWidth
                autoComplete="on"
                type="password"
                label={t('auth.current-password')}
                error={Boolean(touched.currentPassword && errors.currentPassword)}
                helperText={touched.currentPassword && errors.currentPassword}
              />
            )}

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

            <LoadingButton type="submit" variant="contained" loading={isLoading}>
              {t('common.save-change')}
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
