import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Avatar, Box, Link, Drawer, Typography } from '@material-ui/core';
// hook
import useLocales from '../../hooks/useLocales';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import SvgIconStyle from '../../components/SvgIconStyle';
import { MHidden } from '../../components/@material-extend';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 280;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

const AccountStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 2.5),
  borderRadius: theme.shape.borderRadiusSm,
  backgroundColor: theme.palette.grey[500_12]
}));

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  categories: getIcon('ic_categories')
};

// ----------------------------------------------------------------------

DashboardSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DashboardSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();
  const { t } = useLocales();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const sidebarConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
      // subheader: 'general',
      items: [
        { title: t('dashboard.categories.title'), path: PATH_DASHBOARD.general.pageOne, icon: ICONS.categories },
        { title: 'Two', path: PATH_DASHBOARD.general.pageTwo, icon: ICONS.ecommerce },
        { title: 'Three', path: PATH_DASHBOARD.general.pageThree, icon: ICONS.analytics }
      ]
    },

    // MANAGEMENT
    // ----------------------------------------------------------------------
    {
      subheader: 'management',
      items: [
        {
          title: t('dashboard.categories.title'),
          path: PATH_DASHBOARD.app.categories,
          icon: ICONS.categories,
          children: [
            { title: 'Four', path: PATH_DASHBOARD.app.pageFour },
            { title: 'Five', path: PATH_DASHBOARD.app.pageFive },
            { title: 'Six', path: PATH_DASHBOARD.app.pageSix }
          ]
        },
        {
          title: 'user',
          path: PATH_DASHBOARD.app.root,
          icon: ICONS.user,
          children: [
            { title: 'Four', path: PATH_DASHBOARD.app.pageFour },
            { title: 'Five', path: PATH_DASHBOARD.app.pageFive },
            { title: 'Six', path: PATH_DASHBOARD.app.pageSix }
          ]
        }
      ]
    }
  ];

  const renderContent = (
    <Scrollbar
      sx={{ height: '100%', '& .simplebar-content': { height: '100%', display: 'flex', flexDirection: 'column' } }}
    >
      <Box sx={{ px: 2.5, py: 3 }}>
        <Box component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
          <Logo />
        </Box>
      </Box>

      <Box sx={{ mb: 2, mx: 2.5 }}>
        <Link underline="none" component={RouterLink} to="#">
          <AccountStyle>
            <Avatar alt="My Avatar" src="/static/mock-images/avatars/avatar_default.jpg" />
            <Box sx={{ ml: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'text.primary' }}>
                displayName
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                role
              </Typography>
            </Box>
          </AccountStyle>
        </Link>
      </Box>

      <NavSection navConfig={sidebarConfig} />
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="lgUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="lgDown">
        <Drawer
          open
          variant="persistent"
          PaperProps={{
            sx: { width: DRAWER_WIDTH, bgcolor: 'background.default' }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
