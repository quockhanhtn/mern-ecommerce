// icons
import { Icon } from '@iconify/react';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
import plusFill from '@iconify/icons-eva/plus-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
//
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
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

function VariantGrid(props) {
  const theme = useTheme();
  const { key, variant, isSelected, displayPrice = false, formatPrice, formatMarketPrice, onClick } = props;
  const { variantName, thumbnail, sku } = variant;

  const handleOnClick = () => {
    onClick(variant);
  };

  return (
    <Grid key={key} item xs={12}>
      <OptionStyle border={isSelected ? `solid 3px ${theme.palette.primary.main}` : null}>
        <FormControlLabel
          onClick={handleOnClick}
          value={sku}
          control={<Radio sx={{ display: 'none' }} checked={isSelected} />}
          label={
            <Box>
              <Typography variant="subtitle2">{variantName}</Typography>
              {displayPrice && (
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {formatPrice}
                </Typography>
              )}
            </Box>
          }
          sx={{ flexGrow: 1, py: 0 }}
        />
        <ThumbImgStyle src={thumbnail} width={48} height={48} noBorder />
      </OptionStyle>
    </Grid>
  );
}

VariantGrid.propTypes = {
  key: PropTypes.string.isRequired,
  variant: PropTypes.any,
  isSelected: PropTypes.bool,
  displayPrice: PropTypes.bool,
  formatPrice: PropTypes.string,
  formatMarketPrice: PropTypes.string
};

// ----------------------------------------------------------------------

function ProductVariantInfo({ allVariants, productId, productName, onChangeVariant }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading: isLoadingCart, isAuthenticated } = useSelector((state) => state.cart);
  const { t, currentLang } = useLocales();

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);

  useEffect(() => {
    if (!selectedVariant) {
      setSelectedVariant(allVariants[0]);
    }
  }, [allVariants, selectedVariant]);

  useEffect(() => {
    if (selectedVariant) {
      onChangeVariant(selectedVariant);
    }
  }, [selectedVariant, onChangeVariant]);

  const handleAddCart = () => {
    const selectVariant = selectedVariant;
    const newItem = {
      productId,
      sku: selectVariant.sku,
      qty: selectedQty
    };
    let moreInfo = {};
    if (!isAuthenticated) {
      moreInfo = { name: productName, ...selectVariant };
    }
    dispatch(addItemToCart(newItem, moreInfo));
  };

  const handleChangeVariant = (event, value) => {
    if (value) {
      setSelectedVariant(allVariants.find((x) => x.sku === value)[0]);
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
    const length = allVariants?.length;
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
      <RadioGroup row onChange={handleChangeVariant} value={selectedVariant.sku}>
        <Grid container spacing={2}>
          {allVariants.map((item, index) => {
            const { sku, price, marketPrice } = item;

            return (
              <VariantGrid
                key={`${index}_${sku}`}
                isSelected={selectedVariant.sku === sku}
                variant={item}
                displayPrice={allVariants.length > 1}
                formatPrice={fCurrency(price, currentLang.value)}
                formatMarketPrice={fCurrency(marketPrice)}
                onClick={(v) => setSelectedVariant(v)}
              />
            );
          })}
        </Grid>
      </RadioGroup>
    );
  };

  if (!allVariants || !selectedVariant) {
    return null;
  }

  return (
    <RootStyle>
      <Typography variant="h3" component="span">
        {selectedVariant.price ? fCurrency(selectedVariant.price, currentLang.value) : t('product.free')}
        <Box component="span" sx={{ ml: 3, color: 'text.disabled', textDecoration: 'line-through', fontSize: '75%' }}>
          {selectedVariant.marketPrice && fCurrency(selectedVariant.marketPrice, currentLang.value)}
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
            {/* <IncrementerField name="quantity" available={selectedVariant.quantity} /> */}
            <Typography
              variant="caption"
              sx={{
                mt: 1,
                display: 'block',
                textAlign: 'right',
                color: 'text.secondary'
              }}
            >
              Còn: {selectedVariant.quantity} SP
            </Typography>
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
    </RootStyle>
  );
}

ProductVariantInfo.propTypes = {
  allVariants: PropTypes.array,
  productId: PropTypes.string,
  productName: PropTypes.string,
  onChangeVariant: PropTypes.func
};

export default ProductVariantInfo;
