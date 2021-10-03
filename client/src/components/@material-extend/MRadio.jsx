import PropTypes from 'prop-types';
// material
import { alpha, useTheme } from '@material-ui/core/styles';
import { Radio } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function MRadio({ color = 'primary', sx, ...other }) {
  const theme = useTheme();

  if (color === 'default' || color === 'primary' || color === 'secondary') {
    return <Radio color={color} sx={sx} {...other} />;
  }

  return (
    <Radio
      sx={{
        '&.Mui-checked': {
          color: theme.palette[color].main
        },
        '&:hover, &.Mui-checked:hover': {
          bgcolor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
        },
        ...sx
      }}
      {...other}
    />
  );
}

MRadio.propTypes = {
  sx: PropTypes.object,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'])
};
