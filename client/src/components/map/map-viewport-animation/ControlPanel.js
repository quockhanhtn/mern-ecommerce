import PropTypes from 'prop-types';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 99,
  minWidth: 200,
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  padding: theme.spacing(2),
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)', // Fix on Mobile
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[900], 0.72)
}));

// ----------------------------------------------------------------------

ControlPanel.propTypes = {
  data: PropTypes.array,
  selectedCity: PropTypes.string,
  handleChange: PropTypes.func
};

export default function ControlPanel({ data, selectedCity, handleChange }) {
  return (
    <RootStyle>
      {data.map((city) => (
        <RadioGroup key={city.city} value={selectedCity} onChange={(event) => handleChange(event, city)}>
          <FormControlLabel
            value={city.city}
            label={city.city}
            control={<Radio size="small" />}
            sx={{ color: 'common.white' }}
          />
        </RadioGroup>
      ))}
    </RootStyle>
  );
}
