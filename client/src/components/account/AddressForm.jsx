import PropTypes from 'prop-types';
import { useState } from 'react';
// form validation
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Stack,
  Radio,
  Button,
  Divider,
  Checkbox,
  TextField,
  RadioGroup,
  DialogTitle,
  DialogActions,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import useLocales from '../../hooks/useLocales';
//
import { DialogAnimate } from '../animate';
import AddressPicker from '../location/AddressPicker';
import { MLabelTypo } from '../@material-extend';

// ----------------------------------------------------------------------

AddressForm.propTypes = {
  addressData: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func
};

export default function AddressForm({ addressData, open, onClose, onSubmit }) {
  const { t } = useLocales();

  const AddressSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('address.full-name-required'))
      .min(3, t('address.full-name-min'))
      .max(50, t('address.full-name-max')),
    phone: Yup.string()
      .required(t('address.phone-required'))
      .matches(/^[0-9]{10,11}$/, t('address.phone-invalid')),

    street: Yup.string().required(t('address.street-required')),
    ward: Yup.string().required(t('address.ward-required')),
    district: Yup.string().required(t('address.district-required')),
    province: Yup.string().required(t('address.province-required')),

    type: Yup.string(),
    note: Yup.string()
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',

      street: '',
      ward: '',
      district: '',
      province: '',

      type: '',
      note: ''
    },
    validationSchema: AddressSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        console.log('submit', values);
        onSubmit();
        setSubmitting(true);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, values, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  return (
    <DialogAnimate maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>{addressData ? t('address.edit-title') : t('address.add-title')}</DialogTitle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={{ xs: 2, sm: 3 }} sx={{ p: 3 }}>
            <RadioGroup row {...getFieldProps('addressType')}>
              <FormControlLabel value="Home" control={<Radio />} label="Home" sx={{ mr: 2 }} />
              <FormControlLabel value="Office" control={<Radio />} label="Office" />
            </RadioGroup>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <TextField
                fullWidth
                label={t('address.full-name')}
                {...getFieldProps('name')}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && errors.name}
              />
              <TextField
                fullWidth
                label={t('address.phone')}
                {...getFieldProps('phone')}
                error={Boolean(touched.phone && errors.phone)}
                helperText={touched.phone && errors.phone}
              />
            </Stack>

            <AddressPicker getFieldProps={getFieldProps} touched={touched} errors={errors} />

            <MLabelTypo text={t('t.address.type')} />
            <TextField fullWidth label={t('address.note')} {...getFieldProps('note')} />

            {/* <FormControlLabel
              control={<Checkbox checked={values.isDefault} {...getFieldProps('isDefault')} />}
              label="Use this address as default."
              sx={{ mt: 3 }}
            /> */}
          </Stack>

          <Divider />

          <DialogActions>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              Deliver to this Address
            </LoadingButton>
            <Button type="button" color="inherit" variant="outlined" onClick={onClose}>
              Cancel
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </DialogAnimate>
  );
}
