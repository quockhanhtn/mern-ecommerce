import { Link as RouterLink } from 'react-router-dom';
// form validation
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// icons
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import { Link, Stack, Alert, TextField, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useAuth, useLocales } from '~/hooks';
// routes
import { PATH_AUTH } from '~/routes/paths';
//
import { MIconButton } from '~/components/@material-extend';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const { login, errMessage, isAuthenticated } = useAuth();
  const { t, currentLang } = useLocales();
  // const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
  const [messageDisplay, setMessageDisplay] = useState('');

  const LoginSchema = Yup.object().shape({
    account: Yup.string().required(t('auth.account-invalid')),
    password: Yup.string().required(t('auth.password-invalid'))
  });

  useEffect(() => {
    if (errMessage) {
      setMessageDisplay(errMessage?.[currentLang.value] || errMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errMessage]);

  const formik = useFormik({
    initialValues: { account: '', password: '' },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setSubmitting }) => {
      await login(values.account, values.password);

      if (!isAuthenticated && errMessage) {
        setSubmitting(false);
      } else if (isAuthenticated && !errMessage) {
        enqueueSnackbar('Login success', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      }
      // if (isMountedRef.current) {
      //   setSubmitting(false);
      //   const messageDisplay = errMessage?.[currentLang.value] || errMessage;
      //   setErrors({ afterSubmit: messageDisplay });
      // } else {
      //   enqueueSnackbar('Login success', {
      //     variant: 'success',
      //     action: (key) => (
      //       <MIconButton size="small" onClick={() => closeSnackbar(key)}>
      //         <Icon icon={closeFill} />
      //       </MIconButton>
      //     )
      //   });
      // }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  const handleShowPassword = () => {
    setShowPassword((show) => !show);
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>} */}
          {messageDisplay && <Alert severity="error">{messageDisplay}</Alert>}

          <TextField
            fullWidth
            autoComplete="username"
            type="text"
            label={t('auth.account')}
            {...getFieldProps('account')}
            error={Boolean(touched.account && errors.account)}
            helperText={touched.account && errors.account}
          />

          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label={t('auth.password')}
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleShowPassword} edge="end" size="large">
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
          {/* always auto remember */}
          {/* <FormControlLabel
            control={<Checkbox {...getFieldProps('remember')} checked={values.remember} />}
            label={t('auth.remember-me')}
          /> */}

          <Link component={RouterLink} variant="subtitle2" to={PATH_AUTH.resetPassword} underline="hover">
            {t('auth.forgot-password')}
          </Link>
        </Stack>

        <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
          {t('auth.login')}
        </LoadingButton>
      </Form>
    </FormikProvider>
  );
}
