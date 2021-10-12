import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material
import { alpha, useTheme } from '@material-ui/core/styles';
import { Checkbox } from '@material-ui/core';

// ----------------------------------------------------------------------

const MCheckbox = forwardRef(({ color = 'primary', sx, ...other }, ref) => {
  const theme = useTheme();

  if (color === 'default' || color === 'primary' || color === 'secondary') {
    return <Checkbox ref={ref} color={color} sx={sx} {...other} />;
  }

  return (
    <Checkbox
      ref={ref}
      sx={{
        '&.Mui-checked': {
          color: theme.palette[color].main
        },
        '&.MuiCheckbox-indeterminate': {
          color: theme.palette[color].main
        },
        '&:hover, &.Mui-checked:hover': {
          backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
        },
        ...sx
      }}
      {...other}
    />
  );
});

MCheckbox.propTypes = {
  sx: PropTypes.object,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'])
};

export default MCheckbox;
