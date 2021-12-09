import PropTypes from 'prop-types';

// material
import { Stack, TextField } from '@material-ui/core';
// hooks
import { useState } from 'react';
import useLocales from '../../hooks/useLocales';
// components
import DistrictPicker from './DistrictPicker';
import ProvincePicker from './ProvincePicker';
import WardPicker from './WardPicker';

AddressPicker.propTypes = {
  getFieldProps: PropTypes.func,
  touched: PropTypes.bool,
  errors: PropTypes.object
};

export default function AddressPicker({ getFieldProps, touched, errors }) {
  const { t } = useLocales();

  const [province, setProvince] = useState(null);
  const [district, setDistrict] = useState(null);
  const [ward, setWard] = useState(null);

  const handleChangeProvince = (newValue) => {
    setProvince(newValue);
    setDistrict(null);
    setWard(null);
  };

  const handleChangeDistrict = (newValue) => {
    setDistrict(newValue);
    setWard(null);
  };

  const handleChangeWard = (newValue) => {
    setWard(newValue);
  };

  return (
    <>
      <Stack direction="row" spacing={3} sx={{ marginBottom: 2 }}>
        <ProvincePicker
          label={t('address.province')}
          onChange={handleChangeProvince}
          value={province?.name}
          required
          fullWidth
          getFieldProps={getFieldProps}
          touched={touched}
          errors={errors}
        />
        <DistrictPicker
          label={t('address.district')}
          provinceCode={province?.code}
          onChange={handleChangeDistrict}
          value={district?.name}
          required
          fullWidth
          getFieldProps={getFieldProps}
          touched={touched}
          errors={errors}
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
