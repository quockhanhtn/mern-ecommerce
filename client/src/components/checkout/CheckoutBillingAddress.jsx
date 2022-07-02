import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  Typography,
  TextField
} from '@material-ui/core';
// form validation
import { Form, FormikProvider, useFormik, useFormikContext } from 'formik';
import * as Yup from 'yup';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useLocales, useAuth } from '../../hooks';
// components
import { MHidden } from '../@material-extend';
import AddressPicker from '../location/AddressPicker';
import AddressForm from '../account/AddressForm';
import CheckoutSummary from './CheckoutSummary';
// import CheckoutDelivery from './CheckoutDelivery';
// other
import * as cartHelper from '../../helper/localStorageHelper';
// actions
import { setOrderInfo, backStepOrder, nextStepOrder } from '../../redux/slices/orderSlice';
import { addressActions } from '../../redux/slices/accountSlice';

// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

const ActionArea = ({ onBack, setErrorMgs }) => {
  const { t } = useLocales();
  const { values, errors, submitForm } = useFormikContext();
  const handleOnClick = (_e) => {
    if (values.isReceiveAtStore) {
      if (!values.name && !values.phone) {
        setErrorMgs('Vui lòng điền đầy đủ thông tin để tiếp tục');
      } else if (!values.name) {
        setErrorMgs(errors.name);
      } else if (!values.phone) {
        setErrorMgs(errors.phone);
      } else {
        setErrorMgs(null);
      }
    }
    submitForm();
  };
  return (
    <Grid item xs={12} md={4}>
      <CheckoutSummary />
      <Button fullWidth size="large" variant="contained" onClick={handleOnClick}>
        {t('common.continue')}
      </Button>

      <Button
        size="small"
        fullWidth
        color="inherit"
        onClick={onBack}
        startIcon={<Icon icon={arrowIosBackFill} />}
        sx={{ mt: 3 }}
      >
        {t('common.back')}
      </Button>
    </Grid>
  );
};

ActionArea.propTypes = {
  onBack: PropTypes.func,
  setErrorMgs: PropTypes.func
};

export default function CheckoutBillingAddress() {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();

  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const { list: addressList, isLoading } = useSelector((state) => state.account.addresses);

  const [openForm, setOpenForm] = useState(false);
  const [receiveAtStoreError, setReceiveAtStoreError] = useState(false);

  const initInfo = cartHelper.getOrderInfo();

  useEffect(() => {
    dispatch(addressActions.getAll());
  }, [user, dispatch]);

  // useEffect(() => {
  //   if (addressList.length > 0) {
  //     const add = addressList.find((item) => item._id === initInfo.addressId);
  //     if (add) {
  //       setDeliveryAddress(add);
  //     }
  //   }
  // }, [addressList, initInfo.addressId]);

  const receiveOpts = [
    {
      value: 'store',
      title: t('cart.receive-at-store'),
      description: t('cart.receive-at-store-desc'),
      icons: ['/static/icons/ic_store.svg']
    },
    {
      value: 'delivery',
      title: t('cart.delivery-to-home'),
      description: t('cart.delivery-to-home-desc'),
      icons: ['/static/icons/ic_home-delivery.svg']
    }
  ];

  // eslint-disable-next-line no-unused-vars
  const deliveryOpts = [
    {
      value: 0,
      title: 'Standard delivery (Free)',
      description: 'Delivered on Monday, August 12'
    },
    {
      value: 2,
      title: 'Fast delivery ($2,00)',
      description: 'Delivered on Monday, August 5'
    }
  ];

  const OrderInfoSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('address.full-name-required'))
      .min(3, t('address.full-name-min'))
      .max(50, t('address.full-name-max')),
    phone: Yup.string()
      .required(t('address.phone-required'))
      .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, t('address.phone-invalid')),

    isAuthenticated: Yup.boolean(),
    receiveMethod: Yup.string().required(t('cart.receive-method-required')),
    isReceiveAtStore: Yup.boolean().required(),

    userAddressId: Yup.string().when('isAuthenticated', {
      is: true,
      then: Yup.string().when('isReceiveAtStore', {
        is: false,
        then: Yup.string().required('Vui lòng chọn địa chỉ nhận hàng'),
        otherwise: Yup.string().notRequired()
      }),
      otherwise: Yup.string().notRequired()
    }),

    // only for delivery
    street: Yup.string().when(['isReceiveAtStore', 'isAuthenticated'], {
      is: false,
      then: Yup.string().required(t('address.street-required')),
      otherwise: Yup.string().notRequired()
    }),
    ward: Yup.string().when(['isReceiveAtStore', 'isAuthenticated'], {
      is: false,
      then: Yup.string().required(t('address.ward-required')),
      otherwise: Yup.string().notRequired()
    }),
    district: Yup.string().when(['isReceiveAtStore', 'isAuthenticated'], {
      is: false,
      then: Yup.string().required(t('address.district-required')),
      otherwise: Yup.string().notRequired()
    }),
    province: Yup.string().when(['isReceiveAtStore', 'isAuthenticated'], {
      is: false,
      then: Yup.string().required(t('address.province-required')),
      otherwise: Yup.string().notRequired()
    }),
    note: Yup.string()
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: initInfo.name || '',
      phone: initInfo.phone || '',

      receiveMethod: initInfo.receiveMethod || 'delivery',
      isReceiveAtStore: initInfo.isReceiveAtStore || initInfo.receiveMethod === 'store',
      isAuthenticated,

      street: initInfo.street || '',
      ward: initInfo?.ward || '',
      district: initInfo?.district || '',
      province: initInfo?.province || '',
      note: initInfo.note || '',

      userAddressId: initInfo.userAddressId || ''
    },
    validationSchema: OrderInfoSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        cartHelper.saveBillingInfo(values);
        handleNextStep();
        setSubmitting(true);
      } catch (e) {
        enqueueSnackbar('Lỗi', {
          variant: 'error'
        });
      }
    }
  });

  const { errors, values, touched, handleSubmit, setFieldValue, getFieldProps } = formik;

  useEffect(() => {
    formik.setFieldValue('isAuthenticated', isAuthenticated);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleAddAddress = () => {
    setOpenForm(true);
  };

  const handleSaveAddress = (data) => {
    dispatch(addressActions.create(data));
    setOpenForm(false);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  // eslint-disable-next-line no-unused-vars
  const handleChangeAddress = (e) => {
    setFieldValue('userAddressId', e.target.value);
    const add = addressList.find((item) => item._id === e.target.value);
    if (add) {
      setFieldValue('name', add.name);
      setFieldValue('phone', add.phone);
      setFieldValue('street', add.street);
      setFieldValue('ward', add.ward);
      setFieldValue('district', add.district);
      setFieldValue('province', add.province);
    }
  };

  const handleChangeReceiveMethod = (_, value) => {
    if (value === 'delivery') {
      setFieldValue('isReceiveAtStore', false);
    } else {
      setFieldValue('isReceiveAtStore', true);
    }
    setFieldValue('receiveMethod', value);
    if (user && isAuthenticated) {
      if (!values.name) {
        setFieldValue('name', user.fullName);
      }
      if (!values.phone) {
        setFieldValue('phone', user.phone);
      }
    }
  };

  const handleNextStep = () => {
    dispatch(setOrderInfo(formik.values));
    dispatch(nextStepOrder());
  };

  const handleBackStep = () => {
    dispatch(setOrderInfo(formik.values));
    dispatch(backStepOrder());
  };

  const renderAddressInput = () => {
    if (isAuthenticated) {
      return (
        <>
          {errors.userAddressId && touched.userAddressId && (
            <Alert sx={{ mb: 2 }} severity="error">
              {errors.userAddressId}
            </Alert>
          )}
          <RadioGroup name="userAddressId">
            <Grid container spacing={2}>
              {addressList.map((add) => {
                const { _id, name, phone, street, ward, district, province } = add;
                return (
                  <Grid key={_id} item xs={12} md={12}>
                    <OptionStyle
                      sx={{
                        ...(values.userAddressId === _id && {
                          boxShadow: (theme) => theme.customShadows.z8
                        })
                      }}
                    >
                      <FormControlLabel
                        value={_id}
                        onChange={handleChangeAddress}
                        control={<Radio checkedIcon={<Icon icon={checkmarkCircle2Fill} />} />}
                        label={
                          <Box sx={{ mx: 1 }}>
                            <Typography variant="subtitle2">{name}</Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {`Điện thoại: ${phone}`}
                            </Typography>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                              {`${street}, ${ward}, ${district}, ${province}`}
                            </Typography>
                          </Box>
                        }
                        sx={{ py: 3, flexGrow: 1, mr: 0 }}
                      />
                    </OptionStyle>
                  </Grid>
                );
              })}
            </Grid>
          </RadioGroup>

          <Button
            id="add-card"
            type="button"
            size="small"
            startIcon={<Icon icon={plusFill} width={20} height={20} />}
            onClick={handleAddAddress}
            sx={{ mt: 3 }}
          >
            {t('address.add-title')}
          </Button>
        </>
      );
    }
    return (
      <Stack spacing={{ xs: 2, sm: 3 }} sx={{ mb: 3 }}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <TextField
            fullWidth
            label={t('address.full-name')}
            {...getFieldProps('name')}
            error={Boolean(touched.name && errors.name)}
            helperText={touched.name && errors.name}
          />
          <TextField
            fullWidth
            label={t('address.phone')}
            {...getFieldProps('phone')}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />
        </Stack>

        <AddressPicker formik={formik} />

        <TextField fullWidth label={t('address.note')} {...getFieldProps('note')} />
      </Stack>
    );
  };

  return (
    <>
      {(!process.env.NODE_ENV || process.env.NODE_ENV === 'development') && errors && <p>{JSON.stringify(errors)}</p>}
      <FormikProvider value={formik} noValidate onSubmit={handleSubmit}>
        <Form autoComplete="off">
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Card>
                <CardHeader title={t('cart.receive-method')} />
                <CardContent>
                  <RadioGroup row {...getFieldProps('receiveMethod')} onChange={handleChangeReceiveMethod}>
                    <Grid container spacing={2}>
                      {receiveOpts.map((method) => {
                        const { value, title, icons, description } = method;
                        const isDelivery = value === 'delivery';
                        const isStore = value === 'store';

                        return (
                          <Grid key={title} item xs={12}>
                            <OptionStyle
                              sx={{
                                ...(values.receiveMethod === value && {
                                  boxShadow: (theme) => theme.customShadows.z8
                                }),
                                ...((isDelivery || isStore) && { flexWrap: 'wrap' })
                              }}
                            >
                              <FormControlLabel
                                value={value}
                                control={<Radio checkedIcon={<Icon icon={checkmarkCircle2Fill} />} />}
                                label={
                                  <Box sx={{ ml: 1 }}>
                                    <Typography variant="subtitle2">{title}</Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                      {description}
                                    </Typography>
                                  </Box>
                                }
                                sx={{ flexGrow: 1, py: 3 }}
                              />
                              <MHidden width="smDown">
                                <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                                  {icons.map((icon) => (
                                    <Box
                                      key={icon}
                                      component="img"
                                      alt="logo card"
                                      src={icon}
                                      sx={{ '&:last-child': { ml: 1 }, width: '70px' }}
                                    />
                                  ))}
                                </Box>
                              </MHidden>

                              {/* {isDelivery && (
                                <Collapse in={values.receiveMethod === 'delivery'} sx={{ width: '100%' }}>
                                  {user ? renderUserSelectAddress() : renderInputAddressForGuest()}
                                </Collapse>
                              )} */}
                              {isStore && (
                                <Collapse in={values.receiveMethod === 'store'} sx={{ width: '100%' }}>
                                  <Stack spacing={{ xs: 2, sm: 3 }} sx={{ mb: 3 }}>
                                    {/* {receiveAtStoreError && !(touched.name || touched.phone) && (
                                      <Alert sx={{ mb: 2 }} severity="error">
                                        {receiveAtStoreError}
                                      </Alert>
                                    )} */}
                                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                                      <TextField
                                        fullWidth
                                        label={t('address.full-name')}
                                        {...getFieldProps('name')}
                                        error={Boolean((touched.name || receiveAtStoreError) && errors.name)}
                                        helperText={(touched.name || receiveAtStoreError) && errors.name}
                                      />
                                      <TextField
                                        fullWidth
                                        label={t('address.phone')}
                                        {...getFieldProps('phone')}
                                        error={Boolean((touched.name || receiveAtStoreError) && errors.phone)}
                                        helperText={(touched.phone || receiveAtStoreError) && errors.phone}
                                      />
                                    </Stack>
                                  </Stack>
                                </Collapse>
                              )}
                            </OptionStyle>
                          </Grid>
                        );
                      })}
                    </Grid>
                  </RadioGroup>

                  {errors.receiveMethod && (
                    <FormHelperText error>
                      <Box component="span" sx={{ px: 2 }}>
                        {touched.receiveMethod && errors.receiveMethod}
                      </Box>
                    </FormHelperText>
                  )}
                </CardContent>
              </Card>

              {values.receiveMethod === 'delivery' && (
                <Card sx={{ mt: 3 }}>
                  <CardHeader title="Địa chỉ nhận hàng" />
                  <CardContent>{renderAddressInput()}</CardContent>
                </Card>
              )}

              {/* {values.receiveMethod === 'delivery' && (
                <CheckoutDelivery
                  formik={formik}
                  onApplyShipping={handleApplyShipping}
                  deliveryOptions={deliveryOpts}
                  sx={{ mt: 3 }}
                />
              )} */}
            </Grid>

            <ActionArea onBack={handleBackStep} setErrorMgs={setReceiveAtStoreError} />
          </Grid>
        </Form>
      </FormikProvider>

      <AddressForm
        addressData={null}
        open={openForm}
        onClose={handleClose}
        onSubmit={handleSaveAddress}
        isLoading={isLoading}
      />
    </>
  );
}
