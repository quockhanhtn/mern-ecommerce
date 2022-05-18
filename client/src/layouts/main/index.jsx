import { useEffect } from 'react';
import { useLocation, Outlet } from 'react-router-dom';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// material
// hooks
import { useGoogleOneTapLogin } from 'react-google-one-tap-login';
import { useSelector, useDispatch } from 'react-redux';
import useAuth from '../../hooks/useAuth';
// actions
import { getAllCategories } from '../../redux/slices/categorySlice';
import { getAllBrands } from '../../redux/slices/brandSlice';
import { getAllDiscounts } from '../../redux/actions/discounts';
//
import MainNavbar from './MainNavbar';
import MainFooter from './MainFooter';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 88;

const RootStyle = styled('div')({
  display: 'flex',
  minHeight: '100%',
  overflow: 'hidden'
});

const MainStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  overflow: 'auto',
  minHeight: '100%',
  paddingTop: APP_BAR_MOBILE + 24,
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('lg')]: {
    paddingTop: APP_BAR_DESKTOP + 24
  }
}));

// ----------------------------------------------------------------------

export default function MainLayout() {
  const dispatch = useDispatch();
  const { user, googleOAuth } = useAuth();

  const { pathname } = useLocation();
  const isCartPage = pathname.startsWith('/cart');

  const { listSimple: categoryList } = useSelector((state) => state.category);
  const { itemsCount } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getAllCategories(true));
    dispatch(getAllBrands(true));
    dispatch(getAllDiscounts(true));
  }, [dispatch]);

  const navBarItems = categoryList.map((item) => ({
    title: item.name,
    path: `/q?c=${item.slug}`,
    image: item.image,
    _id: item._id
  }));

  useGoogleOneTapLogin({
    disabled: !!user,
    onSuccess: (user) => console.log('Google One Tap Login success', user),
    onFailure: (error) => console.error('Google One Tap Login failure', error),
    googleAccountConfigs: {
      client_id: '235569401328-lib09fjkc10r16r6mbscljl4ulb5049q.apps.googleusercontent.com',
      callback: async (data) => {
        console.log('Google One Tap Login callback', data);
        const { credential } = data;
        await googleOAuth(credential);
      }
    }
  });

  return (
    <RootStyle>
      <MainNavbar categoryList={navBarItems} showCategoryMenu={!isCartPage} cartItemsCount={itemsCount} />
      <MainStyle>
        <Outlet />
        <MainFooter />
      </MainStyle>
    </RootStyle>
  );
}
