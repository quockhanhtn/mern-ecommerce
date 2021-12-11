import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Grid, Button } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// redux
import { useDispatch, useSelector } from 'react-redux';
//
import { useTheme } from '@material-ui/core/styles';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import CheckoutSummary from './CheckoutSummary';
import CheckoutDelivery from './CheckoutDelivery';
import CheckoutBillingInfo from './CheckoutBillingInfo';
import CheckoutPaymentMethods from './CheckoutPaymentMethods';
import useLocales from '../../../hooks/useLocales';
import useAuth from '../../../hooks/useAuth';
import useToCart from '../../../hooks/useToCart';
import * as Helper from '../../../helper/cartHelper';
import * as HelperPayment from '../../../helper/paymentHelper';

// ----------------------------------------------------------------------

const DELIVERY_OPTIONS = [
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

const PAYMENT_OPTIONS = [
  {
    value: 'paypal',
    title: 'Pay with Paypal',
    description: 'You will be redirected to PayPal website to complete your purchase securely.',
    icons: ['/static/icons/ic_paypal.svg']
  },
  {
    value: 'vn_pay',
    title: 'Pay with VnPay',
    description: 'You will be redirected to VnPay website to complete your purchase securely.',
    icons: ['/static/icons/ic_vnpay.svg']
  },
  {
    value: 'credit_card',
    title: 'Credit / Debit Card',
    description: 'We support Mastercard, Visa, Discover and Stripe.',
    icons: ['/static/icons/ic_mastercard.svg', '/static/icons/ic_visa.svg']
  },
  {
    value: 'cash',
    title: 'Cash on CheckoutDelivery',
    description: 'Pay with cash when your order is delivered.',
    icons: []
  }
];

const CARDS_OPTIONS = [
  { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
  { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
  { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' }
];

// ----------------------------------------------------------------------

export default function CheckoutPayment() {
  const dispatch = useDispatch();
  const { t } = useLocales();
  const theme = useTheme();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { cart, activeStep, backStepPayment, nextStepPayment, getCart } = useToCart();
  const [subTotal, setSubTotal] = useState(Helper.getSubTotal(cart));
  const discount = cart.length > 0 ? 50000 : 0;
  const [total, setTotal] = useState(Helper.getSubTotal(cart) - discount);
  const initInfo = Helper.getBillingInfo();

  const handleCompleteOrder = () => {
    nextStepPayment(activeStep).then(() => {
      Helper.completeOrder();
      getCart();
      enqueueSnackbar('Next step to cart successfully', {
        variant: 'success'
      });
    });
  };

  const handleBackStep = () => {
    backStepPayment(activeStep).then(() => {
      enqueueSnackbar('Back step to cart successfully', {
        variant: 'success'
      });
    });
  };

  const handleGotoStep = (step) => {
    backStepPayment(step).then(() => {
      enqueueSnackbar('Back step to cart successfully', {
        variant: 'success'
      });
    });
  };

  const handleApplyShipping = (value) => {
    // dispatch(applyShipping(value));
  };

  const handlePayment = async (values) => {
    if (values.payment === 'vn_pay') {
      const data = await HelperPayment.paymentVnPay(values);
      window.open(data.data, '_blank')?.focus();
      // const openerWindow = window.open(
      //   data.data,
      //   '_blank',
      //   'toolbar=yes,scrollbars=yes,resizable=yes, width=800,height=700'
      // );
      // const timer = setInterval(() => {
      //   if (openerWindow.closed) {
      //     clearInterval(timer);
      //     // window.location.reload();// Refresh the parent page
      //     // handleCompleteOrder();
      //   }
      // }, 1000);
    } else {
      handleCompleteOrder();
    }
  };

  const PaymentSchema = Yup.object().shape({
    payment: Yup.mixed().required('Payment is required')
  });

  const formik = useFormik({
    initialValues: {
      delivery: initInfo,
      payment: ''
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
            <CheckoutDelivery
              formik={formik}
              onApplyShipping={handleApplyShipping}
              deliveryOptions={DELIVERY_OPTIONS}
            />
            <CheckoutPaymentMethods formik={formik} cardOptions={CARDS_OPTIONS} paymentOptions={PAYMENT_OPTIONS} />
            <Button
              type="button"
              size="small"
              color="inherit"
              onClick={handleBackStep}
              startIcon={<Icon icon={arrowIosBackFill} />}
            >
              Back
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutBillingInfo billingInfo={initInfo} onBackStep={handleBackStep} />
            <CheckoutSummary
              enableEdit
              total={total}
              subtotal={subTotal}
              discount={discount}
              // shipping={shipping}
              onEdit={() => handleGotoStep(0)}
            />
            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
              Complete Order
            </LoadingButton>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
