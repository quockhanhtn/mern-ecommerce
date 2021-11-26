import { Icon } from '@iconify/react';
import { useNavigate } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
import { useFormik, Form, FormikProvider, useField } from 'formik';
// material
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Stack, Button, Rating, Divider, Typography, FormHelperText } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { MButton, MIconButton } from '../../@material-extend';
import { fNumber, fShortenNumber } from '../../../utils/formatNumber';
import useToCart from '../../../hooks/useToCart';
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
  // eslint-disable-next-line react/prop-types
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
        <Icon icon={minusFill} width={16} height={16} />
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
        <Icon icon={plusFill} width={16} height={16} />
      </MIconButton>
    </Box>
  );
};

export default function ProductDetailsSummary({ indexVariant, handleChangeIndexVariant }) {
  const theme = useTheme();
  const { addToCart } = useToCart();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { item: product } = useSelector((state) => state.product);
  const { _id, name, price, cover, views, variants, rates } = product;

  const handleBuyNow = () => {
    // dispatch(onGotoStep(0));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      _id,
      name,
      cover,
      available: variants[indexVariant].quantity,
      price,
      color: variants[0],
      quantity: variants[indexVariant].quantity < 1 ? 0 : 1
    },
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // if (!alreadyProduct) {
        //   onAddCart({
        //     ...values,
        //     subtotal: values.price * values.quantity
        //   });
        // }
        setSubmitting(false);
        handleBuyNow();
        navigate(PATH_DASHBOARD);
      } catch (error) {
        setSubmitting(false);
      }
    }
  });

  const { values, touched, errors, getFieldProps, handleSubmit } = formik;

  const handleAddCart = () => {
    const productInCart = {
      _id: product._id,
      skuVariant: product.variants[indexVariant].sku,
      quantity: values.quantity
    };
    addToCart(productInCart).then(() => {
      enqueueSnackbar('Add to cart successfully', {
        variant: 'success'
      });
    });
  };

  return (
    <RootStyle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Typography variant="h5" paragraph>
            {name}
          </Typography>

          <Stack spacing={0.5} direction="row" alignItems="center" sx={{ mb: 2 }}>
            <Rating value={rates?.length} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ({fShortenNumber(views)}
              &nbsp;reviews)
            </Typography>
          </Stack>

          <Typography variant="h4" sx={{ mb: 3 }}>
            <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
              {variants[indexVariant] && `${fNumber(variants[0].price)} ₫`}
            </Box>
            &nbsp;{`${fNumber(variants[0].marketPrice)} ₫`}
          </Typography>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack spacing={3} sx={{ my: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Variants
              </Typography>
              <div sx={{ justifyContent: 'flex-end' }}>
                {variants.map((variant, index) => {
                  const { _id } = variant;
                  return (
                    <Button
                      clicked
                      onClick={() => {
                        handleChangeIndexVariant(index);
                      }}
                      variant={index === indexVariant ? 'contained' : ''}
                      color="info"
                    >
                      {variant.sku}
                    </Button>
                  );
                })}
              </div>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Quantity
              </Typography>
              <div>
                <Incrementer name="quantity" available={variants[indexVariant].quantity} />
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    display: 'block',
                    textAlign: 'right',
                    color: 'text.secondary'
                  }}
                >
                  Available: {variants[indexVariant].quantity}
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
            >
              Add to Cart
            </MButton>
            <Button fullWidth size="large" type="submit" variant="contained">
              Buy Now
            </Button>
          </Stack>
        </Form>
      </FormikProvider>
    </RootStyle>
  );
}
