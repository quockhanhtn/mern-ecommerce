// icons
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// form validation
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Grid, Button } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { useLayoutEffect } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector, useDispatch } from 'react-redux';
import { useLocales } from '../../hooks';
// components
import CheckoutSummary from './CheckoutSummary';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';

import { createOrder, backStepOrder } from '../../redux/slices/orderSlice';

import * as typeUtils from '../../utils/typeUtils';

// ----------------------------------------------------------------------

export default function CheckoutPayment() {
  const { t } = useLocales();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { orderInfo, isLoading: isCreatingOrder, orderCreated, error } = useSelector((state) => state.order);

  useLayoutEffect(() => {
    if (error) {
      console.log('orderError', error);
      enqueueSnackbar(error?.message || 'Có lỗi', { variant: 'error' });
      return;
    }

    if (orderCreated) {
      if (typeUtils.isNotEmptyStr(orderCreated._id)) {
        // Helper.clearAfterOrder();
        // if (isAuthenticated) {
        //   dispatch(cleanCart());
        // }
        let redirect = `/order/${orderCreated._id}`;
        if (orderCreated.paymentUrl) {
          redirect = orderCreated.paymentUrl;
        }
        window.open(redirect, '_self');
        localStorage.removeItem('orderLocalStorage');
      } else {
        enqueueSnackbar('Hệ thống bận, vui lòng thử lại !', { variant: 'error' });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderCreated, error]);

  const paymentOpts = [
    {
      value: 'vnpay',
      title: t('cart.payment-method-vnpay'),
      description: t('cart.payment-method-vnpay-desc'),
      icons: ['/static/icons/ic_vnpay.svg']
    },
    {
      value: 'paypal',
      title: t('cart.payment-method-paypal'),
      description: t('cart.payment-method-paypal-desc'),
      icons: ['/static/icons/ic_paypal.svg'],
      isDevelop: true
    },
    {
      value: 'momo',
      title: t('cart.payment-method-momo'),
      description: t('cart.payment-method-momo-desc'),
      icons: ['/static/icons/ic_momo.svg'],
      isDevelop: true
    },
    {
      value: 'zalopay',
      title: t('cart.payment-method-zalopay'),
      description: t('cart.payment-method-zalopay-desc'),
      icons: ['/static/icons/ic_zalopay.svg'],
      isDevelop: true
    },
    {
      value: 'credit_card',
      title: 'Credit / Debit Card',
      description: 'We support Mastercard, Visa, Discover and Stripe.',
      icons: ['/static/icons/ic_mastercard.svg', '/static/icons/ic_visa.svg'],
      isDevelop: true
    }
  ];

  if (orderInfo.isReceiveAtStore) {
    paymentOpts.splice(0, 0, {
      value: 'cash',
      title: t('cart.payment-method-cash'),
      description: t('cart.payment-method-cash-desc'),
      icons: []
    });
  } else {
    paymentOpts.splice(0, 0, {
      value: 'cod',
      title: t('cart.payment-method-cod'),
      description: t('cart.payment-method-cod-desc'),
      icons: []
    });
  }

  const handleBackStep = () => {
    dispatch(backStepOrder());
  };

  const handlePayment = async (values) => {
    dispatch(createOrder(values));
  };

  const PaymentSchema = Yup.object().shape({
    paymentMethod: Yup.mixed().required(t('cart.payment-method-required'))
  });

  const formik = useFormik({
    initialValues: {
      paymentMethod: ''
    },
    validationSchema: PaymentSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await handlePayment(values);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error.message);
      }
    }
  });

  const { handleSubmit } = formik;

  // if (isCreateOrdered) {
  //   return (
  //     <>
  //       <CheckoutSummary />
  //       <p>Sucesss</p>
  //       <p>{JSON.stringify(orderCreated)}</p>
  //     </>
  //   );
  // }

  return (
    <FormikProvider value={formik}>
      <Form
        autoComplete="off"
        noValidate
        onSubmit={handleSubmit}
        onKeyPress={(e) => {
          if (e.which === 13) {
            e.preventDefault();
          }
        }}
      >
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <CheckoutPaymentMethods formik={formik} paymentOptions={paymentOpts} />
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutBillingInfo orderInfo={orderInfo} onBackStep={handleBackStep} />
            <CheckoutSummary showDetail />
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isCreatingOrder}>
              {t('cart.order.action')}
            </LoadingButton>
            <Button
              type="button"
              size="small"
              fullWidth
              color="inherit"
              onClick={handleBackStep}
              startIcon={<Icon icon={arrowIosBackFill} />}
              sx={{ mt: 3 }}
            >
              {t('common.back')}
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
