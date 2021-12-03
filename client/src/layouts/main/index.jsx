import { useEffect } from 'react';
import { Link as ScrollLink } from 'react-scroll';
import { Outlet } from 'react-router-dom';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// material
import { Box, Link, Container, Typography } from '@material-ui/core';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllCategories } from '../../actions/categories';
import { getAllBrands } from '../../actions/brands';
import { getAllDiscounts } from '../../actions/discounts';
// components
import LoadingScreen from '../../components/LoadingScreen';
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

  const { listSimple: categoryList, isLoading: isLoadingCategory } = useSelector((state) => state.category);

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

  // if (isLoadingCategory || isLoadingBrand) {
  //   console.log('isLoadingCategory', isLoadingCategory);
  //   console.log('isLoadingBrand', isLoadingBrand);
  //   return <LoadingScreen />;
  // }

  // if (hasErrorCategory || hasErrorBrand) {
  //   return <LoadingScreen />;
  // }

  return (
    <RootStyle>
      <MainNavbar categoryList={navBarItems} />
      <MainStyle>
        <Outlet />
        <MainFooter />
      </MainStyle>
    </RootStyle>
  );
}
