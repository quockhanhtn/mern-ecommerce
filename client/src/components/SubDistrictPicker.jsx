import PropTypes from 'prop-types';
// material
import { Autocomplete, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import axios from 'axios';
// ----------------------------------------------------------------------

SubDistrictPicker.propTypes = {
  label: PropTypes.string.isRequired,
  defaultDistrictCode: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired
};

SubDistrictPicker.defaultProps = {
  defaultDistrictCode: null,
  value: ''
};

export default function SubDistrictPicker({ touched, errors, label, defaultDistrictCode, value, onChange, ...other }) {
  const [subDistrictsAll, setSubDistrictsAll] = useState([]);
  const [subDistricts, setSubDistricts] = useState([]);

  useEffect(() => {
    axios
      .get(`https://provinces.open-api.vn/api/w/`)
      .then((res) => {
        setSubDistrictsAll(res.data);
        const listSubDistricts = res.data.filter((sub) => sub.district_code === defaultDistrictCode);
        setSubDistricts(listSubDistricts);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    const listSubDistricts = subDistrictsAll.filter((sub) => sub.district_code === defaultDistrictCode);
    setSubDistricts(listSubDistricts);
  }, [defaultDistrictCode]);

  const handleOnChange = (option, value) => {
    const defaultValue = subDistricts.find((sub) => sub?.name === value?.name);
    onChange(defaultValue);
  };

  return (
    <Autocomplete
      key={defaultDistrictCode}
      options={subDistricts.map((sub) => ({
        name: sub.name
      }))}
      value={subDistricts.find((sub) => sub.name === value)}
      onChange={(option, value) => handleOnChange(option, value)}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          margin="none"
          error={Boolean(touched.subDistrict && errors.subDistrict)}
          helperText={touched.subDistrict && errors.subDistrict}
        />
      )}
      {...other}
    />
  );
}
