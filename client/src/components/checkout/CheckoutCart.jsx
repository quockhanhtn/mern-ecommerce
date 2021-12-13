import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Grid, Card, Button, CardHeader, Typography } from '@material-ui/core';
// routes
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
// hooks
import useLocales from '../../hooks/useLocales';
import useAuth from '../../hooks/useAuth';
import useToCart from '../../hooks/useToCart';
// components
import Scrollbar from '../Scrollbar';
import EmptyContent from '../EmptyContent';
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const {
    cart,
    quantityInCart,
    activeStep,
    subTotal,
    removeToCart,
    increaseProductInCart,
    decreaseProductInCart,
    nextStepPayment
  } = useToCart();
  const { user } = useAuth();
  const discount = cart.length > 0 ? 50000 : 0;
  const isEmptyCart = cart ? cart.length === 0 : true;

  const handleDeleteCart = (_id, skuVariant) => {
    removeToCart(_id, skuVariant).then(() => {
      enqueueSnackbar(t('cart.notification.remove'), { variant: 'success' });
    });
  };

  const handleNextStep = () => {
    nextStepPayment(activeStep);
  };

  const handleApplyDiscount = () => {
    // dispatch(applyDiscount(value));
  };

  const handleIncreaseQuantity = (_id, skuVariant) => {
    increaseProductInCart(_id, skuVariant).then(() => {
      enqueueSnackbar(t('cart.notification.increase'), { variant: 'success' });
    });
  };

  const handleDecreaseQuantity = (_id, skuVariant) => {
    decreaseProductInCart(_id, skuVariant).then(() => {
      enqueueSnackbar(t('cart.notification.decrease'), { variant: 'success' });
    });
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { products: cart },
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        setSubmitting(true);
        handleNextStep();
      } catch (error) {
        console.error(error);
        setErrors(error.message);
      }
    }
  });

  const { values, handleSubmit } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardHeader
                title={
                  <Typography variant="h6">
                    {t('cart.title-detail')}
                    <Typography component="span" sx={{ ml: 2, color: 'text.secondary' }}>
                      ({quantityInCart} {t('cart.item')})
                    </Typography>
                  </Typography>
                }
                sx={{ mb: 3 }}
              />

              {!isEmptyCart ? (
                <Scrollbar>
                  <CheckoutProductList
                    formik={formik}
                    onDelete={handleDeleteCart}
                    onIncreaseQuantity={handleIncreaseQuantity}
                    onDecreaseQuantity={handleDecreaseQuantity}
                  />
                </Scrollbar>
              ) : (
                <EmptyContent
                  title={t('cart.empty')}
                  description={t('cart.empty-desc')}
                  img="/static/illustrations/illustration_empty_cart.svg"
                />
              )}
            </Card>

            <Button color="inherit" href="/" startIcon={<Icon icon={arrowIosBackFill} />}>
              {t('cart.empty-action')}
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutSummary
              total={subTotal}
              // enableDiscount
              discount={discount}
              subtotal={subTotal}
              onApplyDiscount={handleApplyDiscount}
            />
            <Button fullWidth size="large" type="submit" variant="contained" disabled={values.products.length === 0}>
              {t('cart.checkout')}
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
