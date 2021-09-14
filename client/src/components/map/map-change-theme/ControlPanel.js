import PropTypes from 'prop-types';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Radio, Typography, RadioGroup, FormControlLabel } from '@material-ui/core';

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
  themes: PropTypes.object,
  selectTheme: PropTypes.string,
  onChangeTheme: PropTypes.func
};

export default function ControlPanel({
  themes,
  selectTheme,
  onChangeTheme,

  ...other
}) {
  return (
    <RootStyle>
      <Typography gutterBottom variant="subtitle2" sx={{ color: 'common.white' }}>
        Select Theme:
      </Typography>
      <RadioGroup value={selectTheme} onChange={onChangeTheme} {...other}>
        {Object.keys(themes).map((item) => (
          <FormControlLabel
            key={item}
            value={item}
            control={<Radio size="small" />}
            label={item}
            sx={{ color: 'common.white', textTransform: 'capitalize' }}
          />
        ))}
      </RadioGroup>
    </RootStyle>
  );
}
