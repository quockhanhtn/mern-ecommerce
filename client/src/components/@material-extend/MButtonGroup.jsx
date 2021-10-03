import PropTypes from 'prop-types';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { ButtonGroup } from '@material-ui/core';

// ----------------------------------------------------------------------

const ButtonGroupStyle = styled(ButtonGroup)(({ theme, styleProps }) => {
  const { color, variant } = styleProps;

  const styleContained = (color) => ({
    boxShadow: theme.customShadows[color],
    '& .MuiButtonGroup-grouped': {
      color: theme.palette[color].contrastText,
      backgroundColor: theme.palette[color].main,
      borderColor: `${theme.palette[color].dark} !important`,
      '&:hover': {
        backgroundColor: theme.palette[color].dark
      }
    }
  });

  const styleOutlined = (color) => ({
    '& .MuiButtonGroup-grouped': {
      color: theme.palette[color].main,
      borderColor: `${alpha(theme.palette[color].main, 0.48)} !important`,
      '&:hover': {
        borderColor: `${theme.palette[color].main} !important`,
        backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
      }
    }
  });

  const styleText = (color) => ({
    '& .MuiButtonGroup-grouped': {
      color: theme.palette[color].main,
      borderColor: `${theme.palette[color].main} !important`,
      '&:hover': {
        backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
      }
    }
  });
  return {
    ...(variant === 'contained' && { ...styleContained(color) }),
    ...(variant === 'outlined' && { ...styleOutlined(color) }),
    ...(variant === 'text' && { ...styleText(color) })
  };
});

// ----------------------------------------------------------------------

function MButtonGroup({ color = 'primary', variant = 'outlined', children, ...other }) {
  if (color === 'inherit' || color === 'primary' || color === 'secondary') {
    return (
      <ButtonGroup color={color} variant={variant} {...other}>
        {children}
      </ButtonGroup>
    );
  }

  return (
    <ButtonGroupStyle variant={variant} styleProps={{ color, variant }} {...other}>
      {children}
    </ButtonGroupStyle>
  );
}

MButtonGroup.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'info', 'success', 'warning', 'error']),
  variant: PropTypes.oneOfType([PropTypes.oneOf(['contained', 'outlined', 'text']), PropTypes.string])
};

export default MButtonGroup;
