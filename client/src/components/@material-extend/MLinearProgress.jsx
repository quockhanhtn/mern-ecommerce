import PropTypes from 'prop-types';
// material
import { darken, lighten, useTheme } from '@material-ui/core/styles';
import { LinearProgress } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function MLinearProgress({ color = 'primary', sx, ...other }) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const gradientDashed = (color) => {
    const getColor = isLight ? lighten(color, 0.62) : darken(color, 0.5);
    return `radial-gradient(${getColor} 0%, ${getColor}  16%, transparent 42%)`;
  };

  if (color === 'inherit' || color === 'primary' || color === 'secondary') {
    return <LinearProgress color={color} sx={sx} {...other} />;
  }

  return (
    <LinearProgress
      sx={{
        '& .MuiLinearProgress-bar': {
          bgcolor: theme.palette[color].main
        },
        '& .MuiLinearProgress-dashed': {
          backgroundImage: gradientDashed(theme.palette[color].main)
        },
        '&.MuiLinearProgress-indeterminate, &.MuiLinearProgress-determinate, & .MuiLinearProgress-bar2Buffer, &.MuiLinearProgress-query':
          {
            bgcolor: isLight ? theme.palette[color].lighter : theme.palette[color].darker
          },
        ...sx
      }}
      {...other}
    />
  );
}

MLinearProgress.propTypes = {
  sx: PropTypes.object,
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'info', 'success', 'warning', 'error'])
};
