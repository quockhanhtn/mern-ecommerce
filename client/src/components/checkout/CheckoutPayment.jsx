// icons
import { Icon } from '@iconify/react';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// form validation
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Grid, Button } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// hooks
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import useLocales from '../../hooks/useLocales';
import useAuth from '../../hooks/useAuth';
import useOrderFlow from '../../hooks/useOrderFlow';
// components
import CheckoutSummary from './CheckoutSummary';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';

import * as Helper from '../../helper/localStorageHelper';
import * as API from '../../api';

// ----------------------------------------------------------------------

export default function CheckoutPayment() {
  const { t } = useLocales();
  const { user } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const { orderInfo, cart, subTotal, activeStep, backStepOrder, nextStepOrder, getCart } = useOrderFlow();
  const discount = cart.length > 0 ? 50000 : 0;

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

  const handleCompleteOrder = () => {
    nextStepOrder(activeStep).then(() => {
      Helper.completeOrder();
      getCart();
    });
  };

  const handleBackStep = () => {
    backStepOrder(activeStep);
  };

  const handlePayment = async (values) => {
    console.log('payment', values);
    console.log('payment', orderInfo);

    const customer = {
      name: orderInfo.name,
      phone: orderInfo.phone
    };

    const address = {
      street: orderInfo.street,
      ward: orderInfo.ward,
      district: orderInfo.district,
      province: orderInfo.province,
      name: orderInfo.name,
      phone: orderInfo.phone
    };

    API.createOrder({
      ...values,
      ...orderInfo,
      customerInfo: customer,
      address,
      items: cart.map((item) => ({
        product: item._id,
        sku: item.skuVariant,
        quantity: item.quantity
      }))
    });
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
        handlePayment(values);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error.message);
      }
    }
  });

  const { isSubmitting, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <CheckoutPaymentMethods formik={formik} paymentOptions={paymentOpts} />
            <Button
              type="button"
              size="small"
              color="inherit"
              onClick={handleBackStep}
              startIcon={<Icon icon={arrowIosBackFill} />}
              sx={{ mt: 3 }}
            >
              {t('common.back')}
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutBillingInfo orderInfo={orderInfo} onBackStep={handleBackStep} />
            <CheckoutSummary subtotal={subTotal} total={subTotal} discount={discount} />
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Complete Order
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
