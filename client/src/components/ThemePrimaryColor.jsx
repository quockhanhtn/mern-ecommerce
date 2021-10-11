import PropTypes from 'prop-types';
import { useMemo } from 'react';
// material
import { alpha, ThemeProvider, createTheme, useTheme } from '@material-ui/core/styles';
// hooks
import useSettings from '../hooks/useSettings';
//
import componentsOverride from '../theme/overrides';

// ----------------------------------------------------------------------

ThemePrimaryColor.propTypes = {
  children: PropTypes.node
};

export default function ThemePrimaryColor({ children }) {
  const outerTheme = useTheme();
  const { setColor } = useSettings();

  const themeOptions = useMemo(
    () => ({
      ...outerTheme,
      palette: {
        ...outerTheme.palette,
        primary: setColor
      },
      customShadows: {
        ...outerTheme.customShadows,
        primary: `0 8px 16px 0 ${alpha(setColor.main, 0.24)}`
      }
    }),
    [setColor, outerTheme]
  );

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
