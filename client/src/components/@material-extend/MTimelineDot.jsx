import PropTypes from 'prop-types';
// material
import { useTheme } from '@material-ui/core/styles';
import { TimelineDot } from '@material-ui/lab';

// ----------------------------------------------------------------------

export default function MTimelineDot({ color = 'grey', variant = 'filled', sx, ...other }) {
  const theme = useTheme();

  if (color === 'grey' || color === 'inherit' || color === 'primary' || color === 'secondary') {
    return <TimelineDot color={color} variant={variant} sx={sx} {...other} />;
  }

  return (
    <TimelineDot
      variant={variant}
      sx={{
        ...(variant === 'filled' && {
          color: theme.palette[color].contrastText,
          backgroundColor: theme.palette[color].main
        }),
        ...(variant === 'outlined' && {
          borderColor: theme.palette[color].main
        }),
        ...sx
      }}
      {...other}
    />
  );
}

MTimelineDot.propTypes = {
  sx: PropTypes.object,
  color: PropTypes.oneOf(['grey', 'inherit', 'primary', 'secondary', 'info', 'success', 'warning', 'error']),
  variant: PropTypes.oneOfType([PropTypes.oneOf(['filled', 'outlined']), PropTypes.string])
};
