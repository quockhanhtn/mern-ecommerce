import PropTypes from 'prop-types';
// material
import {
  Alert,
  Box,
  Card,
  Stack,
  Button,
  Divider,
  TextField,
  CardHeader,
  Typography,
  CardContent,
  InputAdornment
} from '@material-ui/core';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSnackbar } from 'notistack';
import { useLocales } from '../../hooks';

import CustomLoadingOverlay from '../loading-overlay';
import CheckoutDiscountForm from './CheckoutDiscountForm';

import { setAppliedDiscount } from '../../redux/slices/orderSlice';

import { estDiscountAmount } from '../../api';
// utils
import { fCurrency, fNumber } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

CheckoutSummary.propTypes = {
  showDetail: PropTypes.bool,
  sx: PropTypes.object
};

export default function CheckoutSummary({ showDetail = false, sx }) {
  const { t, currentLang } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const {
    fee: { discount, subTotal, saveMoney, shipping, total }
  } = useSelector((state) => state.order);
  const [discountCode, setDiscountCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMgs, setErrorMgs] = useState('');

  async function appliedDiscount(code) {
    if (code?.length < 1) {
      setErrorMgs('Bạn chưa nhập mã giảm giá');
      return;
    }

    setIsLoading(true);
    try {
      const { data } = await estDiscountAmount({ code, orderSubtotal: subTotal });
      dispatch(setAppliedDiscount(data.data));
      setErrorMgs('');
      enqueueSnackbar('Áp dụng mã giãm giá thành công !', { variant: 'success' });
    } catch (e) {
      let mgs = 'Không thể áp dụng mã giảm giá';
      const err = e?.response?.data?.message;
      if (err[currentLang.value]) {
        mgs = err[currentLang.value];
      }
      setErrorMgs(mgs);
    }
    setIsLoading(false);
  }

  const handShowListDiscount = async (_event) => {
    setIsOpen(true);
  };
  const handleApplyDiscount = (_event) => {
    appliedDiscount(discountCode);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleApplyDiscount(null);
    }
  };

  const handleSelectCodeFromForm = (selectCode) => {
    setDiscountCode(() => selectCode);
    appliedDiscount(selectCode);
  };

  return (
    <>
      {showDetail && (
        <CheckoutDiscountForm
          open={isOpen}
          setOpen={setIsOpen}
          subTotal={subTotal}
          onSelectedCode={handleSelectCodeFromForm}
        />
      )}
      {showDetail && isLoading && <CustomLoadingOverlay active={isLoading} />}
      {showDetail && (
        <Card sx={{ mb: 3, ...sx }}>
          <CardHeader title="Giảm giá" />
          <CardContent>
            <Stack spacing={2}>
              {errorMgs && <Alert severity="error">{errorMgs}</Alert>}
              <TextField
                fullWidth
                placeholder="Mã giảm giá"
                value={discountCode}
                onKeyDown={handleKeyDown}
                onChange={(e) => setDiscountCode(e.target.value.trim().toUpperCase())}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Button type="button" onClick={handleApplyDiscount} sx={{ mr: -0.5 }}>
                        Áp dụng
                      </Button>
                    </InputAdornment>
                  )
                }}
              />
              <Button size="small" type="button" onClick={handShowListDiscount}>
                Chọn mã giảm giá
              </Button>
            </Stack>
          </CardContent>
        </Card>
      )}
      <Card sx={{ mb: 3, ...sx }}>
        <CardHeader title={t('cart.order.summary')} />

        <CardContent>
          <Stack spacing={2}>
            {!showDetail && [
              <Stack key="original-fee" direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {t('cart.order.original-fee')}
                </Typography>
                <Typography variant="subtitle2">{fCurrency(subTotal + saveMoney, currentLang.value)}</Typography>
              </Stack>,

              <Stack key="saved" direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {t('cart.order.saved')}
                </Typography>
                <Typography variant="subtitle2">{fCurrency(saveMoney, currentLang.value)}</Typography>
              </Stack>
            ]}

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('cart.order.sub-total')}
              </Typography>
              <Typography variant="subtitle2">{fCurrency(subTotal, currentLang.value)}</Typography>
            </Stack>

            {showDetail && (
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {t('cart.order.discount')}
                </Typography>
                <Typography variant="subtitle2">{fCurrency(discount, currentLang.value)}</Typography>
              </Stack>
            )}

            {showDetail && (
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {t('cart.order.shipping-fee')}
                </Typography>
                <Typography variant="subtitle2">{fCurrency(shipping, currentLang.value)}</Typography>
              </Stack>
            )}

            <Divider />

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="subtitle1">{t('cart.order.total')}</Typography>
              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="subtitle1" sx={{ color: 'error.main' }}>
                  {fCurrency(total, currentLang.value)}
                </Typography>
                <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                  {`(${t('cart.order.include-vat')})`}
                </Typography>
              </Box>
            </Stack>
            {!showDetail && (
              <Typography variant="caption" sx={{ fontStyle: 'italic' }}>
                (*) Bạn có thể chọn mã giảm giá ở bước tiếp theo
              </Typography>
            )}
          </Stack>
        </CardContent>
      </Card>
    </>
  );
}
