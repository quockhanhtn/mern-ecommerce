import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
// material
import { IconButton, TableCell, TableRow, Typography } from '@mui/material';
//
import { useLocales } from '~/hooks';
// utils
import { fDateTime } from '~/utils/formatTime';
import { fCurrency } from '~/utils/formatNumber';
import { getOrderStatusColor, getPaymentStatusColor } from '~/utils/labelColor';
// components
import Label from '~/components/Label';

// ----------------------------------------------------------------------

OrderTableRow.propTypes = {
  row: PropTypes.any,
  onClick: PropTypes.func
};

export default function OrderTableRow({ row, onClick }) {
  const { t, currentLang } = useLocales();

  const handleViewDetail = () => {
    onClick(row);
  };

  return (
    <TableRow hover>
      <TableCell align="left" scope="row" padding="none">
        {row?.numericId}
      </TableCell>
      <TableCell scope="row" padding="none">
        <Typography variant="subtitle2" noWrap>
          {row?.customer?.name}
        </Typography>
      </TableCell>
      <TableCell align="left" padding="none">
        {row?.customer?.phone}
      </TableCell>
      <TableCell align="left" padding="none">
        <Label color={getOrderStatusColor(row?.status)} sx={{ textTransform: 'uppercase' }}>
          {t(`order.status-${row?.status}`)}
        </Label>
      </TableCell>
      <TableCell align="left" padding="none">
        <Label color={getPaymentStatusColor(row?.paymentStatus)} sx={{ textTransform: 'uppercase' }}>
          {t(`order.payment-status-${row?.paymentStatus}`)}
        </Label>
      </TableCell>
      <TableCell align="left" padding="none">
        {t(`order.payment-method-${row?.paymentMethod}`)}
      </TableCell>
      <TableCell align="right">{fCurrency(row?.total, currentLang.value)}</TableCell>
      <TableCell align="right">{fDateTime(row?.createdAt, currentLang.value)}</TableCell>
      <TableCell align="right">
        <IconButton onClick={handleViewDetail} size="large">
          <Icon icon={eyeFill} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
