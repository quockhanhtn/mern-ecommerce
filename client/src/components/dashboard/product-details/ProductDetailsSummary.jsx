// icons
import { Icon } from '@iconify/react';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
//

import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Stack, Button, Divider, Typography, FormHelperText } from '@material-ui/core';
// components
import { MButton } from '../../@material-extend';
import { fCurrency } from '../../../utils/formatNumber';
import { addItemToCart } from '../../../redux/slices/cartSlice';
import { useLocales } from '../../../hooks';
import { IncrementerField } from '../../Incrementer';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

// ----------------------------------------------------------------------

export default function ProductDetailsSummary({ isLoading, product, indexVariant, handleChangeIndexVariant }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading: isLoadingCart, isAuthenticated } = useSelector((state) => state.cart);
  const { t, currentLang } = useLocales();

  if (!product) {
    return null;
  }

  // eslint-disable-next-line react/prop-types
  const { _id, name, price, cover, views, variants, rates } = product;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      _id,
      name,
      cover,
      available: 0,
      price,
      color: variants?.[0] || '',
      quantity: 1
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        handleAddCart();
        navigate('/cart');
      } catch (error) {
        setSubmitting(false);
      }
    }
  });

  const { values, touched, errors, getFieldProps, handleSubmit } = formik;

  const handleAddCart = () => {
    const selectVariant = product?.variants?.[indexVariant];
    const newItem = {
      productId: product._id,
      sku: selectVariant.sku,
      qty: values.quantity
    };
    let moreInfo = {};
    if (!isAuthenticated) {
      moreInfo = { name: product.name, ...selectVariant };
    }
    dispatch(addItemToCart(newItem, moreInfo));
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <RootStyle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography variant="h3" component="span">
            {variants[0].price ? fCurrency(variants[0].price, currentLang.value) : t('product.free')}
            <Box
              component="span"
              sx={{ ml: 3, color: 'text.disabled', textDecoration: 'line-through', fontSize: '75%' }}
            >
              {variants[0].marketPrice && fCurrency(variants[0].marketPrice, currentLang.value)}
            </Box>
          </Typography>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack spacing={3} sx={{ my: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Loại
              </Typography>
              <div sx={{ justifyContent: 'flex-end' }}>
                {variants &&
                  variants.length > 0 &&
                  variants.map((variant, index) => (
                    <Button
                      // clicked
                      key={variant.sku}
                      onClick={() => {
                        handleChangeIndexVariant(index);
                      }}
                      variant={index === indexVariant ? 'contained' : ''}
                      color="info"
                    >
                      {variant.variantName}
                    </Button>
                  ))}
              </div>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Số lượng
              </Typography>
              <div>
                <IncrementerField name="quantity" available={variants?.[indexVariant].quantity} />
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    display: 'block',
                    textAlign: 'right',
                    color: 'text.secondary'
                  }}
                >
                  Còn: {variants?.[indexVariant].quantity} SP
                </Typography>

                <FormHelperText error>{touched.quantity && errors.quantity}</FormHelperText>
              </div>
            </Stack>
          </Stack>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 5 }}>
            <MButton
              fullWidth
              size="large"
              type="button"
              color="warning"
              variant="contained"
              startIcon={<Icon icon={roundAddShoppingCart} />}
              onClick={handleAddCart}
              sx={{ whiteSpace: 'nowrap' }}
              disabled={isLoadingCart}
            >
              Thêm vào giỏ hàng
            </MButton>
            <Button fullWidth size="large" type="submit" variant="contained">
              Mua ngay
            </Button>
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
