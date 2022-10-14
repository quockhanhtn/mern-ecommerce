import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import GuestGuard from '~/guards/GuestGuard';
import AuthGuard from '~/guards/AuthGuard';
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
// import RoleBasedGuard from '../guards/RoleBasedGuard';
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
    // auth routes
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> }
        // { path: 'verify', element: <VerifyCode /> }
      ]
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: '', element: <Navigate to="/dashboard/statics" replace /> },
        { path: 'orders', element: <PageOrderList /> },
        { path: 'statics', element: <PageStatistic /> },
        {
          path: 'app',
          children: [
            {
              path: '',
              element: <Navigate to="/dashboard/app/categories" replace />
            },
            { path: 'categories', element: <PageCategoryList /> },
            { path: 'brands', element: <PageBrandList /> },
            { path: 'discounts', element: <PageDiscountList /> },
            {
              path: 'products',
              children: [
                { path: '', element: <Navigate to="/dashboard/products/list" replace /> },
                { path: 'list', element: <PageProductList /> },
                { path: 'create', element: <PageProduct /> },
                { path: ':id/edit', element: <PageProductEdit /> }
              ]
            },
            {
              path: 'users',
              children: [
                { path: '', element: <Navigate to="/dashboard/users/user_list" replace /> },
                { path: 'customer/list', element: <PageCustomerList /> },
                { path: 'staff/list', element: <PageStaffList /> }
              ]
            },
            { path: 'setting', element: <PageAccountSetting /> },
            { path: 'profile', element: <PageProfileUser /> }
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
      children: [
        { path: '/', element: <HomePage /> },
        {
          path: '/account',
          element: (
            <AuthGuard>
              <AccountPage />
            </AuthGuard>
          )
        },
        { path: '/q', element: <ProductListPage /> },
        { path: '/related/:slug', element: <ProductRelatedPage /> },
        { path: '/:category/:slug', element: <ProductDetailPage /> },
        { path: '/cart', element: <CartPage /> },
        { path: '/order/:orderId', element: <ViewOrderPage /> },
        { path: '/order-history', element: <OrderHistoryPage /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
// const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));

// Dashboard
const PageStatistic = Loadable(lazy(() => import('../pages/dashboard/statistic/PageStatistic')));
// Orders
const PageOrderList = Loadable(lazy(() => import('../pages/dashboard/orders/PageOrderList')));
// Category
const PageCategoryList = Loadable(lazy(() => import('../pages/dashboard/categories/PageCategoryList')));
// Brand
const PageBrandList = Loadable(lazy(() => import('../pages/dashboard/brands/PageBrandList')));
// Discount
const PageDiscountList = Loadable(lazy(() => import('../pages/dashboard/discounts/PageDiscountList')));
// Product
const PageProductList = Loadable(lazy(() => import('../pages/dashboard/products/PageProductList')));
const PageProduct = Loadable(lazy(() => import('../pages/dashboard/products/PageProduct')));
const PageProductEdit = Loadable(lazy(() => import('../pages/dashboard/products/PageProductEdit')));
// User
const PageCustomerList = Loadable(lazy(() => import('../pages/dashboard/users/PageCustomerList')));
const PageStaffList = Loadable(lazy(() => import('../pages/dashboard/users/PageStaffList')));
const PageAccountSetting = Loadable(lazy(() => import('../pages/dashboard/users/PageAccountSetting')));
const PageProfileUser = Loadable(lazy(() => import('../pages/dashboard/users/PageProfileUser')));
// General
const NotFound = Loadable(lazy(() => import('../pages/error/Page404')));

// Main
const HomePage = Loadable(lazy(() => import('../pages/main/HomePage')));
const AccountPage = Loadable(lazy(() => import('../pages/main/AccountPage')));
const ProductListPage = Loadable(lazy(() => import('../pages/main/ProductListPage')));
const ProductDetailPage = Loadable(lazy(() => import('../pages/main/ProductDetailPage')));
const ProductRelatedPage = Loadable(lazy(() => import('../pages/main/ProductRelatedPage')));
const CartPage = Loadable(lazy(() => import('../pages/main/CartPage')));
const ViewOrderPage = Loadable(lazy(() => import('../pages/main/ViewOrderPage')));
const OrderHistoryPage = Loadable(lazy(() => import('../pages/main/OrderHistoryPage')));
