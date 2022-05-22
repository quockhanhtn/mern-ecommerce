import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// icons
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import editFill from '@iconify/icons-eva/edit-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import roundFilterList from '@iconify/icons-ic/round-filter-list';
// material
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Autocomplete,
  Box,
  Grid,
  Toolbar,
  Tooltip,
  Typography,
  TextField,
  IconButton,
  OutlinedInput,
  InputAdornment
} from '@material-ui/core';

import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
  [theme.breakpoints.down('sm')]: {
    height: 96 * 2
  }
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&::placeholder': {
    fontStyle: 'italic'
  },
  '&.Mui-focused': { width: '100%', boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

OrderListToolbar.propTypes = {
  search: PropTypes.string,
  onSearchChange: PropTypes.func,
  onKeyDown: PropTypes.func,
  orderStatus: PropTypes.string,
  onChangeOrderStatus: PropTypes.func,
  paymentStatus: PropTypes.string,
  onChangePaymentStatus: PropTypes.func
};

export default function OrderListToolbar({
  search,
  onSearchChange,
  onKeyDown,
  orderStatus,
  onChangeOrderStatus,
  paymentStatus,
  onChangePaymentStatus
}) {
  const { t } = useLocales();

  const orderStatusList = [
    {
      label: t('order.status-all'),
      value: ''
    },
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
      label: t('order.payment-status-all'),
      value: ''
    },
    {
      label: t('order.payment-status-pending'),
      value: 'pending'
    },
    {
      label: t('order.payment-status-paid'),
      value: 'paid'
    }
  ];

  return (
    <>
      <ToolbarStyle>
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <SearchStyle
                size="small"
                value={search}
                onChange={onSearchChange}
                onKeyDown={onKeyDown}
                title={t('order.search-placeholder-desc')}
                placeholder={t('order.search-placeholder')}
                startAdornment={
                  <InputAdornment position="start">
                    <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Autocomplete
                size="small"
                fullWidth
                disableClearable
                options={orderStatusList}
                getOptionLabel={(item) => item?.label}
                value={orderStatusList.find((item) => item.value === orderStatus)}
                // filterSelectedOptions
                renderInput={(params) => <TextField {...params} label={t('order.order-status')} />}
                onChange={onChangeOrderStatus}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Autocomplete
                size="small"
                fullWidth
                disableClearable
                options={paymentStatusList}
                getOptionLabel={(item) => item?.label}
                value={paymentStatusList.find((item) => item.value === paymentStatus)}
                // filterSelectedOptions
                renderInput={(params) => <TextField {...params} label={t('order.payment-status')} />}
                onChange={onChangePaymentStatus}
              />
            </Grid>
          </Grid>
        </Box>
      </ToolbarStyle>
    </>
  );
}
