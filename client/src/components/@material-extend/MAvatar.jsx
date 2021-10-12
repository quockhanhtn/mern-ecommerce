import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material
import { Avatar, useTheme } from '@material-ui/core';

// ----------------------------------------------------------------------

const MAvatar = forwardRef(({ color = 'default', sx, children, ...other }, ref) => {
  const theme = useTheme();

  if (color === 'default') {
    return (
      <Avatar ref={ref} sx={sx} {...other}>
        {children}
      </Avatar>
    );
  }

  return (
    <Avatar
      ref={ref}
      sx={{
        fontWeight: theme.typography.fontWeightMedium,
        color: theme.palette[color].contrastText,
        backgroundColor: theme.palette[color].main,
        ...sx
      }}
      {...other}
    >
      {children}
    </Avatar>
  );
});

MAvatar.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'])
};

export default MAvatar;
