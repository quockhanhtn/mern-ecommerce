import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
// material
import { Card, Button, Typography, CardHeader, CardContent } from '@material-ui/core';
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

CheckoutBillingInfo.propTypes = {
  orderInfo: PropTypes.object,
  onBackStep: PropTypes.func,
  sx: PropTypes.object
};

export default function CheckoutBillingInfo({ orderInfo, onBackStep, sx }) {
  const { t } = useLocales();
  const { name, phone, street, province, district, ward } = orderInfo;

  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardHeader
        title={orderInfo?.isReceiveAtStore ? 'Nhận tại cửa hàng' : t('address.title')}
        action={
          <Button size="small" type="button" startIcon={<Icon icon={editFill} />} onClick={onBackStep}>
            {t('common.edit')}
          </Button>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {name}&nbsp;
          {/* <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}> */}
          {/*  */}
          {/* </Typography> */}
        </Typography>
        {!orderInfo?.isReceiveAtStore && (
          <Typography variant="body2" gutterBottom>
            {`${street}, ${ward}, ${district}, ${province}.`}
          </Typography>
        )}
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {phone}
        </Typography>
      </CardContent>
    </Card>
  );
}
