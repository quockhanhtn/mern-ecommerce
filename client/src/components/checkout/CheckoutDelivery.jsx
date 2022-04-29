import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from '@material-ui/core';

// ----------------------------------------------------------------------

const OptionStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 2.5),
  justifyContent: 'space-between',
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

// ----------------------------------------------------------------------

CheckoutDelivery.propTypes = {
  formik: PropTypes.object,
  deliveryOptions: PropTypes.array,
  onApplyShipping: PropTypes.func
};

export default function CheckoutDelivery({ formik, deliveryOptions, onApplyShipping, ...other }) {
  const { values, setFieldValue } = formik;

  return (
    <Card {...other}>
      <CardHeader title="Delivery options" />
      <CardContent>
        <RadioGroup
          name="delivery"
          value={Number(values.delivery) || 0}
          onChange={(event) => {
            const { value } = event.target;
            setFieldValue('delivery', Number(value));
            onApplyShipping(Number(value));
          }}
        >
          <Grid container spacing={2}>
            {deliveryOptions.map((delivery) => {
              const { value, title, description } = delivery;
              return (
                <Grid key={value} item xs={12} md={6}>
                  <OptionStyle
                    sx={{
                      ...(values.delivery === value && {
                        boxShadow: (theme) => theme.customShadows.z8
                      })
                    }}
                  >
                    <FormControlLabel
                      value={value}
                      control={<Radio checkedIcon={<Icon icon={checkmarkCircle2Fill} />} />}
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="subtitle2">{title}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {description}
                          </Typography>
                        </Box>
                      }
                      sx={{ py: 3, flexGrow: 1, mr: 0 }}
                    />
                  </OptionStyle>
                </Grid>
              );
            })}
          </Grid>
        </RadioGroup>
      </CardContent>
    </Card>
  );
}
