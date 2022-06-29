// form validation
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Box, Grid, Card, Stack, Switch, FormControlLabel, Typography } from '@material-ui/core';
// hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocales } from '../../hooks';
import { getAccountInfo } from '../../redux/slices/accountSlice';

import { MCircularProgress } from '../@material-extend';
import { UploadAvatar } from '../upload';

// utils
import { fData } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { t } = useLocales();
  const dispatch = useDispatch();
  const { info: accountInfo, isLoading, error } = useSelector((state) => state.account);

  useEffect(() => {
    dispatch(getAccountInfo());
  }, []);

  const AccountInfoSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(t('account.first-name-required'))
      .min(3, t('account.first-name-min'))
      .max(30, t('account.first-name-max')),
    lastName: Yup.string()
      .required(t('account.last-name-required'))
      .min(3, t('account.last-name-min'))
      .max(50, t('account.last-name-max')),
    dob: Yup.date(),
    email: Yup.string()
      .required(t('account.email-required'))
      .matches(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        t('account.email-invalid')
      ),
    phone: Yup.string()
      .required(t('address.phone-required'))
      .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, t('address.phone-invalid')),
    avatar: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      firstName: ''
    },
    validationSchema: AccountInfoSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // onsubmit
    }
  });

  if (isLoading) {
    return (
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
            <MCircularProgress />
            <Typography>{t('common.please-wait')}</Typography>
          </Card>
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
          <UploadAvatar
            accept="image/*"
            file={accountInfo.avatar}
            // maxSize={3145728}
            // onDrop={handleDrop}
            // error={Boolean(touched.photoURL && errors.photoURL)}
            caption={
              <Typography
                variant="caption"
                sx={{
                  mt: 2,
                  mx: 'auto',
                  display: 'block',
                  textAlign: 'center',
                  color: 'text.secondary'
                }}
              >
                Allowed *.jpeg, *.jpg, *.png, *.gif
                <br /> max size of {fData(3145728)}
              </Typography>
            }
          />

          {/* <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
            {touched.photoURL && errors.photoURL}
          </FormHelperText> */}

          <FormControlLabel
            control={<Switch color="primary" />}
            labelPlacement="start"
            label="Public Profile"
            sx={{ mt: 5 }}
          />
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Stack spacing={{ xs: 2, md: 3 }}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              {/* <TextField fullWidth label="Name" {...getFieldProps('displayName')} /> */}
              {/* <TextField fullWidth disabled label="Email Address" {...getFieldProps('email')} /> */}
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              {/* <TextField fullWidth label="Phone Number" {...getFieldProps('phoneNumber')} />
                <TextField fullWidth label="Address" {...getFieldProps('address')} /> */}
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              {/* <TextField
                    select
                    fullWidth
                    label="Country"
                    placeholder="Country"
                    {...getFieldProps('country')}
                    SelectProps={{ native: true }}
                    error={Boolean(touched.country && errors.country)}
                    helperText={touched.country && errors.country}
                  >
                    <option value="" />
                    {countries.map((option) => (
                      <option key={option.code} value={option.label}>
                        {option.label}
                      </option>
                    ))}
                  </TextField> */}
              {/* <TextField fullWidth label="State/Region" {...getFieldProps('state')} /> */}
            </Stack>

            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
              {/* <TextField fullWidth label="City" {...getFieldProps('city')} /> */}
              {/* <TextField fullWidth label="Zip/Code" {...getFieldProps('zipCode')} /> */}
            </Stack>

            {/* <TextField {...getFieldProps('about')} fullWidth multiline minRows={4} maxRows={4} label="About" /> */}
          </Stack>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            {/* <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                Save Changes
              </LoadingButton> */}
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
