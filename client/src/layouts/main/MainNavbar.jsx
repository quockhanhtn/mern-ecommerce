import { useEffect } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
// icon
import { Icon } from '@iconify/react';
import cart24Regular from '@iconify/icons-fluent/cart-24-regular';
import history24Filled from '@iconify/icons-fluent/history-24-filled';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, IconButton, AppBar, Toolbar, Container } from '@material-ui/core';
// hooks
import useOffSetTop from '../../hooks/useOffSetTop';
import useLocales from '../../hooks/useLocales';
// components
import Logo from '../../components/Logo';
import { MBadge, MButton, MHidden } from '../../components/@material-extend';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import SearchBar from './SearchBar';
import useToCart from '../../hooks/useToCart';

// ----------------------------------------------------------------------
const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === 'development';
const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 110;

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  height: APP_BAR_MOBILE,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  transition: theme.transitions.create(['height', 'background-color'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  paddingBottom: 2,
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP,
    paddingBottom: 0
  }
}));

const ToolbarShadowStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  bottom: 0,
  height: 22,
  zIndex: -1,
  margin: 'auto',
  borderRadius: '50%',
  position: 'absolute',
  width: `calc(100% - 48px)`,
  boxShadow: theme.customShadows.z8
}));

const ColorBar = styled('div')(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  width: '100%'
}));

const ContainerStyle = styled(Container)(() => ({
  display: 'flex',
  height: 44,
  alignItems: 'center',
  justifyContent: 'space-between'
}));

const ButtonIcon = ({ text, icon, color, ...other }) => (
  <>
    <MHidden width="mdUp">
      <IconButton color={color} {...other}>
        <Icon icon={icon} />
      </IconButton>
    </MHidden>
    <MHidden width="mdDown">
      <MButton color={color} startIcon={<Icon icon={icon} />} sx={{ marginLeft: 2 }} {...other}>
        {text}
      </MButton>
    </MHidden>
  </>
);

// ----------------------------------------------------------------------

export default function MainNavbar({ categoryList }) {
  const { t } = useLocales();
  const isOffset = useOffSetTop(100);
  const { quantityInCart, getCart } = useToCart();

  useEffect(() => {
    getCart().then(() => {
      if (isDev) {
        console.log('Get cart successfully');
      }
    });
    // getStepPayment().then();
  }, []);

  return (
    <AppBar color="default" sx={{ boxShadow: 0 }}>
      <ToolbarStyle
        disableGutters
        sx={{ ...(isOffset && { bgcolor: 'background.default', height: { md: APP_BAR_DESKTOP - 16 } }) }}
      >
        <ContainerStyle maxWidth="lg">
          <RouterLink to="/">
            <Logo />
          </RouterLink>

          <SearchBar sx={{ marginLeft: 10 }} />
          <Box sx={{ flexGrow: 1 }} />

          <MHidden width="mdUp">
            <MenuMobile isOffset={isOffset} isHome={false} navConfig={categoryList} />
          </MHidden>

          <ButtonIcon text={t('home.order-history')} icon={history24Filled} color="inherit" href="/order-history" />
          <MBadge badgeContent={quantityInCart} color="primary">
            <ButtonIcon text={t('home.cart')} icon={cart24Regular} color="primary" href="/cart" />
          </MBadge>
        </ContainerStyle>
        <MHidden width="mdDown">
          <ColorBar>
            <ContainerStyle maxWidth="lg">
              <MenuDesktop isOffset={isOffset} isHome={false} navConfig={categoryList} />
            </ContainerStyle>
          </ColorBar>
        </MHidden>
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}
