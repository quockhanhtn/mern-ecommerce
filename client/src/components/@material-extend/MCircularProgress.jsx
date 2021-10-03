import PropTypes from 'prop-types';
// material
import { useTheme } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function MCircularProgress({ color = 'primary', sx, ...other }) {
  const theme = useTheme();

  if (color === 'inherit' || color === 'primary' || color === 'secondary') {
    return <CircularProgress color={color} sx={sx} {...other} />;
  }

  return (
    <CircularProgress
      sx={{
        color: theme.palette[color].main,
        ...sx
      }}
      {...other}
    />
  );
}

MCircularProgress.propTypes = {
  sx: PropTypes.object,
  color: PropTypes.oneOf(['inherit', 'primary', 'secondary', 'info', 'success', 'warning', 'error'])
};
