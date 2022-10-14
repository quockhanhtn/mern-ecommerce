import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// form validation
import * as Yup from 'yup';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import {
  Stack,
  Radio,
  Button,
  Divider,
  TextField,
  RadioGroup,
  DialogTitle,
  DialogActions,
  FormControlLabel
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useLocales from '~/hooks/useLocales';
//
import { DialogAnimate } from '~/components/animate';
import { MLabelTypo } from '~/components/@material-extend';
import AddressPicker from '../location/AddressPicker';

// ----------------------------------------------------------------------

AddressForm.propTypes = {
  addressData: PropTypes.object,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
  isLoading: PropTypes.bool
};

export default function AddressForm({ addressData, open, onClose, onSubmit, isLoading }) {
  const { t } = useLocales();

  const AddressSchema = Yup.object().shape({
    name: Yup.string()
      .required(t('address.full-name-required'))
      .min(3, t('address.full-name-min'))
      .max(50, t('address.full-name-max')),
    phone: Yup.string()
      .required(t('address.phone-required'))
      .matches(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/, t('address.phone-invalid')),

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
        onSubmit(values);
        setSubmitting(true);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  const { errors, touched, handleSubmit, getFieldProps } = formik;
  const [addressType, setAddressType] = useState('');

  useEffect(() => {
    if (addressData) {
      formik.setFieldValue('name', addressData.name);
      formik.setFieldValue('phone', addressData.phone);
      formik.setFieldValue('street', addressData.street);
      formik.setFieldValue('ward', addressData.ward);
      formik.setFieldValue('district', addressData.district);
      formik.setFieldValue('province', addressData.province);
      formik.setFieldValue('type', addressData.type);
      formik.setFieldValue('note', addressData.note);

      if (addressData.type === t('address.type-home')) {
        setAddressType(t('address.type-home'));
      } else if (addressData.type === t('address.type-office')) {
        setAddressType(t('address.type-office'));
      } else {
        setAddressType(t('address.type-other'));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addressData]);

  const handleChangeAddressType = (e) => {
    setAddressType(e.target.value);
    formik.setFieldValue('type', e.target.value);
  };

  return (
    <DialogAnimate maxWidth="md" open={open} onClose={onClose}>
      <DialogTitle>{addressData ? t('address.edit-title') : t('address.add-title')}</DialogTitle>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={{ xs: 2, sm: 3 }} sx={{ p: 3 }}>
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

            <AddressPicker formik={formik} />

            <>
              <MLabelTypo text={t('address.type')} />
              <RadioGroup row value={addressType} onChange={handleChangeAddressType}>
                <FormControlLabel
                  value={t('address.type-home')}
                  control={<Radio />}
                  label={t('address.type-home')}
                  sx={{ mr: 2 }}
                />
                <FormControlLabel
                  value={t('address.type-office')}
                  control={<Radio />}
                  label={t('address.type-office')}
                  sx={{ mr: 2 }}
                />
                <FormControlLabel value="Other" control={<Radio />} label={t('address.type-other')} />
                <TextField
                  label={t('address.type-other')}
                  {...getFieldProps('type')}
                  disabled={addressType !== 'Other'}
                  sx={{ flex: 1 }}
                />
              </RadioGroup>
            </>

            <TextField fullWidth label={t('address.note')} {...getFieldProps('note')} />

            {/* <FormControlLabel
              control={<Checkbox checked={values.isDefault} {...getFieldProps('isDefault')} />}
              label="Use this address as default."
              sx={{ mt: 3 }}
            /> */}
          </Stack>

          <Divider />

          <DialogActions>
            <LoadingButton type="submit" variant="contained" loading={isLoading}>
              {t('common.save')}
            </LoadingButton>
            <Button type="button" color="inherit" variant="outlined" onClick={onClose}>
              {t('common.cancel')}
            </Button>
          </DialogActions>
        </Form>
      </FormikProvider>
    </DialogAnimate>
  );
}
