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
import { useSelector } from 'react-redux';
import { useLocales } from '../../hooks';

import CustomLoadingOverlay from '../loading-overlay';
import CheckoutDiscountForm from './CheckoutDiscountForm';

import { getAllDiscount, validateDiscount } from '../../api';
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
  const [discountList, setDiscountList] = useState([]);
  const [discountCode, setDiscountCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMgs, setErrorMgs] = useState('');

  async function fetchDiscounts() {
    setIsLoading(true);
    try {
      const { data } = await getAllDiscount({
        field: 'name,code,beginDate,endDate,quantity,unlimitedQty,discount,discountType,minimumTotal,maximumApplied'
      });
      setDiscountList(data.data);
    } catch {
      // do something
    }
    setIsLoading(false);
  }

  const handShowListDiscount = async (e) => {
    if (!discountList || discountList.length < 1) {
      await fetchDiscounts();
    }
    setIsOpen(true);
  };
  const handleApplyDiscount = async (e) => {
    setIsLoading(true);
    try {
      const { data } = await validateDiscount({ code: discountCode, orderSubtotal: subTotal });
    } catch (e) {
      const mgs = '';
      setErrorMgs(mgs);
    }

    setIsLoading(false);
  };

  return (
    <>
      {showDetail && (
        <CheckoutDiscountForm open={isOpen} setOpen={setIsOpen} discounts={discountList} subTotal={subTotal} />
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
