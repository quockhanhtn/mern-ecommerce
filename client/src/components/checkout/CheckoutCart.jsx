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
import { useLocales, useAuth, useOrderFlow } from '../../hooks';
// components
import Scrollbar from '../Scrollbar';
import EmptyContent from '../EmptyContent';
import CheckoutSummary from './CheckoutSummary';
import CheckoutProductList from './CheckoutProductList';
import { decreaseItemQty, deleteProductToCartDB, getCartItems, increaseItemQty } from '../../redux/slices/cartSlice';
import { getSubTotal } from '../../helper/localStorageHelper';

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const { user, isAuthenticated } = useAuth();
  const dispatch = useDispatch();
  const { cart, quantityInCart, activeStep, subTotal, removeToCart, nextStepOrder } = useOrderFlow();

  const discount = cart.length > 0 ? 50000 : 0;
  const { allItems: listProducts, isLoading: isLoadingCart } = useSelector((state) => state.cart);

  const [subTotalDB, setSubTotalDB] = useState(0);

  // useEffect(() => {
  //   if (user) {
  //     dispatch(getCartItems());
  //   }
  // }, [dispatch, cart]);

  useEffect(() => {
    setSubTotalDB(getSubTotal(listProducts));
  }, [listProducts]);

  const handleApplyDiscount = () => {
    // dispatch(applyDiscount(value));
  };

  const handleIncreaseQuantity = (productId, sku, qty) => {
    dispatch(increaseItemQty({ productId, sku, qty })).then(() => {
      enqueueSnackbar(t('cart.notification.increase'), { variant: 'success' });
    });
  };

  const handleDecreaseQuantity = (productId, sku, qty) => {
    dispatch(decreaseItemQty({ productId, sku, qty })).then(() => {
      enqueueSnackbar(t('cart.notification.decrease'), { variant: 'success' });
    });
  };

  const handleDeleteCart = (productId, sku) => {
    removeToCart(productId, sku).then(() => {
      enqueueSnackbar(t('cart.notification.remove'), { variant: 'success' });
    });
    if (isAuthenticated) {
      dispatch(deleteProductToCartDB({ productId, sku })).then(() => {
        dispatch(getCartItems());
      });
    }
  };

  const handleNextStep = () => {
    nextStepOrder(activeStep);
  };

  if (isLoadingCart) {
    return <>Loading...</>;
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={8}>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Typography variant="h6">
                {t('cart.title-detail')}
                <Typography component="span" sx={{ ml: 2, color: 'text.secondary' }}>
                  ({user ? listProducts?.length : quantityInCart} {t('cart.item')})
                </Typography>
              </Typography>
            }
            sx={{ mb: 3 }}
          />

          {listProducts?.length > 0 ? (
            <Scrollbar>
              <CheckoutProductList
                products={listProducts}
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
          total={user ? subTotalDB : subTotal}
          // enableDiscount
          discount={discount}
          subtotal={user ? subTotalDB : subTotal}
          onApplyDiscount={handleApplyDiscount}
        />
        <Button fullWidth size="large" onClick={handleNextStep} variant="contained" disabled={!listProducts?.length}>
          {t('cart.checkout')}
        </Button>
      </Grid>
    </Grid>
  );
}
