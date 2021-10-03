import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material
import { useTheme } from '@material-ui/core/styles';
import { Badge } from '@material-ui/core';

// ----------------------------------------------------------------------

const MBadge = forwardRef(({ color = 'default', children, sx, ...other }, ref) => {
  const theme = useTheme();

  if (color === 'default' || color === 'error' || color === 'primary' || color === 'secondary') {
    return (
      <Badge ref={ref} color={color} sx={sx} {...other}>
        {children}
      </Badge>
    );
  }

  return (
    <Badge
      ref={ref}
      sx={{
        '& .MuiBadge-badge': {
          color: theme.palette[color].contrastText,
          bgcolor: theme.palette[color].main
        },
        ...sx
      }}
      {...other}
    >
      {children}
    </Badge>
  );
});

MBadge.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error'])
};

export default MBadge;
