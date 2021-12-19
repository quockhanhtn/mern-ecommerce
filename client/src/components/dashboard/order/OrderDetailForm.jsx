import { useEffect, useState } from 'react';
// material
import {
  Autocomplete,
  Link,
  Card,
  Box,
  Button,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Stack,
  TextField,
  Divider
} from '@material-ui/core';
import PropTypes from 'prop-types';
// hooks
import useLocales from '../../../hooks/useLocales';
// components
import { MotionInView, varFadeInUp } from '../../animate';
import OrderCard from './OrderCard';

// ----------------------------------------------------------------------

OrderDetailForm.propTypes = {
  order: PropTypes.any.isRequired,
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleUpdate: PropTypes.func
};

// ----------------------------------------------------------------------

export default function OrderDetailForm({ order, open, setOpen, handleUpdate }) {
  const { t } = useLocales();

  const [orderStatus, setOrderStatus] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [hasChange, setHasChange] = useState(false);

  const orderStatusList = [
    {
      label: t('order.status-pending'),
      value: 'pending'
    },
    {
      label: t('order.status-confirmed'),
      value: 'confirmed'
    },
    {
      label: t('order.status-shipping'),
      value: 'shipping'
    },
    {
      label: t('order.status-completed'),
      value: 'completed'
    },
    {
      label: t('order.status-cancelled'),
      value: 'cancelled'
    }
  ];

  const paymentStatusList = [
    {
      label: t('order.payment-status-pending'),
      value: 'pending'
    },
    {
      label: t('order.payment-status-paid'),
      value: 'paid'
    }
  ];

  const paymentMethodList = [
    {
      label: t('order.payment-method-cash'),
      value: 'cash'
    },
    {
      label: t('order.payment-method-cod'),
      value: 'cod'
    },
    {
      label: t('order.payment-method-vnpay'),
      value: 'vnpay'
    }
  ];

  useEffect(() => {
    setOrderStatus(order?.status);
    setPaymentStatus(order?.paymentStatus);
    setPaymentMethod(order?.paymentMethod);
    setHasChange(false);
  }, [order]);

  const handleChangeOrderStatus = (event, value) => {
    setOrderStatus(value.value);
    if (value.value !== order.status) {
      setHasChange(true);
    }
  };

  const handleChangePaymentStatus = (event, value) => {
    setPaymentStatus(value.value);
    if (value.value !== order.paymentStatus) {
      setHasChange(true);
    }
  };

  const handleChangePaymentMethod = (event, value) => {
    setPaymentMethod(value.value);
    if (value.value !== order.paymentMethod) {
      setHasChange(true);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    handleUpdate(order._id, { status: orderStatus, paymentStatus, paymentMethod });
    setOpen(false);
  };

  return (
    <Dialog disableEscapeKeyDown fullWidth maxWidth="lg" onBackdropClick="false" open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h4" marginBottom={2} sx={{ textTransform: 'uppercase' }}>
          Đơn hàng #{order?.numericId}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <MotionInView variants={varFadeInUp}>
          <OrderCard order={order} isShowTitle={false} />
        </MotionInView>
      </DialogContent>
      <DialogActions>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Autocomplete
                fullWidth
                disableClearable
                options={orderStatusList}
                getOptionLabel={(item) => item?.label}
                value={orderStatusList.find((item) => item.value === orderStatus)}
                renderInput={(params) => <TextField {...params} label={t('order.order-status')} />}
                onChange={handleChangeOrderStatus}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Autocomplete
                fullWidth
                disableClearable
                options={paymentStatusList}
                getOptionLabel={(item) => item?.label}
                value={paymentStatusList.find((item) => item.value === paymentStatus)}
                renderInput={(params) => <TextField {...params} label={t('order.payment-status')} />}
                onChange={handleChangePaymentStatus}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Autocomplete
                fullWidth
                disableClearable
                options={paymentMethodList}
                getOptionLabel={(item) => item?.label}
                value={paymentMethodList.find((item) => item.value === paymentMethod)}
                renderInput={(params) => <TextField {...params} label={t('order.payment-method')} />}
                onChange={handleChangePaymentMethod}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Box display="flex" alignItems="center" sx={{ height: '100%' }}>
                <Button sx={{ mr: 1 }} fullWidth size="large" color="inherit" variant="outlined" onClick={handleClose}>
                  {t('common.cancel')}
                </Button>
                <Button fullWidth size="large" variant="outlined" disabled={!hasChange} onClick={handleSave}>
                  {t('common.save')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogActions>
    </Dialog>
  );
}