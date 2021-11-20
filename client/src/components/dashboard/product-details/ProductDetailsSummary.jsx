import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useNavigate } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
import { useFormik, Form, FormikProvider, useField } from 'formik';
// material
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Link,
  Stack,
  Button,
  Rating,
  Tooltip,
  Divider,
  TextField,
  Typography,
  FormHelperText
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { MButton, MIconButton } from '../../@material-extend';
import Label from '../../Label';
import { fCurrency, fShortenNumber } from '../../../utils/formatNumber';
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
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { item: product } = useSelector((state) => state.product);
  const { _id, name, price, cover, status, variants, available, priceSale, totalRating, totalReview, inventoryType } =
    product;

  // const alreadyProduct = checkout.cart.map((item) => item._id).includes(_id);
  // const isMaxQuantity = checkout.cart.filter((item) => item._id === _id).map((item) => item.quantity)[0] >= available;

  const onAddCart = (product) => {
    // dispatch(addCart(product));
  };

  const handleBuyNow = () => {
    // dispatch(onGotoStep(0));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      _id,
      name,
      cover,
      available,
      price,
      color: variants[0],
      quantity: available < 1 ? 0 : 1
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
    onAddCart({
      ...values,
      subtotal: values.price * values.quantity
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
            <Rating value={totalRating} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ({fShortenNumber(totalReview)}
              reviews)
            </Typography>
          </Stack>

          <Typography variant="h4" sx={{ mb: 3 }}>
            <Box component="span" sx={{ color: 'text.disabled', textDecoration: 'line-through' }}>
              {variants[indexVariant] && fCurrency(variants[indexVariant].price)}
            </Box>
            &nbsp;{fCurrency(variants[indexVariant].marketPrice)}
          </Typography>

          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack spacing={3} sx={{ my: 3 }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Variants
              </Typography>
              <div sx={{ justifyContent: 'flex-end' }}>
                {variants.map((variant, index) => {
                  const { _id, slug, name, country, image, createdAt, updatedAt, isHide } = variant;
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
                <Incrementer name="quantity" available={available} />
                <Typography
                  variant="caption"
                  sx={{
                    mt: 1,
                    display: 'block',
                    textAlign: 'right',
                    color: 'text.secondary'
                  }}
                >
                  Available: {available}
                </Typography>

                <FormHelperText error>{touched.quantity && errors.quantity}</FormHelperText>
              </div>
            </Stack>
          </Stack>
          <Divider sx={{ borderStyle: 'dashed' }} />

          <Stack spacing={2} direction={{ xs: 'column', sm: 'row' }} sx={{ mt: 5 }}>
            <MButton
              fullWidth
              // disabled={isMaxQuantity}
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
