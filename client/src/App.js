import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import SimpleBarReact from 'simplebar-react';
// routes
import Router from './routes';
// theme
import ThemeConfig from './theme';
// hooks
import { useAuth } from './hooks';
// components
import Settings from './components/settings';
import RtlLayout from './components/RtlLayout';
import ScrollToTop from './components/ScrollToTop';
import LoadingScreen from './components/LoadingScreen';
import ThemePrimaryColor from './components/ThemePrimaryColor';
import NotistackProvider from './components/NotistackProvider';

import { syncCart } from './redux/slices/cartSlice';

// ----------------------------------------------------------------------

export default function App() {
  const dispatch = useDispatch();
  const { isInitialized, isAuthenticated } = useAuth();

  useEffect(() => {
    if (isInitialized && isAuthenticated) {
      dispatch(syncCart(isAuthenticated));
    }
  }, [isInitialized, isAuthenticated]);

  return (
    <SimpleBarReact style={{ maxHeight: '100vh' }}>
      <ThemeConfig>
        <ThemePrimaryColor>
          <RtlLayout>
            <NotistackProvider>
              <Settings />
              <ScrollToTop />
              {isInitialized ? <Router /> : <LoadingScreen />}
            </NotistackProvider>
          </RtlLayout>
        </ThemePrimaryColor>
      </ThemeConfig>
    </SimpleBarReact>
  );
}
