import PropTypes from 'prop-types';
import { useEffect } from 'react';
// form validation
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { Button, Box, OutlinedInput, FormHelperText, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import * as typeUtils from '../../../utils/typeUtils';

// ----------------------------------------------------------------------

// eslint-disable-next-line consistent-return
function maxLength(object) {
  if (object.target.value.length > object.target.maxLength) {
    return (object.target.value = object.target.value.slice(object.target.maxLength - 1, object.target.maxLength));
  }
}

OtpInputForm.propTypes = {
  onVerifyOtp: PropTypes.func.isRequired,
  onResentOtp: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};

// ----------------------------------------------------------------------

export default function OtpInputForm({ onVerifyOtp, onResentOtp, isLoading }) {
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
    onSubmit: async (values) => {
      if (typeUtils.isFunction(onVerifyOtp)) {
        const otpCode = Object.values(values).join('');
        onVerifyOtp(otpCode);
      }
    }
  });

  const { values, errors, isValid, touched, handleSubmit, getFieldProps } = formik;

  useEffect(() => {
    const firstCodeInput = document.querySelector(`input[name="verify-code-input-code1"]`);
    if (firstCodeInput) {
      firstCodeInput.focus();
    }
  }, []);

  const handleOnChange = (e) => {
    const code = e.target.name.replace('verify-code-input-', '');
    formik.setFieldValue(code, e.target.value);

    const order = ['code1', 'code2', 'code3', 'code4', 'code5', 'code6'];
    const index = order.indexOf(code);
    if (index < 5) {
      const nextInput = document.querySelector(`input[name="verify-code-input-${order[index + 1]}"]`);
      if (nextInput) {
        nextInput.focus();
        nextInput.select();
      }
    }
  };

  // eslint-disable-next-line no-unused-vars
  const handleResent = (_event) => {
    if (typeUtils.isFunction(onResentOtp)) {
      onResentOtp();
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 8 && !event.target.value) {
      event.stopPropagation();
      // Backspace press
      const order = ['code1', 'code2', 'code3', 'code4', 'code5', 'code6'];
      const code = event.target.name.replace('verify-code-input-', '');

      const index = order.indexOf(code);
      if (index > 0) {
        const prevInput = document.querySelector(`input[name="verify-code-input-${order[index - 1]}"]`);
        if (prevInput) {
          prevInput.focus();
        }
      }
    }
  };

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack direction="column" spacing={3} justifyContent="center" sx={{ minHeight: '200px' }}>
          <Stack direction="row" spacing={2} justifyContent="center">
            {Object.keys(values).map((item) => (
              <OutlinedInput
                key={item}
                {...getFieldProps(item)}
                type="number"
                placeholder="-"
                onInput={maxLength}
                error={Boolean(touched[item] && errors[item])}
                onChange={handleOnChange}
                inputProps={{
                  maxLength: 1,
                  sx: {
                    p: 0,
                    textAlign: 'center',
                    width: { xs: 36, sm: 56 },
                    height: { xs: 36, sm: 56 }
                  }
                }}
                onFocus={(e) => e.target.select}
                onKeyDown={handleKeyDown}
                name={`verify-code-input-${item}`}
              />
            ))}
          </Stack>

          <Box display="flex" justifyContent="flex-end">
            <FormHelperText error={!isValid} style={{ textAlign: 'right', marginTop: 0 }}>
              {errors?.verifyResult || (!isValid && 'Vui lòng nhập mã OTP gồm 6 chữ số')}
            </FormHelperText>
          </Box>

          <Box display="flex" justifyContent="center">
            <Button fullWidth onClick={handleResent} color="inherit" sx={{ m: 1 }} disabled={isLoading}>
              Gửi lại
            </Button>
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isLoading} sx={{ m: 1 }}>
              Xác nhận
            </LoadingButton>
          </Box>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
