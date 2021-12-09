import PropTypes from 'prop-types';
// material
import { Autocomplete, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
// ----------------------------------------------------------------------

WardPicker.propTypes = {
  getFieldProps: PropTypes.func,
  touched: PropTypes.any,
  errors: PropTypes.any,
  label: PropTypes.string.isRequired,
  districtCode: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

WardPicker.defaultProps = {
  districtCode: null,
  value: ''
};

export default function WardPicker({ getFieldProps, touched, errors, label, districtCode, value, onChange, ...other }) {
  const [allWards, setAllWards] = useState([]);
  const [wards, setWards] = useState([]);

  useEffect(() => {
    axios
      .get(`https://provinces.open-api.vn/api/w/`)
      .then((res) => {
        setAllWards(res.data);
        const listWards = res.data.filter((w) => w.district_code === districtCode);
        setWards(listWards);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const listWard = allWards.filter((w) => w.district_code === districtCode);
    setWards(listWard);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtCode]);

  const handleOnChange = (option, value) => {
    const defaultValue = wards.find((sub) => sub?.name === value?.name);
    onChange(defaultValue);
  };

  return (
    <Autocomplete
      options={wards.map((w) => ({ name: w.name }))}
      value={wards.find((w) => w.name === value)}
      onChange={(option, value) => handleOnChange(option, value)}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          margin="none"
          {...getFieldProps('ward')}
          error={Boolean(touched.ward && errors.ward)}
          helperText={touched.ward && errors.ward}
        />
      )}
      {...other}
    />
  );
}
