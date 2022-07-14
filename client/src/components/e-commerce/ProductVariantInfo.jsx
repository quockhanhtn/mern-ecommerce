// icons
import { Icon } from '@iconify/react';
import roundAddShoppingCart from '@iconify/icons-ic/round-add-shopping-cart';
//
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// material
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  FormControlLabel,
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
import { MButton } from '../@material-extend';
import { fCurrency } from '../../utils/formatNumber';
import { addItemToCart } from '../../redux/slices/cartSlice';
import { useLocales } from '../../hooks';
import { Incrementer } from '../Incrementer';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
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
      <OptionStyle
        padding={theme.spacing(0, 0, 0, 3)}
        border={isSelected ? `solid 3px ${theme.palette.primary.main}` : null}
      >
        <FormControlLabel
          onClick={handleOnClick}
          value={sku}
          control={<Radio sx={{ display: 'none' }} checked={isSelected} />}
          label={
            <Box>
              <Typography variant="subtitle2">{variantName}</Typography>
              {displayPrice && formatPrice && (
                <Box sx={{ display: 'flex', flexDirection: 'row' }}>
                  <Typography variant="body2" color="error" sx={{ mr: 2, fontWeight: 600 }}>
                    {formatPrice}
                  </Typography>
                  {formatMarketPrice && (
                    <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
                      {formatMarketPrice}
                    </Typography>
                  )}
                </Box>
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
  formatMarketPrice: PropTypes.string,
  onClick: PropTypes.func
};

// ----------------------------------------------------------------------

function ProductVariantInfo({ allVariants, productId, productName, onChangeVariant }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading: isLoadingCart, isAuthenticated } = useSelector((state) => state.cart);
  const { t, currentLang } = useLocales();

  const [selectedVariant, setSelectedVariant] = useState(null);
  const [selectedQty, setSelectedQty] = useState(1);
  const [isSoldOut, setIsSoldOut] = useState(false);

  useEffect(() => {
    if (!selectedVariant) {
      let i = 0;
      let defaultVariant = null;
      while (i < allVariants.length - 1) {
        defaultVariant = allVariants[i];
        if (defaultVariant.quantity - defaultVariant.sold <= 0) {
          i++;
        } else {
          break;
        }
      }
      // eslint-disable-next-line prettier/prettier, prefer-destructuring
      if (!defaultVariant) { defaultVariant = allVariants[0]; }
      setSelectedVariant(defaultVariant);
    }
  }, [allVariants, selectedVariant]);

  useEffect(() => {
    if (selectedVariant) {
      onChangeVariant(selectedVariant);
      setIsSoldOut(selectedVariant.quantity - selectedVariant.sold <= 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedVariant]);

  const handleChangeVariant = (event, value) => {
    if (value) {
      setSelectedVariant(allVariants.find((x) => x.sku === value.sku));
    }
  };
  const handleIncreaseQuantity = (_event) => {
    setSelectedQty((prev) => prev + 1);
  };

  const handleDecreaseQuantity = (_event) => {
    setSelectedQty((prev) => prev - 1);
  };

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

  const handleBuyNow = (event) => {
    handleAddCart();
    navigate('/cart');
  };

  const renderAutocompleteOpt = (props, option, state) => {
    const { sku, price, marketPrice } = option;
    return (
      <li {...props}>
        <VariantGrid
          key={`autocomplete_${sku}`}
          isSelected={selectedVariant.sku === sku}
          variant={option}
          displayPrice={allVariants.length > 1}
          formatPrice={fCurrency(price, currentLang.value)}
          formatMarketPrice={fCurrency(marketPrice)}
          onClick={(v) => setSelectedVariant(v)}
        />
      </li>
    );
  };

  const renderVariantsList = () => {
    if (allVariants?.length > 4) {
      return (
        <Autocomplete
          options={allVariants}
          renderInput={(params) => <TextField {...params} label="" />}
          getOptionLabel={(item) => item?.variantName}
          renderOption={renderAutocompleteOpt}
          fullWidth
          disableClearable
          value={selectedVariant}
          onChange={handleChangeVariant}
        />
      );
    }
    return (
      <RadioGroup row onChange={handleChangeVariant} value={selectedVariant.sku}>
        <Grid container spacing={0.5}>
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
      <Typography variant="h3" component="span" color="error">
        {selectedVariant.price ? fCurrency(selectedVariant.price, currentLang.value) : t('products.fee')}
        <Box component="span" sx={{ ml: 3, color: 'text.disabled', textDecoration: 'line-through', fontSize: '75%' }}>
          {selectedVariant.marketPrice && fCurrency(selectedVariant.marketPrice, currentLang.value)}
        </Box>
      </Typography>

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Box sx={{ my: 1 }}>
        <Typography variant="subtitle1" sx={{ my: 0.5 }}>
          {t('products.variant')}
        </Typography>

        {renderVariantsList()}
      </Box>

      <Stack direction="row" justifyContent="space-between">
        <Typography variant="subtitle1" sx={{ mt: 0.5 }}>
          {t('products.quantity')}
        </Typography>
        <Box justifyContent="flex-end">
          <Incrementer
            quantity={selectedQty}
            available={selectedVariant.quantity - selectedVariant.sold}
            availableText={t('cart.available', { available: selectedVariant.quantity - selectedVariant.sold })}
            onDecrease={handleDecreaseQuantity}
            onIncrease={handleIncreaseQuantity}
          />
        </Box>
      </Stack>

      <Divider sx={{ borderStyle: 'dashed' }} />

      {isSoldOut && <>Sản phẩm đã hết</>}

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
          disabled={isLoadingCart || isSoldOut}
        >
          {t('dashboard.orders.add-to-cart')}
        </MButton>
        <Button fullWidth size="large" variant="contained" disabled={isSoldOut} onClick={handleBuyNow}>
          {t('dashboard.orders.buy')}
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
