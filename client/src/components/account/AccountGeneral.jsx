// form validation
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Autocomplete,
  Button,
  Box,
  Grid,
  Card,
  Stack,
  Switch,
  FormControlLabel,
  TextField,
  Typography
} from '@material-ui/core';
import { MobileDatePicker, LoadingButton } from '@material-ui/lab';
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

  const genderOpts = [
    { name: t('account.gender-male'), value: 'male' },
    { name: t('account.gender-female'), value: 'female' },
    { name: t('account.gender-other'), value: 'other' }
  ];

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
      // .required(t('account.email-required'))
      .matches(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
        t('account.email-invalid')
      ),
    phone: Yup.string()
      // .required(t('address.phone-required'))
      .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, t('address.phone-invalid')),
    avatar: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      firstName: '',
      gender: 'other',
      dob: null
    },
    validationSchema: AccountInfoSchema,
    onSubmit: async (values, { setSubmitting }) => {
      // onsubmit
    }
  });

  const { values, errors, touched, getFieldProps, setFieldValue } = formik;

  useEffect(() => {
    Object.entries(accountInfo).forEach(([key, value]) => {
      if (key === 'dob' && !value) {
        setFieldValue(key, null);
      } else {
        setFieldValue(key, value);
      }
    });
  }, [accountInfo, setFieldValue]);

  const handleCancel = (_e) => {
    Object.entries(accountInfo).forEach(([key, value]) => {
      setFieldValue(key, value);
    });
  };
  const handleSaveChange = (_e) => {
    // change
  };

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
        <Card sx={{ py: 8, px: 3, textAlign: 'center' }}>
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('account.last-name')}
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label={t('account.first-name')}
                  {...getFieldProps('firstName')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  disableClearable
                  required
                  fullWidth
                  options={genderOpts}
                  getOptionLabel={(option) => option.name}
                  value={genderOpts.find((x) => x.value === values.gender)}
                  onChange={(e, newValue) => {
                    if (newValue && newValue?.value) {
                      setFieldValue('gender', newValue.value);
                    }
                  }}
                  renderInput={(params) => <TextField {...params} label={t('account.gender')} margin="none" />}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <MobileDatePicker
                  orientation="portrait"
                  label={t('account.dob')}
                  inputFormat="dd/MM/yyyy"
                  value={values.dob}
                  minDate={new Date('1900-01-01')}
                  maxDate={new Date(Date.now() - 86400000 * 365 * 5)}
                  onChange={(newValue) => setFieldValue('dob', newValue)}
                  renderInput={(params) => <TextField fullWidth {...params} value="5" margin="none" />}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              label={t('auth.email')}
              {...getFieldProps('email')}
              error={Boolean(touched.email && errors.email)}
              helperText={touched.email && errors.email}
            />
            <TextField
              fullWidth
              label={t('auth.phone')}
              {...getFieldProps('phone')}
              error={Boolean(touched.phone && errors.phone)}
              helperText={touched.phone && errors.phone}
            />
          </Stack>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="outlined" color="inherit" sx={{ mr: 2 }} onClick={handleCancel}>
              {t('common.cancel')}
            </Button>
            <LoadingButton variant="contained" loading={isLoading} onClick={handleSaveChange}>
              {t('common.save-change')}
            </LoadingButton>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
