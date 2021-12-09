import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Form, FormikProvider } from 'formik';
import plusFill from '@iconify/icons-eva/plus-fill';
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill';
// material
import { Box, Paper, Stack, Card, Button, Collapse, TextField, IconButton, Typography } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';

// ----------------------------------------------------------------------

AccountBillingPaymentMethod.propTypes = {
  formik: PropTypes.object,
  cards: PropTypes.array,
  isOpen: PropTypes.bool,
  onOpen: PropTypes.func,
  onCancel: PropTypes.func
};

export default function AccountBillingPaymentMethod({ formik, cards, isOpen, onOpen, onCancel }) {
  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
        Payment Method
      </Typography>

      <Stack spacing={2} direction={{ xs: 'column', md: 'row' }}>
        {cards.map((card) => (
          <Paper
            key={card.id}
            sx={{
              p: 3,
              width: 1,
              position: 'relative',
              border: (theme) => `solid 1px ${theme.palette.grey[500_32]}`
            }}
          >
            <Box
              component="img"
              alt="icon"
              src={card.cardType === 'master_card' ? '/static/icons/ic_mastercard.svg' : '/static/icons/ic_visa.svg'}
              sx={{ mb: 1 }}
            />
            <Typography variant="subtitle2">{card.cardNumber}</Typography>
            <IconButton
              sx={{
                top: 8,
                right: 8,
                position: 'absolute'
              }}
            >
              <Icon icon={moreVerticalFill} width={20} height={20} />
            </IconButton>
          </Paper>
        ))}
      </Stack>

      <Box sx={{ mt: 3 }}>
        <Button size="small" startIcon={<Icon icon={plusFill} />} onClick={onOpen}>
          Add new card
        </Button>
      </Box>

      <Collapse in={isOpen}>
        <Box
          sx={{
            padding: 3,
            marginTop: 3,
            borderRadius: 1,
            bgcolor: 'background.neutral'
          }}
        >
          <FormikProvider value={formik}>
            <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <Typography variant="subtitle1">Add new card</Typography>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Name on card"
                    {...getFieldProps('cardName')}
                    error={Boolean(touched.cardName && errors.cardName)}
                    helperText={touched.cardName && errors.cardName}
                  />

                  <TextField
                    fullWidth
                    label="Card number"
                    {...getFieldProps('cardNumber')}
                    error={Boolean(touched.cardNumber && errors.cardNumber)}
                    helperText={touched.cardNumber && errors.cardNumber}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="Expiration date"
                    placeholder="MM/YY"
                    {...getFieldProps('cardExpired')}
                    error={Boolean(touched.cardExpired && errors.cardExpired)}
                    helperText={touched.cardExpired && errors.cardExpired}
                  />

                  <TextField
                    fullWidth
                    label="Cvv"
                    {...getFieldProps('cardCvv')}
                    error={Boolean(touched.cardCvv && errors.cardCvv)}
                    helperText={touched.cardCvv && errors.cardCvv}
                  />
                </Stack>

                <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
                  <Button type="button" color="inherit" variant="outlined" onClick={onCancel}>
                    Cancel
                  </Button>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Save Change
                  </LoadingButton>
                </Stack>
              </Stack>
            </Form>
          </FormikProvider>
        </Box>
      </Collapse>
    </Card>
  );
}
