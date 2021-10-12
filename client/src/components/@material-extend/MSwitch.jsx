import PropTypes from 'prop-types';
// material
import { alpha, useTheme } from '@material-ui/core/styles';
import { Switch } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function MSwitch({ color = 'primary', sx, ...other }) {
  const theme = useTheme();

  if (color === 'default' || color === 'primary' || color === 'secondary') {
    return <Switch color={color} sx={sx} {...other} />;
  }

  return (
    <Switch
      sx={{
        '& .Mui-checked': {
          color: theme.palette[color].main,
          '&:hover': {
            bgcolor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
          }
        },
        '& .Mui-checked+.MuiSwitch-track': {
          bgcolor: theme.palette[color].main
        },
        ...sx
      }}
      {...other}
    />
  );
}

MSwitch.propTypes = {
  sx: PropTypes.object,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'])
};
