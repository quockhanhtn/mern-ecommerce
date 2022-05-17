// icons
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
// material
import {
  Alert,
  Box,
  Card,
  Grid,
  Radio,
  Button,
  Collapse,
  TextField,
  Typography,
  RadioGroup,
  CardHeader,
  CardContent,
  FormControlLabel
} from '@material-ui/core';
//
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useLocales } from '../../hooks';
import { MHidden } from '../@material-extend';
import { OptionStyle } from '../@styled';

// ----------------------------------------------------------------------

CheckoutPaymentMethods.propTypes = {
  formik: PropTypes.object,
  paymentOptions: PropTypes.array
};

export default function CheckoutPaymentMethods({ paymentOptions, formik }) {
  const { t } = useLocales();
  const { enqueueSnackbar } = useSnackbar();
  const { errors, touched, values, getFieldProps } = formik;

  const cardOptions = [
    { value: 'ViSa1', label: '**** **** **** 1212 - Jimmy Holland' },
    { value: 'ViSa2', label: '**** **** **** 2424 - Shawn Stokes' },
    { value: 'MasterCard', label: '**** **** **** 4545 - Cole Armstrong' }
  ];

  if (errors.paymentMethod && touched.paymentMethod) {
    enqueueSnackbar(errors.paymentMethod, { variant: 'error' });
  }

  return (
    <Card>
      <CardHeader title={t('cart.payment-method')} />
      <CardContent>
        {errors.paymentMethod && touched.paymentMethod && (
          <Alert sx={{ mb: 2 }} severity="error">
            {errors.paymentMethod}
          </Alert>
        )}

        <RadioGroup row {...getFieldProps('paymentMethod')}>
          <Grid container spacing={2}>
            {paymentOptions.map((method) => {
              const { value, title, icons, description, isDevelop } = method;
              const hasChildren = value === 'credit_card';

              return (
                <Grid key={title} item xs={12}>
                  <OptionStyle
                    sx={{
                      ...(values.paymentMethod === value && {
                        boxShadow: (theme) => theme.customShadows.z8
                      }),
                      ...(hasChildren && { flexWrap: 'wrap' })
                    }}
                  >
                    <FormControlLabel
                      value={value}
                      disabled={isDevelop}
                      control={<Radio checkedIcon={<Icon icon={checkmarkCircle2Fill} />} />}
                      label={
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="subtitle2">{title}</Typography>
                          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                            {description}
                          </Typography>
                        </Box>
                      }
                      sx={{ flexGrow: 1, py: 3 }}
                    />
                    <MHidden width="smDown">
                      <Box sx={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
                        {icons.map((icon) => (
                          <Box
                            key={icon}
                            component="img"
                            alt="logo card"
                            src={icon}
                            sx={{ '&:last-child': { ml: 1 }, width: 'auto', height: '32px' }}
                          />
                        ))}
                      </Box>
                    </MHidden>

                    {hasChildren && (
                      <Collapse in={values.paymentMethod === 'credit_card'} sx={{ width: '100%' }}>
                        <TextField
                          select
                          fullWidth
                          label="Card"
                          {...getFieldProps('card')}
                          SelectProps={{ native: true }}
                        >
                          {cardOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </TextField>

                        <Button
                          id="add-card"
                          type="button"
                          size="small"
                          startIcon={<Icon icon={plusFill} width={20} height={20} />}
                          sx={{ my: 3 }}
                        >
                          Add new card
                        </Button>
                      </Collapse>
                    )}
                  </OptionStyle>
                </Grid>
              );
            })}
          </Grid>
        </RadioGroup>

        {/* {errors.paymentMethod && (
          <FormHelperText error>
            <Box component="span" sx={{ backgroundPositionX: 2 }}>
              {touched.paymentMethod && errors.paymentMethod}
            </Box>
          </FormHelperText>
        )} */}
      </CardContent>
    </Card>
  );
}
