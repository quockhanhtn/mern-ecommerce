import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import checkmarkCircle2Fill from '@iconify/icons-eva/checkmark-circle-2-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Stack,
  Paper,
  Radio,
  Button,
  Collapse,
  TextField,
  Typography,
  RadioGroup,
  FormControlLabel
} from '@material-ui/core';
//
import { MHidden } from '../../@material-extend';
import PaymentNewCardForm from './PaymentNewCardForm';

// ----------------------------------------------------------------------

const PAYMENT_OPTIONS = [
  {
    value: 'paypal',
    title: 'Pay with Paypal',
    icons: ['/static/icons/ic_paypal.svg']
  },
  {
    value: 'credit_card',
    title: 'Credit / Debit Card',
    icons: ['/static/icons/ic_mastercard.svg', '/static/icons/ic_visa.svg']
  }
];
const CARD_OPTIONS = [
  {
    value: 'visa1',
    label: '**** **** **** 1212 - Jimmy Holland'
  },
  {
    value: 'visa2',
    label: '**** **** **** 2424 - Shawn Stokes'
  },
  {
    value: 'mastercard',
    label: '**** **** **** 4545 - Cole Armstrong'
  }
];

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  [theme.breakpoints.up('md')]: {
    padding: 0,
    paddingTop: theme.spacing(5)
  }
}));

const OptionStyle = styled(Paper)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2),
  transition: theme.transitions.create('all'),
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

// ----------------------------------------------------------------------

PaymentMethods.propTypes = {
  formik: PropTypes.object
};

export default function PaymentMethods({ formik }) {
  const [show, setShow] = useState(false);
  const { values, getFieldProps } = formik;

  const handleCollapseIn = () => {
    setShow((prev) => !prev);
  };

  const handleCollapseOut = () => {
    setShow(false);
  };

  return (
    <RootStyle>
      <Typography variant="subtitle1" sx={{ mb: 5 }}>
        Payment Method
      </Typography>

      <RadioGroup {...getFieldProps('method')}>
        <Stack spacing={3}>
          {PAYMENT_OPTIONS.map((method) => {
            const { value, title, icons } = method;
            const hasChildren = value === 'credit_card';

            return (
              <OptionStyle
                key={title}
                sx={{
                  ...(values.method === value && {
                    boxShadow: (theme) => theme.customShadows.z8
                  }),
                  ...(hasChildren && { flexWrap: 'wrap' })
                }}
              >
                <FormControlLabel
                  value={value}
                  control={<Radio checkedIcon={<Icon icon={checkmarkCircle2Fill} />} />}
                  label={
                    <Typography variant="subtitle2" sx={{ ml: 1 }}>
                      {title}
                    </Typography>
                  }
                  sx={{ py: 3, mx: 0 }}
                />

                <MHidden width="smDown">
                  <Stack direction="row" alignItems="center" spacing={1}>
                    {icons.map((icon) => (
                      <img key={icon} alt="logo card" src={icon} />
                    ))}
                  </Stack>
                </MHidden>

                {hasChildren && (
                  <Collapse in={values.method === 'credit_card'} sx={{ width: 1 }}>
                    <TextField select fullWidth label="Card" {...getFieldProps('card')} SelectProps={{ native: true }}>
                      {CARD_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </TextField>

                    <Button
                      id="addNewCard"
                      type="button"
                      size="small"
                      startIcon={<Icon icon={plusFill} width={20} height={20} />}
                      onClick={handleCollapseIn}
                      sx={{ my: 3 }}
                    >
                      Add new card
                    </Button>

                    <Collapse in={show}>
                      <PaymentNewCardForm formik={formik} onCancel={handleCollapseOut} />
                    </Collapse>
                  </Collapse>
                )}
              </OptionStyle>
            );
          })}
        </Stack>
      </RadioGroup>
    </RootStyle>
  );
}
