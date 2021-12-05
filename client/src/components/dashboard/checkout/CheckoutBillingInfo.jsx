import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import editFill from '@iconify/icons-eva/edit-fill';
// material
import { Card, Button, Typography, CardHeader, CardContent } from '@material-ui/core';

// ----------------------------------------------------------------------

CheckoutBillingInfo.propTypes = {
  billing: PropTypes.object,
  onBackStep: PropTypes.func,
  sx: PropTypes.object
};

export default function CheckoutBillingInfo({ billingInfo, onBackStep, sx }) {
  const { fullName, phone, addressDetail, province, district, subDistrict } = billingInfo;

  return (
    <Card sx={{ mb: 3, ...sx }}>
      <CardHeader
        title="Billing Address"
        action={
          <Button size="small" type="button" startIcon={<Icon icon={editFill} />} onClick={onBackStep}>
            Edit
          </Button>
        }
      />
      <CardContent>
        <Typography variant="subtitle2" gutterBottom>
          {fullName}&nbsp;
          {/* <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}> */}
          {/*  */}
          {/* </Typography> */}
        </Typography>

        <Typography variant="body2" gutterBottom>
          {`${addressDetail}, ${subDistrict}, ${district}, ${province}.`}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {phone}
        </Typography>
      </CardContent>
    </Card>
  );
}
