import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// icon
import { Icon } from '@iconify/react';
import cart24Regular from '@iconify/icons-fluent/cart-24-regular';
import history24Filled from '@iconify/icons-fluent/history-24-filled';
import baselineLocationOn from '@iconify/icons-ic/baseline-location-on';
import roundVpnKey from '@iconify/icons-ic/round-vpn-key';
import roundReceipt from '@iconify/icons-ic/round-receipt';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import baselineSettings from '@iconify/icons-ic/baseline-settings';
// material
import { styled } from '@mui/material/styles';
import { Box, IconButton, AppBar, Toolbar, Container, Stack } from '@mui/material';
// hooks
import { useOffSetTop, useLocales } from '../../hooks';
// components
import Logo from '../../components/Logo';
import LogoFull from '../../components/LogoFull';
import { MBadge, MButton, MHidden } from '../../components/@material-extend';
//
import MenuDesktop from './MenuDesktop';
import MenuMobile from './MenuMobile';
import SearchBar from './SearchBar';
import AccountPopover from '../common/AccountPopover';
import LanguagePopover from '../common/LanguagePopover';

// ----------------------------------------------------------------------

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
  paddingBottom: 2
  // [theme.breakpoints.up('md')]: {
  //   height: APP_BAR_DESKTOP,
  //   paddingBottom: 0
  // }
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

// ----------------------------------------------------------------------

NavbarItem.propTypes = {
  badgeContent: PropTypes.node,
  text: PropTypes.string,
  icon: PropTypes.object,
  color: PropTypes.string
};

function NavbarItem({ badgeContent, text, icon, color, ...other }) {
  if (badgeContent) {
    return (
      <MBadge badgeContent={badgeContent} color={color}>
        <NavbarItem badgeContent={null} text={text} icon={icon} color={color} {...other} />
      </MBadge>
    );
  }

  return (
    <>
      <MHidden width="mdUp">
        <IconButton color={color} {...other} size="large">
          <Icon icon={icon} />
        </IconButton>
      </MHidden>
      <MHidden width="mdDown">
        <MButton color={color} startIcon={<Icon icon={icon} />} {...other}>
          {text}
        </MButton>
      </MHidden>
    </>
  );
}

// ----------------------------------------------------------------------

MainNavbar.propTypes = {
  categoryList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      path: PropTypes.string,
      image: PropTypes.string,
      _id: PropTypes.string
    })
  ),
  showCategoryMenu: PropTypes.bool,
  cartItemsCount: PropTypes.number
};

function MainNavbar({ categoryList, showCategoryMenu, cartItemsCount }) {
  const { t } = useLocales();
  const isOffset = useOffSetTop(100);

  const accountMenus = [
    {
      label: t('account.info'),
      icon: roundAccountBox,
      linkTo: '/account?tab=info'
    },
    {
      label: t('account.order'),
      icon: roundReceipt,
      linkTo: '/account?tab=order'
    },
    {
      label: t('account.address-book'),
      icon: baselineLocationOn,
      linkTo: '/account?tab=address-book'
    },
    {
      label: t('account.change-password'),
      icon: roundVpnKey,
      linkTo: '/account?tab=change-password'
    },
    {
      label: t('account.config'),
      icon: baselineSettings,
      linkTo: '/account?tab=config',
      isDevelop: true
    }
  ];

  return (
    <AppBar color="default" sx={{ boxShadow: 0 }}>
      <ToolbarStyle
        disableGutters
        sx={(theme) => ({
          [theme.breakpoints.up('md')]: {
            height: APP_BAR_DESKTOP - (showCategoryMenu ? 0 : 44),
            paddingBottom: 0
          },
          ...(isOffset && { bgcolor: 'background.default', height: { md: APP_BAR_DESKTOP - 16 } })
        })}
      >
        <ContainerStyle maxWidth="lg" style={{ height: 64 }}>
          <RouterLink to="/">
            <MHidden width="mdUp">
              <Logo />
            </MHidden>
            <MHidden width="mdDown">
              <LogoFull />
            </MHidden>
          </RouterLink>

          <Box sx={{ mx: 3, flexGrow: 1 }}>
            <SearchBar />
          </Box>

          <Stack direction="row" spacing={{ xs: 0.5, sm: 5 }} sx={{ alignItems: 'center' }}>
            <MHidden width="mdUp">
              <MenuMobile isOffset={isOffset} isHome={false} navConfig={categoryList} />
            </MHidden>

            <LanguagePopover isShowTitle />

            <NavbarItem text={t('home.order-history')} icon={history24Filled} color="inherit" href="/order-history" />
            <NavbarItem
              badgeContent={cartItemsCount}
              text={t('home.cart')}
              icon={cart24Regular}
              color="primary"
              href="/cart"
            />

            <AccountPopover menuOptions={accountMenus} isShowTitle />
          </Stack>
        </ContainerStyle>

        {showCategoryMenu ? (
          <MHidden width="mdDown">
            <ColorBar>
              <ContainerStyle maxWidth="lg">
                <MenuDesktop isOffset={isOffset} isHome={false} navConfig={categoryList} />
              </ContainerStyle>
            </ColorBar>
          </MHidden>
        ) : (
          <ColorBar style={{ height: '2px' }} />
        )}
      </ToolbarStyle>

      {isOffset && <ToolbarShadowStyle />}
    </AppBar>
  );
}

export default MainNavbar;
