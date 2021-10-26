import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // Dashboard Routes
    {
      path: 'dashboard',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/statics" replace /> },
        { path: 'statics', element: <PageOne /> },
        { path: 'config', element: <PageTwo /> },
        {
          path: 'app',
          children: [
            {
              path: '/',
              element: <Navigate to="/dashboard/app/categories" replace />
            },
            { path: 'categories', element: <PageCategoryList /> },
            { path: 'brands', element: <PageBrandList /> },
            { path: 'discounts', element: <PageDiscountList /> },
            {
              path: 'products',
              children: [
                { path: '/', element: <Navigate to="/dashboard/products/list" replace /> },
                { path: 'list', element: <PageOne /> },
                { path: 'create', element: <PageProduct /> }
              ]
            }
          ]
        }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [{ path: '/', element: <LandingPage /> }]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Dashboard
const PageOne = Loadable(lazy(() => import('../pages/PageOne')));
const PageTwo = Loadable(lazy(() => import('../pages/PageTwo')));
const PageCategoryList = Loadable(lazy(() => import('../pages/dashboard/categories/PageCategoryList')));
const PageBrandList = Loadable(lazy(() => import('../pages/dashboard/brands/PageBrandList')));
const PageDiscountList = Loadable(lazy(() => import('../pages/dashboard/discounts/PageDiscountList')));
const PageProductList = Loadable(lazy(() => import('../pages/dashboard/products/PageProductList')));
const PageProduct = Loadable(lazy(() => import('../pages/dashboard/products/PageProduct')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

// Main
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));
