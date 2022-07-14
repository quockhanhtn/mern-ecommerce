import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  Stack,
  Typography
} from '@material-ui/core';

import PropTypes from 'prop-types';
// hooks
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useSelector } from 'react-redux';
import { useLocales } from '../../hooks';

import { fCurrency } from '../../utils/formatNumber';
import { fDate } from '../../utils/formatTime';
import { MotionInView, varFadeInUp } from '../animate';

// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
const DiscountItem = ({ item, language, onSelected }) => {
  const {
    name,
    code,
    beginDate,
    endDate,
    quantity,
    unlimitedQty,
    discount,
    discountType,
    minimumTotal,
    maximumApplied,
    available
  } = item;

  const handleOnSelect = (e) => {
    onSelected(item);
  };

  return (
    <MotionInView variants={varFadeInUp}>
      <Card sx={{ boxShadow: (theme) => theme.customShadows.z8 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
            <Box>
              <Typography>
                Mã{' '}
                <Typography color="inherit" variant="subtitle1" component="span">
                  {code}
                </Typography>
                {' - '}
                {name}
              </Typography>
              <Typography>
                Giảm{' '}
                <Typography color="error" variant="subtitle1" component="span">
                  {discountType === 'price' ? fCurrency(discount, language) : `${discount}%`}
                </Typography>{' '}
                {minimumTotal < 1000 ? ' cho tất cả đơn hàng' : ` cho đơn hàng từ ${fCurrency(minimumTotal, language)}`}
              </Typography>
              {discountType !== 'price' && (
                <Typography>
                  Giảm tối đa{' '}
                  <Typography color="error" variant="subtitle1" component="span">
                    {fCurrency(maximumApplied, language)}
                  </Typography>
                </Typography>
              )}
              <Typography>
                Có giá trị đến ngày{' '}
                <Typography color="inherit" variant="subtitle1" component="span">
                  {fDate(endDate, language)}
                </Typography>
              </Typography>
            </Box>
            <Button variant="contained" size="large" color={available ? 'primary' : 'inherit'} onClick={handleOnSelect}>
              CHỌN
            </Button>
          </Box>
        </CardContent>
      </Card>
    </MotionInView>
  );
};

DiscountItem.propTypes = {
  item: PropTypes.object.isRequired,
  language: PropTypes.string,
  onSelected: PropTypes.func
};

function CheckoutDiscountForm({ open, setOpen, subTotal, onSelectedCode }) {
  const { t, currentLang } = useLocales();
  const { listSimple: discounts } = useSelector((state) => state.discount);
  const [errorMgs, setErrorMgs] = useState('');

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectDiscountCode = (selectedDiscount) => {
    if (!selectedDiscount.available) {
      setErrorMgs(`Đơn hàng không đủ điều kiện để chọn mã ${selectedDiscount.code}`);
      return;
    }
    setErrorMgs('');
    onSelectedCode(selectedDiscount.code);
    setOpen(false);
  };

  const isEmpty = !discounts || discounts.length < 1;

  return (
    <Dialog disableEscapeKeyDown maxWidth="sm" fullWidth open={open} onClose={handleClose}>
      <DialogTitle sx={{ bgcolor: 'background.neutral' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <Typography variant="h4" marginBottom={2} sx={{ textTransform: 'uppercase' }}>
            Chọn mã giảm giá
          </Typography>
          <Button size="small" type="button" color="error" onClick={(_e) => setOpen(false)}>
            Đóng
          </Button>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ bgcolor: 'background.neutral' }}>
        <Stack spacing={3}>
          {errorMgs && <Alert severity="error">{errorMgs}</Alert>}
          {discounts
            .map((x) => ({ ...x, available: x.minimumTotal <= subTotal }))
            .map((item, index) => (
              <DiscountItem
                key={`discount-item-${index}`}
                item={item}
                onSelected={handleSelectDiscountCode}
                language={currentLang.value}
              />
            ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

CheckoutDiscountForm.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  subTotal: PropTypes.number,
  onSelectedCode: PropTypes.func
};

export default CheckoutDiscountForm;
