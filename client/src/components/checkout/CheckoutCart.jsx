import { Icon } from '@iconify/react';
import { useFormik, Form, FormikProvider } from 'formik';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import { Grid, Card, Button, CardHeader, Typography } from '@material-ui/core';
// routes
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
// hooks
import { useDispatch, useSelector } from 'react-redux';
import useLocales from '../../hooks/useLocales';
import useAuth from '../../hooks/useAuth';
import useOrderFlow from '../../hooks/useOrderFlow';
// components
import Scrollbar from '../Scrollbar';
import EmptyContent from '../EmptyContent';
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';
import {
  decreaseProductToCartDB,
  deleteProductToCartDB,
  getProductToCartDB,
  increaseProductToCartDB
} from '../../redux/slices/writeOrderSlice';
import { getSubTotal } from '../../helper/localStorageHelper';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const {
    cart,
    quantityInCart,
    activeStep,
    subTotal,
    removeToCart,
    increaseProductInCart,
    decreaseProductInCart,
    nextStepOrder
  } = useOrderFlow();
  const [isIncreaseToCart, setIsIncreaseToCart] = useState(false);
  const [isDecreaseToCart, setIsDecreaseToCart] = useState(false);
  const discount = cart.length > 0 ? 50000 : 0;
  const { list: listProducts } = useSelector((state) => state.writeOrder);
  let isEmptyCart = !(listProducts && listProducts.length > 0);
  const [subTotalDB, setSubTotalDB] = useState(0);

  // Set cart
  if (!user) {
    isEmptyCart = cart ? cart.length === 0 : true;
  }

  useEffect(() => {
    if (user) {
      dispatch(getProductToCartDB());
    }
  }, [dispatch, cart, isIncreaseToCart, isDecreaseToCart]);

  useEffect(() => {
    setSubTotalDB(getSubTotal(listProducts));
    isEmptyCart = !(listProducts && listProducts.length > 0);
  }, [listProducts]);

  const handleDeleteCart = (_id, skuVariant) => {
    removeToCart(_id, skuVariant).then(() => {
      enqueueSnackbar(t('cart.notification.remove'), { variant: 'success' });
    });
    const productInfo = {
      productId: _id,
      skuVariant
    };
    if (isAuthenticated) {
      dispatch(deleteProductToCartDB(productInfo)).then(() => {
        dispatch(getProductToCartDB());
      });
    }
  };

  const handleNextStep = () => {
    nextStepOrder(activeStep);
  };

  const handleApplyDiscount = () => {
    // dispatch(applyDiscount(value));
  };

  const handleIncreaseQuantity = (_id, skuVariant) => {
    increaseProductInCart(_id, skuVariant).then(() => {
      enqueueSnackbar(t('cart.notification.increase'), { variant: 'success' });
    });
    if (isAuthenticated) {
      const productInfo = {
        productId: _id,
        skuVariant
      };
      setIsIncreaseToCart(true);
      dispatch(increaseProductToCartDB(productInfo)).then(() => {
        setIsIncreaseToCart(false);
      });
    }
  };

  const handleDecreaseQuantity = (_id, skuVariant) => {
    decreaseProductInCart(_id, skuVariant).then(() => {
      enqueueSnackbar(t('cart.notification.decrease'), { variant: 'success' });
    });
    if (isAuthenticated) {
      const productInfo = {
        productId: _id,
        skuVariant
      };
      setIsDecreaseToCart(true);
      dispatch(decreaseProductToCartDB(productInfo)).then(() => {
        setIsDecreaseToCart(false);
      });
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { products: user ? listProducts : cart },
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
                      ({user ? listProducts.length : quantityInCart} {t('cart.item')})
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
                    isDecreaseToCart={isDecreaseToCart}
                    isIncreaseToCart={isIncreaseToCart}
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
              total={user ? subTotalDB : subTotal}
              // enableDiscount
              discount={discount}
              subtotal={user ? subTotalDB : subTotal}
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
