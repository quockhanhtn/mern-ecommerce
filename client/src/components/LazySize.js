import PropTypes from 'prop-types';
// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

LazySize.propTypes = {
  component: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  alt: PropTypes.string,
  src: PropTypes.string.isRequired,
  size: PropTypes.string,
  disabledBlur: PropTypes.bool,
  hidePlaceholder: PropTypes.bool,
  sx: PropTypes.object
};

export default function LazySize({
  component = 'img',
  alt,
  src,
  size,
  disabledBlur = false,
  hidePlaceholder = false,
  sx,
  ...other
}) {
  const lazyClass = disabledBlur ? 'lazyload' : 'lazyload blur-up';
  const placeholder = hidePlaceholder ? '' : '/static/placeholder.svg';
  const isAuto = Boolean(size);

  return (
    <>
      {isAuto ? (
        <Box
          component={component}
          alt={alt}
          data-sizes="auto"
          src={placeholder}
          data-src={src}
          data-srcset={size}
          className={lazyClass}
          sx={{ objectFit: 'cover', ...sx }}
          {...other}
        />
      ) : (
        <Box
          component={component}
          alt={alt}
          src={placeholder}
          data-src={src}
          className={lazyClass}
          sx={{ objectFit: 'cover', ...sx }}
          {...other}
        />
      )}
    </>
  );
}
