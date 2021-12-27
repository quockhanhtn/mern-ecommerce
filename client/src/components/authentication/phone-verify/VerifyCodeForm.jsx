import PropTypes from 'prop-types';
import { useState } from 'react';
// form validation
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Button, Box, Link, OutlinedInput, FormHelperText, Stack } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

// eslint-disable-next-line consistent-return
function maxLength(object) {
  if (object.target.value.length > object.target.maxLength) {
    return (object.target.value = object.target.value.slice(0, object.target.maxLength));
  }
}

VerifyCodeForm.propTypes = {
  confirmResult: PropTypes.object.isRequired,
  onResentOtp: PropTypes.func,
  onGoBack: PropTypes.func,
  onSuccess: PropTypes.func,
  sx: PropTypes.object
};

VerifyCodeForm.defaultProps = {
  onResentOtp: () => {
    console.log('onResentOtp');
  },
  onGoBack: () => {
    console.log('onGoBack');
  },
  onSuccess: () => {
    console.log('onSuccess');
  }
};

// ----------------------------------------------------------------------

export default function VerifyCodeForm({ confirmResult, onResentOtp, onGoBack, onSuccess, sx }) {
  const { t } = useLocales();
  const [isLoading, setIsLoading] = useState(false);

  const VerifyCodeSchema = Yup.object().shape({
    code1: Yup.number().required('Code is required'),
    code2: Yup.number().required('Code is required'),
    code3: Yup.number().required('Code is required'),
    code4: Yup.number().required('Code is required'),
    code5: Yup.number().required('Code is required'),
    code6: Yup.number().required('Code is required')
  });

  const formik = useFormik({
    initialValues: {
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      code6: ''
    },
    validationSchema: VerifyCodeSchema,
    onSubmit: async (values, { setErrors }) => {
      setIsLoading(true);
      confirmResult
        // eslint-disable-next-line react/prop-types
        .confirm(Object.values(values).join(''))
        .then((res) => {
          const accessToken = res?.user?.za || null;
          const expirationTime = res?.user?.b?.c || null;

          if (accessToken && expirationTime) {
            sessionStorage.setItem('otpVerification', JSON.stringify({ accessToken, expirationTime }));
          }
          onSuccess();
        })
        .catch((err) => {
          console.log(err);
          setErrors({ verifyResult: 'Mã OTP không đúng' });
        });
      setIsLoading(false);
    }
  });

  const { values, errors, isValid, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Box sx={sx}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack direction="column" spacing={3} justifyContent="center">
            <Stack direction="row" spacing={2} justifyContent="center">
              {Object.keys(values).map((item) => (
                <OutlinedInput
                  key={item}
                  {...getFieldProps(item)}
                  type="number"
                  placeholder="-"
                  onInput={maxLength}
                  error={Boolean(touched[item] && errors[item])}
                  inputProps={{
                    maxLength: 1,
                    sx: {
                      p: 0,
                      textAlign: 'center',
                      width: { xs: 36, sm: 56 },
                      height: { xs: 36, sm: 56 }
                    }
                  }}
                />
              ))}
            </Stack>

            <Box display="flex" justifyContent="space-between">
              <Link component="button" variant="subtitle2" onClick={onResentOtp}>
                Gửi lại mã OTP
              </Link>

              <FormHelperText error={!isValid} style={{ textAlign: 'right', marginTop: 0 }}>
                {errors?.verifyResult || (!isValid && 'Vui lòng nhập mã OTP gồm 6 chữ số')}
              </FormHelperText>
            </Box>

            <Box display="flex" justifyContent="center">
              <Button fullWidth onClick={onGoBack} color="inherit" sx={{ m: 1 }}>
                Trở lại
              </Button>
              <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading} sx={{ m: 1 }}>
                Xác nhận
              </LoadingButton>
            </Box>
          </Stack>
        </Form>
      </FormikProvider>
    </Box>
  );
}
