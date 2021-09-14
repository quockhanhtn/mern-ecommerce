import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import infoFill from '@iconify/icons-eva/info-fill';
// material
import { Paper, Stack, Button, Popover, TextField, Typography, InputAdornment } from '@material-ui/core';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

PaymentNewCardForm.propTypes = {
  formik: PropTypes.object,
  onCancel: PropTypes.func
};

export default function PaymentNewCardForm({ formik, onCancel }) {
  const [isOpen, setIsOpen] = useState(null);
  const { values, resetForm, getFieldProps } = formik;

  const handleCancel = () => {
    onCancel();
    resetForm({
      values: {
        ...values,
        newCardName: '',
        newCardNumber: '',
        newCardExpired: '',
        newCardCvv: ''
      }
    });
  };

  return (
    <>
      <Paper
        sx={{
          p: 2.5,
          mb: 2.5,
          bgcolor: 'background.neutral'
        }}
      >
        <Stack spacing={2}>
          <Typography variant="subtitle1">Add new card</Typography>
          <TextField fullWidth size="small" label="Name on card" {...getFieldProps('newCardName')} />

          <TextField fullWidth size="small" label="Card number" {...getFieldProps('newCardNumber')} />

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField size="small" label="MM/YY" {...getFieldProps('newCardExpired')} />
            <TextField
              size="small"
              label="CVV"
              {...getFieldProps('newCardCvv')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <MIconButton size="small" edge="end" onClick={(e) => setIsOpen(e.currentTarget)}>
                      <Icon icon={infoFill} />
                    </MIconButton>
                  </InputAdornment>
                )
              }}
            />
          </Stack>

          <Stack direction="row" spacing={2}>
            <Button id="cancel" type="button" fullWidth onClick={handleCancel}>
              Cancel
            </Button>

            <Button id="create" type="button" fullWidth variant="contained">
              Create
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Popover
        open={Boolean(isOpen)}
        anchorEl={isOpen}
        onClose={() => setIsOpen(null)}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        PaperProps={{
          sx: {
            p: 1,
            maxWidth: 200
          }
        }}
      >
        <Typography variant="body2" align="center">
          Three-digit number on the back of your VISA card
        </Typography>
      </Popover>
    </>
  );
}
