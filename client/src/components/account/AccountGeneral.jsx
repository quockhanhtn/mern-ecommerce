/* eslint-disable no-unused-vars */
// form validation
import * as Yup from 'yup';
import { useFormik } from 'formik';
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
} from '@mui/material';
import { MobileDatePicker } from '@mui/lab';
// hooks
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useLocales, useAuth } from '../../hooks';
import { getAccountInfo } from '../../redux/slices/accountSlice';

import CustomLoadingOverlay from '../loading-overlay';
import { MCircularProgress } from '../@material-extend';
import { UploadAvatar } from '../upload';

import { updateAccountInfo } from '../../api';

// utils
import { fData } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

export default function AccountGeneral() {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { info: accountInfo, isLoading } = useSelector((state) => state.account);
  const { reInitialize } = useAuth();
  const [isUpdating, setIsUpdating] = useState(false);

  const genderOpts = [
    { name: t('account.gender-male'), value: 'male' },
    { name: t('account.gender-female'), value: 'female' },
    { name: t('account.gender-other'), value: 'other' }
  ];

  useEffect(() => {
    dispatch(getAccountInfo());
  }, [dispatch]);

  async function handleUpdateAccountInfo(data) {
    setIsUpdating(true);
    try {
      await updateAccountInfo(data);
      dispatch(getAccountInfo());
      await reInitialize();
      enqueueSnackbar(t('account.update-success'), { variant: 'success' });
    } catch (e) {
      console.log('Update account info error: ', e);
    }
    setIsUpdating(false);
  }

  const AccountInfoSchema = Yup.object().shape({
    firstName: Yup.string()
      .required(t('account.first-name-required'))
      // .min(1, t('account.first-name-min'))
      .max(30, t('account.first-name-max')),
    lastName: Yup.string()
      .required(t('account.last-name-required'))
      // .min(1, t('account.last-name-min'))
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
    validationSchema: AccountInfoSchema
    // onSubmit: async (values, { setSubmitting }) => {
    //   await handleUpdateAccountInfo(values);
    // }
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
    let mgs = '';
    if (errors && Object.entries(errors)) {
      mgs = Object.entries(errors)
        .map(([_, mgs]) => mgs)
        .join('\n');
    }
    if (mgs) {
      enqueueSnackbar(mgs, { variant: 'error' });
      return;
    }
    handleUpdateAccountInfo(values);
  };

  if (isLoading) {
    return (
      <>
        {isUpdating && <CustomLoadingOverlay active={isUpdating} />}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
              <MCircularProgress />
              <Typography>{t('common.please-wait')}</Typography>
            </Card>
          </Grid>
        </Grid>
      </>
    );
  }

  return (
    <Grid container spacing={3}>
      {isUpdating && <CustomLoadingOverlay active={isUpdating} />}

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
        <Card sx={{ p: 3, mb: 3 }}>
          <Stack spacing={{ xs: 2, md: 3 }}>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              {t('account.email-and-phone')}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                fullWidth
                label={t('auth.email')}
                {...getFieldProps('email')}
                error={Boolean(errors.email)}
                helperText={errors.email}
                disabled
                sx={{ mr: 2 }}
              />
              <Button type="button" size="small" variant="outlined" sx={{ my: 1, minWidth: 120 }}>
                {t('common.edit')}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row' }}>
              <TextField
                fullWidth
                label={t('auth.phone')}
                {...getFieldProps('phone')}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
                disabled
                sx={{ mr: 2 }}
              />
              <Button type="button" size="small" variant="outlined" sx={{ my: 1, minWidth: 120 }}>
                {t('common.edit')}
              </Button>
            </Box>
          </Stack>
        </Card>
        <Card sx={{ p: 3 }}>
          <Stack>
            <Typography variant="overline" sx={{ color: 'text.secondary' }}>
              {t('account.basic-info')}
            </Typography>

            <Grid container spacing={2} sx={{ mt: 3 }}>
              <Grid item xs={12} sm={6} sx={{ margin: 'auto' }}>
                <TextField
                  fullWidth
                  label={t('account.last-name')}
                  {...getFieldProps('lastName')}
                  error={Boolean(touched.lastName && errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ margin: 'auto' }}>
                <TextField
                  fullWidth
                  label={t('account.first-name')}
                  {...getFieldProps('firstName')}
                  error={Boolean(touched.firstName && errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6} sx={{ margin: 'auto' }}>
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
              <Grid item xs={12} sm={6} sx={{ margin: 'auto' }}>
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
          </Stack>

          <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <Button size="medium" type="reset" variant="outlined" color="inherit" sx={{ mr: 2 }} onClick={handleCancel}>
              {t('common.cancel')}
            </Button>
            <Button size="medium" type="button" variant="contained" onClick={handleSaveChange}>
              {t('common.save-change')}
            </Button>
          </Box>
        </Card>
      </Grid>
    </Grid>
  );
}
