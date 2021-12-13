import PropTypes from 'prop-types';

// material
import { Stack, TextField } from '@material-ui/core';
// hooks
import { useEffect, useState } from 'react';
import useLocales from '../../hooks/useLocales';
// components
import ProvincePicker, { getProvinceCode } from './ProvincePicker';
import DistrictPicker, { getDistrictCode } from './DistrictPicker';
import WardPicker from './WardPicker';

AddressPicker.propTypes = {
  formik: PropTypes.object
};

export default function AddressPicker({ formik, ...other }) {
  const { t } = useLocales();

  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);

  const handleChangeProvince = (newValue) => {
    setProvince(newValue);
    formik.setFieldValue('province', newValue?.name);
    setDistrict(null);
    setWard(null);
  };

  const handleChangeDistrict = (newValue) => {
    setDistrict(newValue);
    formik.setFieldValue('district', newValue?.name);
    setWard(null);
  };

  const handleChangeWard = (newValue) => {
    setWard(newValue);
    formik.setFieldValue('ward', newValue?.name);
  };

  const { errors, touched, getFieldProps } = formik;

  useEffect(() => {
    if (formik.values.province) {
      setProvince({
        name: formik.values.province,
        code: getProvinceCode(formik.values.province)
      });
      if (formik.values.district) {
        setDistrict({
          name: formik.values.district,
          code: getDistrictCode(formik.values.district)
        });
        if (formik.values.ward) {
          setWard({
            name: formik.values.ward
            // code: getWardCode(formik.values.ward)
          });
        }
      }
    }

    console.log('AddressPicker', {
      province: formik.values.province,
      district: formik.values.district,
      ward: formik.values.ward
    });
  }, []);

  return (
    <>
      <Stack direction="row" spacing={3} sx={{ marginBottom: 2 }} {...other}>
        <ProvincePicker
          label={t('address.province')}
          onChange={handleChangeProvince}
          value={province?.name}
          defaultProvinceName={formik.values.province}
          required
          fullWidth
          getFieldProps={getFieldProps}
          touched={touched}
          errors={errors}
          noOptionsText={t('common.no-options')}
        />
        <DistrictPicker
          label={t('address.district')}
          provinceCode={province?.code}
          onChange={handleChangeDistrict}
          defaultDistrictName={formik.values.district}
          value={district?.name}
          required
          fullWidth
          getFieldProps={getFieldProps}
          touched={touched}
          errors={errors}
          noOptionsText={t('common.no-options')}
        />
        <WardPicker
          label={t('address.ward')}
          districtCode={district?.code}
          onChange={handleChangeWard}
          value={ward?.name}
          required
          fullWidth
          getFieldProps={getFieldProps}
          touched={touched}
          errors={errors}
          noOptionsText={t('common.no-options')}
        />
      </Stack>

      <TextField
        fullWidth
        label={t('address.street')}
        {...getFieldProps('street')}
        error={Boolean(touched.street && errors.street)}
        helperText={touched.street && errors.street}
      />
    </>
  );
}
