// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import ThemePrimaryColor from './components/ThemePrimaryColor';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeConfig>
      <ThemePrimaryColor>
        <RtlLayout>
          <Settings />
          <ScrollToTop />
          <Router />
        </RtlLayout>
      </ThemePrimaryColor>
    </ThemeConfig>
  );
}
