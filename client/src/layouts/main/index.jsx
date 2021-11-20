import { Link as ScrollLink } from 'react-scroll';
import { useLocation, Outlet } from 'react-router-dom';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// material
import { Box, Link, Container, Typography } from '@material-ui/core';
// components
import Logo from '../../components/Logo';
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
    paddingTop: APP_BAR_DESKTOP + 24,
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(2)
  }
}));

// ----------------------------------------------------------------------

export default function MainLayout() {
  // const { pathname } = useLocation();
  // const isHome = pathname === '/';

  return (
    <RootStyle>
      <MainNavbar />
      <MainStyle>
        <Outlet />
        <MainFooter />
        {/* {!isHome ? (
          <MainFooter />
        ) : (
          <Box
            sx={{
              py: 5,
              textAlign: 'center',
              position: 'relative',
              bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800')
            }}
          >
            <Container maxWidth="lg">
              <ScrollLink to="move_top" spy smooth>
                <Logo sx={{ mb: 1, mx: 'auto', cursor: 'pointer' }} />
              </ScrollLink>

              <Typography variant="caption" component="p">
                &copy; 2021 HK Mobile. All rights reserved
                <br /> Temple made by &nbsp;
                <Link href="https://minimals.cc/">minimals.cc</Link>
              </Typography>
            </Container>
          </Box>
        )} */}
      </MainStyle>
    </RootStyle>
  );
}
