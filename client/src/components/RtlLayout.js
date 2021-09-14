import PropTypes from 'prop-types';
import { useEffect } from 'react';
// rtl
import rtl from 'jss-rtl';
import { create } from 'jss';
import rtlPlugin from 'stylis-plugin-rtl';
// emotion
import createCache from '@emotion/cache';
import { CacheProvider } from '@emotion/react';
// material
import { StylesProvider, jssPreset } from '@material-ui/styles';
import { useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

RtlLayout.propTypes = {
  children: PropTypes.node
};

export default function RtlLayout({ children }) {
  const theme = useTheme();

  const jss = create({
    plugins: [...jssPreset().plugins, rtl()]
  });

  useEffect(() => {
    document.dir = theme.direction;
  }, [theme.direction]);

  const cache = createCache({
    key: theme.direction === 'rtl' ? 'rtl' : 'css',
    prepend: true,
    stylisPlugins: theme.direction === 'rtl' ? [rtlPlugin] : []
  });

  cache.compat = true;

  return (
    <CacheProvider value={cache}>
      <StylesProvider jss={jss}>{children}</StylesProvider>
    </CacheProvider>
  );
}
