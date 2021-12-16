import { useEffect, useState } from 'react';
// icons
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
// material
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import {
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
import { Form, FormikProvider, useFormik } from 'formik';
import * as Yup from 'yup';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import useLocales from '../../hooks/useLocales';
import useOrderFlow from '../../hooks/useOrderFlow';
import useAuth from '../../hooks/useAuth';
// components
import { MHidden } from '../@material-extend';
import Label from '../Label';
import AddressPicker from '../location/AddressPicker';
import AddressForm from '../account/AddressForm';
import CheckoutSummary from './CheckoutSummary';
import CheckoutDelivery from './CheckoutDelivery';
// other
import * as cartHelper from '../../helper/localStorageHelper';
// actions
import { getAllAddresses, createAddress } from '../../actions/account';

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

export default function CheckoutBillingAddress() {
  const { t } = useLocales();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuth();
  const dispatch = useDispatch();
  const { list: addressList, isLoading, error } = useSelector((state) => state.account.addresses);

  const [openForm, setOpenForm] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState(null);

  const { cart, subTotal, activeStep, updateOrderInfo, backStepOrder, nextStepOrder } = useOrderFlow();
  const discount = cart.length > 0 ? 50000 : 0;

  const initInfo = cartHelper.getOrderInfo();

  useEffect(() => {
    dispatch(getAllAddresses());
  }, [user, dispatch]);

  useEffect(() => {
    if (addressList.length > 0) {
      const add = addressList.find((item) => item._id === initInfo.addressId);
      if (add) {
        setDeliveryAddress(add);
      }
    }
  }, [addressList, initInfo.addressId]);

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

    receiveMethod: Yup.string().required(t('cart.receive-method-required')),
    isReceiveAtStore: Yup.boolean().required(),

    // only for delivery
    street: Yup.string().when('isReceiveAtStore', {
      is: false,
      then: Yup.string().required(t('address.street-required')),
      otherwise: Yup.string().notRequired()
    }),
    ward: Yup.string().when('isReceiveAtStore', {
      is: false,
      then: Yup.string().required(t('address.ward-required')),
      otherwise: Yup.string().notRequired()
    }),
    district: Yup.string().when('isReceiveAtStore', {
      is: false,
      then: Yup.string().required(t('address.district-required')),
      otherwise: Yup.string().notRequired()
    }),
    province: Yup.string().when('isReceiveAtStore', {
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

      street: initInfo.street || '',
      ward: initInfo?.ward || '',
      district: initInfo?.district || '',
      province: initInfo?.province || '',
      note: initInfo.note || ''
    },
    validationSchema: OrderInfoSchema,
    onSubmit: async (values, { setSubmitting }) => {
      console.log('Submit', {
        values,
        errors
      });
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
    if (deliveryAddress) {
      setFieldValue('name', deliveryAddress.name);
      setFieldValue('phone', deliveryAddress.phone);

      setFieldValue('street', deliveryAddress.street);
      setFieldValue('ward', deliveryAddress.ward);
      setFieldValue('district', deliveryAddress.district);
      setFieldValue('province', deliveryAddress.province);
    }
  }, [deliveryAddress]);

  const handleAddAddress = () => {
    setOpenForm(true);
  };

  const handleSaveAddress = (data) => {
    dispatch(createAddress(data)).then(() => {
      setDeliveryAddress(addressList[addressList.length - 1]);
    });
    setOpenForm(false);
  };

  const handleClose = () => {
    setOpenForm(false);
  };

  // eslint-disable-next-line no-unused-vars
  const handleChangeAddress = (e, value) => {
    const selectedAddress = addressList.find((address) => address._id === e.target.value);
    setDeliveryAddress(selectedAddress);
  };

  const handleChangeReceiveMethod = (_, value) => {
    if (value === 'delivery') {
      setFieldValue('isReceiveAtStore', false);
    } else {
      setFieldValue('isReceiveAtStore', true);
    }
    setFieldValue('receiveMethod', value);
  };

  const handleApplyShipping = () => {
    //
  };

  const handleNextStep = () => {
    if (deliveryAddress) {
      setFieldValue('street', deliveryAddress.street);
      setFieldValue('ward', deliveryAddress.ward);
      setFieldValue('district', deliveryAddress.district);
      setFieldValue('province', deliveryAddress.province);
    }

    console.log('Submit', {
      values,
      errors
    });
    updateOrderInfo(formik.values);
    nextStepOrder(activeStep);
  };

  const handleBackStep = () => {
    backStepOrder(activeStep);
  };

  const renderUserSelectAddress = () => (
    <>
      <TextField
        select
        fullWidth
        label={t('address.title')}
        {...getFieldProps('addressId')}
        SelectProps={{ native: true }}
        onChange={handleChangeAddress}
        value={deliveryAddress?._id || ''}
      >
        {addressList.map((add, index) => (
          <option key={`address-item-${index}`} value={add._id}>
            {`${add.name} ${add.phone} - ${add.street}, ${add.ward}, ${add.district}, ${add.province}`}
          </option>
        ))}
      </TextField>

      <Button
        id="add-card"
        type="button"
        size="small"
        startIcon={<Icon icon={plusFill} width={20} height={20} />}
        onClick={handleAddAddress}
        sx={{ my: 3 }}
      >
        {t('address.add-title')}
      </Button>
    </>
  );

  const renderInputAddressForGuest = () => (
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

  return (
    <>
      {errors && <p>{JSON.stringify(errors)}</p>}
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

                              {isDelivery && (
                                <Collapse in={values.receiveMethod === 'delivery'} sx={{ width: '100%' }}>
                                  {user ? renderUserSelectAddress() : renderInputAddressForGuest()}
                                </Collapse>
                              )}
                              {isStore && (
                                <Collapse in={values.receiveMethod === 'store'} sx={{ width: '100%' }}>
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
                <CheckoutDelivery
                  formik={formik}
                  onApplyShipping={handleApplyShipping}
                  deliveryOptions={deliveryOpts}
                  sx={{ mt: 3 }}
                />
              )}

              <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
                <Button
                  size="small"
                  color="inherit"
                  onClick={handleBackStep}
                  startIcon={<Icon icon={arrowIosBackFill} />}
                >
                  {t('common.back')}
                </Button>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <CheckoutSummary subtotal={subTotal} total={subTotal} discount={discount} />
              <Button type="submit" fullWidth size="large" variant="contained">
                {t('common.continue')}
              </Button>
            </Grid>
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
