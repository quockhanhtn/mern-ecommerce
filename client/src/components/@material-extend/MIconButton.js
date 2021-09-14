import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material
import { alpha, useTheme } from '@material-ui/core/styles';
import { IconButton } from '@material-ui/core';
//
import { ButtonAnimate } from '../animate';

// ----------------------------------------------------------------------

const MIconButton = forwardRef(({ color = 'default', children, sx, ...other }, ref) => {
  const theme = useTheme();

  if (color === 'default' || color === 'inherit' || color === 'primary' || color === 'secondary') {
    return (
      <ButtonAnimate>
        <IconButton ref={ref} color={color} sx={sx} {...other}>
          {children}
        </IconButton>
      </ButtonAnimate>
    );
  }

  return (
    <ButtonAnimate>
      <IconButton
        ref={ref}
        sx={{
          color: theme.palette[color].main,
          '&:hover': {
            bgcolor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
          },
          ...sx
        }}
        {...other}
      >
        {children}
      </IconButton>
    </ButtonAnimate>
  );
});

MIconButton.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object,
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary', 'info', 'success', 'warning', 'error'])
};

export default MIconButton;
