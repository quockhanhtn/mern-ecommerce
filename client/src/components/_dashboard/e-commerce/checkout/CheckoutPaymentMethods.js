import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
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
  FormHelperText,
  FormControlLabel
} from '@material-ui/core';
//
import { MHidden } from '../../../@material-extend';

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

CheckoutPaymentMethods.propTypes = {
  formik: PropTypes.object,
  paymentOptions: PropTypes.array,
  cardOptions: PropTypes.array
};

export default function CheckoutPaymentMethods({ paymentOptions, cardOptions, formik }) {
  const { errors, touched, values, getFieldProps } = formik;

  return (
    <Card sx={{ my: 3 }}>
      <CardHeader title="Payment options" />
      <CardContent>
        <RadioGroup row {...getFieldProps('payment')}>
          <Grid container spacing={2}>
            {paymentOptions.map((method) => {
              const { value, title, icons, description } = method;
              const hasChildren = value === 'credit_card';

              return (
                <Grid key={title} item xs={12}>
                  <OptionStyle
                    sx={{
                      ...(values.payment === value && {
                        boxShadow: (theme) => theme.customShadows.z8
                      }),
                      ...(hasChildren && { flexWrap: 'wrap' })
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
                            sx={{ '&:last-child': { ml: 1 } }}
                          />
                        ))}
                      </Box>
                    </MHidden>

                    {hasChildren && (
                      <Collapse in={values.payment === 'credit_card'} sx={{ width: '100%' }}>
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

        {errors.payment && (
          <FormHelperText error>
            <Box component="span" sx={{ px: 2 }}>
              {touched.payment && errors.payment}
            </Box>
          </FormHelperText>
        )}
      </CardContent>
    </Card>
  );
}
