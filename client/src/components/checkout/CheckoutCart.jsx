import { Icon } from '@iconify/react';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
// material
import {
  Box,
  Button,
  Card,
  CardHeader,
  Container,
  Divider,
  InputAdornment,
  Link,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
  Typography,
  Zoom
} from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// hooks
import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useLocales, useOnScreen } from '../../hooks';
// components
import { MCheckbox, MIconButton } from '../@material-extend';
import EmptyContent from '../EmptyContent';
import Scrollbar from '../Scrollbar';
import { Incrementer } from '../Incrementer';
import {
  changeSelect,
  selectAllItems,
  increaseItemQty,
  decreaseItemQty,
  removeItem
} from '../../redux/slices/cartSlice';
import { updateFeeFromCart, nextStepOrder } from '../../redux/slices/orderSlice';
import { trackingClick } from '../../redux/slices/userBehaviorSlice';
import { fCurrency, fNumber } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 64,
  height: 64,
  objectFit: 'contain',
  marginRight: theme.spacing(2),
  borderRadius: theme.shape.borderRadiusSm,
  border: `solid 2px ${theme.palette.divider}`,
  backgroundColor: 'white'
}));

const TypographyStyle = styled(Typography)({
  cursor: 'pointer',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
});

const BottomContainerStyle = styled(Container)(({ theme }) => ({
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: theme.zIndex.snackbar - 5,
  boxShadow: theme.customShadows.z24[1],
  bgcolor: theme.palette.background
}));

// ----------------------------------------------------------------------

export default function CheckoutCart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { t, currentLang } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const snackbarOpts = {
    variant: 'success',
    anchorOrigin: {
      vertical: 'top',
      horizontal: 'right'
    }
  };

  const enableDiscount = false;
  const {
    allItems: allCartItems,
    selectedItems,
    // isLoading: isLoadingCart,
    itemsCount,
    fee: { discount, subTotal, shipping, total, saveMoney }
  } = useSelector((state) => state.cart);

  const checkoutAreaRef = useRef();
  const isVisibleCheckout = useOnScreen(checkoutAreaRef);

  const handleApplyDiscount = () => {
    // dispatch(applyDiscount(value));
  };

  const handleIncreaseQuantity = (productId, sku, qty) => {
    dispatch(increaseItemQty({ productId, sku, qty })).then(() => {
      enqueueSnackbar(t('cart.notification.increase'), snackbarOpts);
    });
  };

  const handleDecreaseQuantity = (productId, sku, qty) => {
    dispatch(decreaseItemQty({ productId, sku, qty })).then(() => {
      enqueueSnackbar(t('cart.notification.decrease'), snackbarOpts);
    });
  };

  const handleDeleteCart = (productId, sku) => {
    dispatch(removeItem({ productId, sku })).then(() => {
      enqueueSnackbar(t('cart.notification.remove'), snackbarOpts);
    });
  };

  const handleNextStep = () => {
    dispatch(updateFeeFromCart());
    dispatch(nextStepOrder());
  };

  const handleSelectAll = () => {
    dispatch(selectAllItems());
  };

  const handleOnClickProduct = (e, productId, sku) => {
    dispatch(trackingClick({ productId }));
    navigate(`/c/${productId}?sku=${sku}`);
  };

  const handleSelectChange = (e, productId, sku) => {
    dispatch(changeSelect({ productId, sku, isSelect: e.target.checked }));
  };

  const isSelected = (productId, sku) =>
    selectedItems.findIndex((x) => x.productId === productId && x.sku === sku) > -1;

  const renderCheckOutArea = (isSticky = true) => {
    const content = (
      <Stack spacing={1}>
        {enableDiscount && (
          <TextField
            fullWidth
            placeholder="Discount codes / Gifts"
            value="DISCOUNT5"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Button onClick={handleApplyDiscount} sx={{ mr: -0.5 }} type="button">
                    Apply
                  </Button>
                </InputAdornment>
              )
            }}
          />
        )}

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('cart.order.saved')}
          </Typography>
          <Typography variant="subtitle2">{fCurrency(saveMoney, currentLang.value)}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('cart.order.sub-total')}
          </Typography>
          <Typography variant="subtitle2">{fCurrency(subTotal, currentLang.value)}</Typography>
        </Stack>

        {/* <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('cart.order.discount')}
          </Typography>
          <Typography variant="subtitle2">{fCurrency(discount, currentLang.value)}</Typography>
        </Stack>

        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {t('cart.order.shipping-fee')}
          </Typography>
          <Typography variant="subtitle2">{fCurrency(shipping, currentLang.value)}</Typography>
        </Stack> */}

        <Divider />

        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Button href="/" color="inherit" startIcon={<Icon icon={arrowIosBackFill} />}>
            {t('cart.empty-action')}
          </Button>
          <Box sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', justifyContent: 'flex-end' }}>
            <Typography variant="subtitle1">{`${t('cart.order.total')}: `}</Typography>
            <Typography
              variant="subtitle1"
              sx={{
                color: 'error.main',
                minWidth: 200,
                textAlign: 'right',
                position: 'relative',
                paddingRight: (theme) => theme.spacing(2)
              }}
            >
              {fCurrency(total, currentLang.value)}
              <Typography
                variant="caption"
                sx={{
                  color: 'text.secondary',
                  fontStyle: 'italic',
                  position: 'absolute',
                  bottom: 0,
                  right: (theme) => theme.spacing(2),
                  transform: 'translateY(110%)'
                }}
              >
                {`(${t('cart.order.include-vat')})`}
              </Typography>
            </Typography>
          </Box>
          <Button size="large" onClick={handleNextStep} variant="contained" disabled={!selectedItems?.length}>
            {t('cart.checkout')}
          </Button>
        </Box>
      </Stack>
    );

    if (isSticky) {
      return (
        <Card sx={{ p: 2, mx: (theme) => theme.spacing(2.5), borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }}>
          {content}
        </Card>
      );
    }
    return (
      <Card ref={checkoutAreaRef} sx={{ p: 2 }}>
        {content}
      </Card>
    );
  };

  return (
    <>
      <Container disableGutters>
        <Card sx={{ mb: 3 }}>
          <CardHeader
            title={
              <Box
                sx={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}
              >
                <Typography variant="h6">{t('cart.title-detail')}</Typography>
                <Typography component="span" sx={{ ml: 2, color: 'text.secondary' }}>
                  {`${itemsCount} ${t('cart.item')}`}
                </Typography>
              </Box>
            }
            sx={{ mb: 3 }}
          />

          {allCartItems?.length > 0 ? (
            <Scrollbar>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell padding="checkbox">
                        <MCheckbox
                          indeterminate={selectedItems.length > 0 && selectedItems.length < allCartItems?.length}
                          checked={allCartItems?.length > 0 && selectedItems.length === allCartItems?.length}
                          onChange={handleSelectAll}
                          inputProps={{ 'aria-label': 'select all desserts' }}
                          color="primary"
                          sx={{
                            color: (theme) => theme.palette.divider,
                            '&:hover': { color: (theme) => theme.palette.primary.main }
                          }}
                        />
                      </TableCell>
                      <TableCell>{t('products.title')}</TableCell>
                      <TableCell align="right">{t('cart.unit-price')}</TableCell>
                      <TableCell align="center">{t('products.quantity')}</TableCell>
                      <TableCell align="right">{t('cart.amount-price')}</TableCell>
                      <TableCell align="right" />
                    </TableRow>
                  </TableHead>

                  <TableBody>
                    {allCartItems?.map((product) => {
                      const { productId, sku, qty, name, variantName, thumbnail, price, marketPrice, quantity, sold } =
                        product;
                      const isItemSelected = isSelected(productId, sku);
                      return (
                        <TableRow
                          hover
                          key={`${productId}_${sku}`}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <MCheckbox
                              onChange={(e) => handleSelectChange(e, productId, sku)}
                              checked={isItemSelected}
                              sx={{
                                color: (theme) => theme.palette.divider,
                                '&:hover': {
                                  color: (theme) => theme.palette.primary.main
                                }
                              }}
                            />
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <ThumbImgStyle alt="product image" src={thumbnail} />
                              <Box>
                                <Tooltip TransitionComponent={Zoom} title={name} placement="top-start">
                                  <TypographyStyle
                                    component={Link}
                                    color="inherit"
                                    onClick={(e) => handleOnClickProduct(e, productId, sku)}
                                    variant="subtitle2"
                                  >
                                    {name}
                                  </TypographyStyle>
                                </Tooltip>

                                {variantName && <Typography variant="body2">{variantName}</Typography>}
                              </Box>
                            </Box>
                          </TableCell>

                          <TableCell align="right" sx={{ minWidth: 150 }}>
                            {marketPrice && (
                              <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary', textDecoration: 'line-through' }}
                              >
                                {fCurrency(marketPrice, currentLang.value)}
                              </Typography>
                            )}
                            {fCurrency(price, currentLang.value)}
                          </TableCell>

                          <TableCell align="center">
                            <Incrementer
                              quantity={qty}
                              available={quantity - sold}
                              availableText={t('cart.available', { available: quantity - sold })}
                              onDecrease={() => handleDecreaseQuantity(productId, sku, qty)}
                              onIncrease={() => handleIncreaseQuantity(productId, sku, qty)}
                            />
                          </TableCell>

                          <TableCell align="right" sx={{ minWidth: 150 }}>
                            {fCurrency(price * qty, currentLang.value)}
                          </TableCell>

                          <TableCell align="right">
                            <MIconButton onClick={() => handleDeleteCart(productId, sku)}>
                              <Icon icon={trash2Fill} width={20} height={20} />
                            </MIconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Scrollbar>
          ) : (
            <EmptyContent
              title={t('cart.empty')}
              description={t('cart.empty-desc')}
              img="/static/illustrations/illustration_empty_cart.svg"
            />
          )}
        </Card>

        {renderCheckOutArea(false)}
      </Container>
      {!isVisibleCheckout && <BottomContainerStyle disableGutters>{renderCheckOutArea()}</BottomContainerStyle>}
    </>
  );
}
