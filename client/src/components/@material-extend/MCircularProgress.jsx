import PropTypes from 'prop-types';
// material
import { useTheme } from '@mui/material/styles';
import { CircularProgress } from '@mui/material';

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
