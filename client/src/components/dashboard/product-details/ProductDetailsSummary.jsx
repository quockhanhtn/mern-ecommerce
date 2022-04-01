import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import add12Filled from '@iconify/icons-fluent/add-12-filled';
import subtract12Filled from '@iconify/icons-fluent/subtract-12-filled';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
import { useFormik, Form, FormikProvider, useField } from 'formik';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Stack, Button, Rating, Divider, Typography, FormHelperText } from '@material-ui/core';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { MButton, MIconButton } from '../../@material-extend';
import { fNumber, fCurrency } from '../../../utils/formatNumber';
import useOrderFlow from '../../../hooks/useOrderFlow';
import { addProductToCartDB } from '../../../redux/slices/writeOrderSlice';
import { useAuth, useLocales } from '../../../hooks';
// --------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

// ----------------------------------------------------------------------

const Incrementer = (props) => {
  const [field, , helpers] = useField(props);
  const { available } = props;
  const { value } = field;
  const { setValue } = helpers;

  const incrementQuantity = () => {
    setValue(value + 1);
  };
  const decrementQuantity = () => {
    setValue(value - 1);
  };

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032'
      }}
    >
      <MIconButton size="small" color="inherit" disabled={value <= 1} onClick={decrementQuantity}>
        <Icon icon={subtract12Filled} width={16} height={16} />
      </MIconButton>
      <Typography
        variant="body2"
        component="span"
        sx={{
          width: 40,
          textAlign: 'center',
          display: 'inline-block'
        }}
      >
        {value}
      </Typography>
      <MIconButton size="small" color="inherit" disabled={value >= available} onClick={incrementQuantity}>
        <Icon icon={add12Filled} width={16} height={16} />
      </MIconButton>
    </Box>
  );
};

export default function ProductDetailsSummary({ isLoading, product, indexVariant, handleChangeIndexVariant }) {
  const { addToCart } = useOrderFlow();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [isAddToCart, setIsAddToCart] = useState(false);
  const { isAuthenticated } = useAuth();
  const { t, currentLang } = useLocales();

  if (!product) {
    return null;
  }

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
    const productInCart = {
      _id: product._id,
      name: product.name,
      variantName: product.variants[indexVariant].variantName,
      skuVariant: product.variants[indexVariant].sku,
      quantity: values.quantity,
      price: product.variants[indexVariant].price,
      quantityAvailable: product.variants[indexVariant].quantity,
      thumbnail: product.variants[indexVariant].thumbnail
    };
    addToCart(productInCart).then(() => {
      enqueueSnackbar('Thêm sản phẩm vào giỏ hàng thành công', {
        variant: 'success'
      });
    });
    // Add to DB
    if (isAuthenticated) {
      setIsAddToCart(true);
      dispatch(addProductToCartDB(productInCart)).then(() => {
        setIsAddToCart(false);
      });
    }
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
                      clicked
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
                <Incrementer name="quantity" available={variants?.[indexVariant].quantity} />
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
              disabled={isAddToCart}
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
