import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

// ----------------------------------------------------------------------

const ButtonStyle = styled(Button)(({ theme, styleProps }) => {
  const { color, variant } = styleProps;

  const styleContained = (color) => ({
    boxShadow: theme.customShadows[color],
    color: theme.palette[color].contrastText,
    backgroundColor: theme.palette[color].main,
    '&:hover': {
      backgroundColor: theme.palette[color].dark
    }
  });

  const styleOutlined = (color) => ({
    color: theme.palette[color].main,
    border: `1px solid ${alpha(theme.palette[color].main, 0.48)}`,
    '&:hover': {
      border: `1px solid ${theme.palette[color].main}`,
      backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
    }
  });

  const styleText = (color) => ({
    color: theme.palette[color].main,
    '&:hover': {
      backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
    }
  });
  return {
    ...(variant === 'contained' && { ...styleContained(color) }),
    ...(variant === 'outlined' && { ...styleOutlined(color) }),
    ...(variant === 'text' && { ...styleText(color) })
  };
});

// ----------------------------------------------------------------------

const MButton = forwardRef(({ color = 'primary', variant = 'text', children, ...other }, ref) => {
  if (color === 'inherit' || color === 'primary' || color === 'secondary') {
    return (
      <Button ref={ref} color={color} variant={variant} {...other}>
        {children}
      </Button>
    );
  }

  return (
    <ButtonStyle ref={ref} variant={variant} styleProps={{ color, variant }} {...other}>
      {children}
    </ButtonStyle>
  );
});

MButton.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'info', 'success', 'warning', 'error']),
  variant: PropTypes.oneOfType([PropTypes.oneOf(['contained', 'outlined', 'text']), PropTypes.string])
};

export default MButton;
