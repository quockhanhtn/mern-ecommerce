import PropTypes from 'prop-types';
// material
import {
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
import { useSelector } from 'react-redux';
import { useLocales } from '../../hooks';
// utils
import { fCurrency, fNumber } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

CheckoutSummary.propTypes = {
  showDetail: PropTypes.bool,
  sx: PropTypes.object
};

export default function CheckoutSummary({ showDetail = false, sx }) {
  const { t, currentLang } = useLocales();
  const {
    fee: { discount, subTotal, saveMoney, shipping, total }
  } = useSelector((state) => state.cart);

  const [discountCode, setDiscountCode] = useState('');

  const handleApplyDiscount = (e) => {
    // nothing
  };

  return (
    <>
      {showDetail && (
        <Card sx={{ mb: 3, ...sx }}>
          <CardHeader title="Giảm giá" />
          <CardContent>
            <Stack spacing={2}>
              <TextField
                fullWidth
                placeholder="Mã giảm giá"
                value={discountCode}
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
            </Stack>
          </CardContent>
        </Card>
      )}
      <Card sx={{ mb: 3, ...sx }}>
        <CardHeader title={t('cart.order.summary')} />

        <CardContent>
          <Stack spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('cart.order.sub-total')}
              </Typography>
              <Typography variant="subtitle2">{fCurrency(subTotal, currentLang.value)}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Tiết kiệm
              </Typography>
              <Typography variant="subtitle2">{fCurrency(saveMoney, currentLang.value)}</Typography>
            </Stack>

            {showDetail && (
              <Stack direction="row" justifyContent="space-between">
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {t('cart.order.discount')}
                </Typography>
                <Typography variant="subtitle2">{fCurrency(discount, currentLang.value)}</Typography>
              </Stack>
            )}

            <Stack direction="row" justifyContent="space-between">
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                {t('cart.order.shipping-fee')}
              </Typography>
              <Typography variant="subtitle2">{fCurrency(shipping, currentLang.value)}</Typography>
            </Stack>

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
