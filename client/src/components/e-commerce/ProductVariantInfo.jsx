// icons
import { Icon } from '@iconify/react';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
import plusFill from '@iconify/icons-eva/plus-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
//
import { PropTypes } from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormHelperText,
  Grid,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@material-ui/core';
// components
import { useState, useEffect } from 'react';
//
import { OptionStyle, ThumbImgStyle } from '../@styled';
import { MButton, MHidden } from '../@material-extend';
import { fCurrency } from '../../utils/formatNumber';
import { addItemToCart } from '../../redux/slices/cartSlice';
import { useLocales } from '../../hooks';
import { IncrementerField } from '../Incrementer';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up(1368)]: {
    padding: theme.spacing(5, 8)
  }
}));

const VariantGrid = ({ key, variant, isSelected, formatPrice, formatMarketPrice }) => {
  const { variantName, thumbnail, sku } = variant;
  let optStyle = {};
  if (isSelected) {
    optStyle = {
      border: (theme) => `solid 3px ${theme.palette.primary.main}`
    };
  }
  return (
    <Grid key={key} item xs={12}>
      <OptionStyle style={optStyle}>
        <FormControlLabel
          value={sku}
          control={<Radio checked={isSelected} checkedIcon={<Icon icon={checkmarkCircle2Fill} />} />}
          label={
            <Box sx={{ ml: 1 }}>
              <Typography variant="subtitle2">{variantName}</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {formatPrice}
              </Typography>
            </Box>
          }
          sx={{ flexGrow: 1, py: 0 }}
        />
        <ThumbImgStyle src={thumbnail} width={48} height={48} isSelected={isSelected} />
      </OptionStyle>
    </Grid>
  );
};

// ----------------------------------------------------------------------

function ProductVariantInfo({ isLoading, product, indexVariant, handleChangeIndexVariant }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading: isLoadingCart, isAuthenticated } = useSelector((state) => state.cart);
  const { t, currentLang } = useLocales();

  const [selectedSku, setSelectedSku] = useState('');

  useEffect(() => {
    if (product?.variants) {
      setSelectedSku(product.variants?.[indexVariant]);
    }
  }, [indexVariant, product.variants]);

  useEffect(() => {
    if (product?.variants) {
      handleChangeIndexVariant(product.variants.findIndex((x) => x.sku === selectedSku) ?? 0);
    }
  }, [selectedSku]);

  if (!product || isLoading) {
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

  const handleChangeVariant = (event, value) => {
    if (value) {
      setSelectedSku(value);
    }
  };

  const renderAutocompleteOpt = (props, option, state) => {
    const { sku, price, marketPrice } = option;
    return (
      <li {...props}>
        <VariantGrid
          key={`autocomplete_${sku}`}
          variant={option}
          formatPrice={fCurrency(price, currentLang.value)}
          formatMarketPrice={fCurrency(marketPrice)}
          isSelected={state.selected}
        />
      </li>
    );
  };

  const renderVariantsList = () => {
    const length = product?.variants?.length;
    // if (product?.variants?.length > 4) {
    //   return (
    //     <Autocomplete
    //       options={product?.variants}
    //       renderInput={(params) => <TextField {...params} label="Danh mục" />}
    //       renderOption={renderAutocompleteOpt}
    //       fullWidth
    //       disableClearable
    //       value={selectedVariant}
    //       onChange={handleChangeVariant}
    //     />
    //   );
    // }
    return (
      <RadioGroup row onChange={handleChangeVariant} value={selectedSku}>
        <Grid container spacing={2}>
          {product?.variants.map((item, index) => {
            const { sku, price, marketPrice } = item;

            return (
              <VariantGrid
                key={`${index}_${sku}`}
                variant={item}
                formatPrice={fCurrency(price, currentLang.value)}
                formatMarketPrice={fCurrency(marketPrice)}
              />
            );
          })}
        </Grid>
      </RadioGroup>
    );
  };

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
            {renderVariantsList()}

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
                Số lượng
              </Typography>
              <div>
                <IncrementerField name="quantity" available={variants?.[indexVariant]?.quantity} />
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

ProductVariantInfo.propTypes = {
  product: PropTypes.any
};

export default ProductVariantInfo;
