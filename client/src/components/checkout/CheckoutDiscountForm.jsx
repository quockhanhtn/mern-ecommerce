import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';

import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';
// material
import {
  Button,
  Box,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { merge } from 'lodash';

import { fCurrency } from '../../utils/formatNumber';
import { useLocales } from '../../hooks';
import { MotionInView, varFadeInUp } from '../animate';
import { MIconButton, MRadio } from '../@material-extend';

// ----------------------------------------------------------------------

const DiscountItem = ({ item, subTotal }) => {
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
    maximumApplied
  } = item;

  const available = minimumTotal <= subTotal;

  const describe = `Giảm${discountType === 'percent' ? `${discount} %` : fCurrency(discount)}`;
  let condition = '';
  if (minimumTotal < 1000) {
    condition = 'Không có';
  } else {
    condition = `Đơn hàng tối thiểu ${fCurrency(discount)}`;
  }
  return (
    <MotionInView variants={varFadeInUp}>
      <Card sx={{ boxShadow: (theme) => theme.customShadows.z8 }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
            <Box>
              <Typography>{name}</Typography>
              <Typography>{describe}</Typography>
              <Typography>{condition}</Typography>
              <Typography>{available ? 'aa' : 'no'}</Typography>
            </Box>
            <Button>Chọn</Button>
          </Box>
        </CardContent>
      </Card>
    </MotionInView>
  );
};

function CheckoutDiscountForm({ open, setOpen, discounts, subTotal }) {
  const { t } = useLocales();
  const dispatch = useDispatch();

  const handleClose = () => {
    setOpen(false);
  };

  const isEmpty = !discounts || discounts.length < 1;

  return (
    <Dialog disableEscapeKeyDown onBackdropClick="false" maxWidth="sm" fullWidth open={open} onClose={handleClose}>
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
          {discounts.map((item, index) => (
            <DiscountItem key={`discount-item-${index}`} item={item} subTotal={subTotal} />
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

CheckoutDiscountForm.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  discounts: PropTypes.array,
  subTotal: PropTypes.number
};

export default CheckoutDiscountForm;
