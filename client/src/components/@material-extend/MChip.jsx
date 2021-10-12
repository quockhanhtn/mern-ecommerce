import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// material
import { alpha, experimentalStyled as styled, emphasize } from '@material-ui/core/styles';
import { Chip } from '@material-ui/core';

// ----------------------------------------------------------------------

const ChipStyle = styled(Chip)(({ theme, styleProps }) => {
  const { color, variant, clickable, onDelete } = styleProps;

  // Filled
  const styleFilled = (color) => ({
    color: theme.palette[color].contrastText,
    backgroundColor: theme.palette[color].main,
    '& .MuiChip-icon': { color: 'inherit' },
    '& .MuiChip-avatar': {
      color: theme.palette[color].lighter,
      backgroundColor: theme.palette[color].dark
    },
    '& .MuiChip-deleteIcon': {
      color: alpha(theme.palette[color].contrastText, 0.7),
      '&:hover, &:active': { color: theme.palette[color].contrastText }
    }
  });

  const styleFilledClickable = (color) => ({
    '&:hover, &:focus': {
      backgroundColor: emphasize(theme.palette[color].main, theme.palette.action.hoverOpacity)
    }
  });

  const styleFilledDeletable = (color) => ({
    '&:focus': {
      backgroundColor: emphasize(theme.palette[color].main, theme.palette.action.focusOpacity)
    }
  });

  // Outlined
  const styleOutlined = (color) => ({
    color: theme.palette[color].main,
    border: `1px solid ${theme.palette[color].main}`,
    '&:focus, &.MuiChip-clickable:hover': {
      backgroundColor: alpha(theme.palette[color].main, theme.palette.action.hoverOpacity)
    },
    '& .MuiChip-icon': { color: 'currentColor' },
    '& .MuiChip-avatar': {
      color: theme.palette[color].lighter,
      backgroundColor: theme.palette[color].dark
    },
    '& .MuiChip-deleteIcon': {
      color: alpha(theme.palette[color].main, 0.7),
      '&:hover, &:active': { color: theme.palette[color].main }
    }
  });

  return {
    ...(variant === 'filled'
      ? {
          ...styleFilled(color),
          ...(clickable && { ...styleFilledClickable(color) }),
          ...(onDelete && { ...styleFilledDeletable(color) })
        }
      : {
          ...styleOutlined(color)
        })
  };
});

// ----------------------------------------------------------------------

const Mchip = forwardRef(
  ({ color = 'default', variant = 'filled', clickable: clickableProp, onDelete: onDeleteProp, ...other }, ref) => {
    if (color === 'default' || color === 'primary' || color === 'secondary') {
      return (
        <Chip
          ref={ref}
          color={color}
          variant={variant}
          clickable={clickableProp && clickableProp}
          onDelete={onDeleteProp && onDeleteProp}
          {...other}
        />
      );
    }

    return (
      <ChipStyle
        ref={ref}
        variant={variant}
        clickable={clickableProp && clickableProp}
        onDelete={onDeleteProp && onDeleteProp}
        styleProps={{
          color,
          variant,
          clickable: clickableProp && clickableProp,
          onDelete: onDeleteProp && onDeleteProp
        }}
        {...other}
      />
    );
  }
);

Mchip.propTypes = {
  clickable: PropTypes.bool,
  onDelete: PropTypes.func,
  color: PropTypes.oneOf(['default', 'primary', 'secondary', 'info', 'success', 'warning', 'error']),
  variant: PropTypes.oneOfType([PropTypes.oneOf(['filled', 'outlined']), PropTypes.string])
};

export default Mchip;
