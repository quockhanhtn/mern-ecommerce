import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Grid, Card, Button, CardHeader, Typography } from '@material-ui/core';
// routes
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
//
import Scrollbar from '../../Scrollbar';
import EmptyContent from '../../EmptyContent';
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';
import useToCart from '../../../hooks/useToCart';
import * as Helper from '../../../helper/cartHelper';
import useAuth from '../../../hooks/useAuth';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const { enqueueSnackbar } = useSnackbar();
  const {
    cart,
    quantityInCart,
    activeStep,
    removeToCart,
    increaseProductInCart,
    decreaseProductInCart,
    nextStepPayment
  } = useToCart();
  const { user } = useAuth();
  const [subTotal, setSubTotal] = useState(Helper.getSubTotal(cart));
  const discount = cart.length > 0 ? 50000 : 0;
  const [total, setTotal] = useState(Helper.getSubTotal(cart) - discount);
  const isEmptyCart = cart ? cart.length === 0 : true;

  useEffect(() => {
    setSubTotal(Helper.getSubTotal(cart));
    setTotal(Helper.getSubTotal(cart) - discount);
  }, [cart]);

  const handleDeleteCart = (_id, skuVariant) => {
    removeToCart(_id, skuVariant).then(() => {
      enqueueSnackbar('Remove to cart successfully', {
        variant: 'success'
      });
    });
  };

  const handleNextStep = () => {
    nextStepPayment(activeStep).then(() => {
      enqueueSnackbar('Next step to cart successfully', {
        variant: 'success'
      });
    });
  };

  const handleApplyDiscount = () => {
    // dispatch(applyDiscount(value));
  };

  const handleIncreaseQuantity = (_id, skuVariant) => {
    increaseProductInCart(_id, skuVariant).then(() => {
      enqueueSnackbar('Increase to cart successfully', {
        variant: 'success'
      });
    });
  };

  const handleDecreaseQuantity = (_id, skuVariant) => {
    decreaseProductInCart(_id, skuVariant).then(() => {
      enqueueSnackbar('Decrease to cart successfully', {
        variant: 'success'
      });
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
                    Card
                    <Typography component="span" sx={{ color: 'text.secondary' }}>
                      &nbsp;({quantityInCart} item)
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
                  title="Cart is empty"
                  description="Look like you have no items in your shopping cart."
                  img="/static/illustrations/illustration_empty_cart.svg"
                />
              )}
            </Card>

            <Button color="inherit" href="/" startIcon={<Icon icon={arrowIosBackFill} />}>
              Continue Shopping
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <CheckoutSummary
              total={total}
              // enableDiscount
              discount={discount}
              subtotal={subTotal}
              onApplyDiscount={handleApplyDiscount}
            />
            <Button fullWidth size="large" type="submit" variant="contained" disabled={values.products.length === 0}>
              Check Out
            </Button>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
