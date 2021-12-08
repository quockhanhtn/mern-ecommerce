import faker from 'faker';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
// material
import { Box, Grid, Card, Button, Typography, Stack } from '@material-ui/core';
// // redux
// import { useSelector } from '../../../../redux/store';
// // utils
// import fakeRequest from '../../../../utils/fakeRequest';
//
import AccountAddressBook from './AccountAddressBook';
import AccountBillingPaymentMethod from './AccountBillingPaymentMethod';
import AccountBillingInvoiceHistory from './AccountBillingInvoiceHistory';

// ----------------------------------------------------------------------

export default function AccountBilling() {
  // const { cards, invoices, addressBook } = useSelector((state) => state.user);

  const cards = [...Array(2)].map((_, index) => ({
    id: faker.datatype.uuid(),
    cardNumber: (index === 0 && '**** **** **** 1234') || (index === 1 && '**** **** **** 5678'),
    cardType: (index === 0 && 'master_card') || (index === 1 && 'visa')
  }));

  const invoices = [...Array(10)].map(() => ({
    id: faker.datatype.uuid(),
    createdAt: faker.date.past(),
    price: faker.datatype.number({ min: 4, max: 99, precision: 0.01 })
  }));

  const addressBook = [...Array(4)].map(() => ({
    id: faker.datatype.uuid(),
    name: faker.name.findName(),
    phone: faker.phone.phoneNumber(),
    country: faker.address.country(),
    state: faker.address.state(),
    city: faker.address.city(),
    street: faker.address.streetAddress(),
    zipCode: faker.address.zipCode()
  }));

  const [open, setOpen] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const NewCardSchema = Yup.object().shape({
    cardName: Yup.string().required('Name is required'),
    cardNumber: Yup.string().required('Card number is required'),
    cardExpired: Yup.string().required('Card expired is required'),
    cardCvv: Yup.string().required('Cvv is required')
  });

  const formik = useFormik({
    initialValues: {
      cardName: '',
      cardNumber: '',
      cardExpired: '',
      cardCvv: ''
    },
    validationSchema: NewCardSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      // await fakeRequest(500);
      handleCancel();
      resetForm();
      setSubmitting(false);
      alert(JSON.stringify(values, null, 2));
      enqueueSnackbar('Add card success', { variant: 'success' });
    }
  });

  const handleOpenAddCard = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleCancel = () => {
    setOpen(false);
    formik.resetForm();
  };

  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={8}>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
            <Typography variant="overline" sx={{ mb: 3, display: 'block', color: 'text.secondary' }}>
              Your Plan
            </Typography>
            <Typography variant="h4">Premium</Typography>
            <Box
              sx={{
                mt: { xs: 2, sm: 0 },
                position: { sm: 'absolute' },
                top: { sm: 24 },
                right: { sm: 24 }
              }}
            >
              <Button size="small" color="inherit" variant="outlined" sx={{ mr: 1 }}>
                Cancel plan
              </Button>
              <Button size="small" variant="outlined">
                Upgrade plan
              </Button>
            </Box>
          </Card>

          <AccountBillingPaymentMethod
            cards={cards}
            formik={formik}
            isOpen={open}
            onOpen={handleOpenAddCard}
            onCancel={handleCancel}
          />

          <AccountAddressBook addressBook={addressBook} />
        </Stack>
      </Grid>

      <Grid item xs={12} md={4}>
        <AccountBillingInvoiceHistory invoices={invoices} />
      </Grid>
    </Grid>
  );
}
