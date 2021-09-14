import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useLocation, Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Drawer } from '@material-ui/core';
// components
import Logo from '../../components/Logo';
import Scrollbar from '../../components/Scrollbar';
import NavSection from '../../components/NavSection';
import { MHidden } from '../../components/@material-extend';
//
import sidebarConfig from './SidebarConfig';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 260;

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    flexShrink: 0,
    width: DRAWER_WIDTH
  }
}));

// ----------------------------------------------------------------------

DocsSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onCloseSidebar: PropTypes.func
};

export default function DocsSidebar({ isOpenSidebar, onCloseSidebar }) {
  const { pathname } = useLocation();

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar>
      <Box sx={{ p: 1, pb: 5 }}>
        <MHidden width="mdUp">
          <Box sx={{ px: 2, py: 3 }}>
            <RouterLink to="/">
              <Logo />
            </RouterLink>
          </Box>
        </MHidden>

        <NavSection
          navConfig={sidebarConfig}
          sx={{
            '& .MuiListSubheader-root': { pl: 2 },
            '& .MuiListItem-root': {
              pl: 2,
              height: 44,
              borderRadius: 1,
              '&:before': { display: 'none' }
            },
            '& .MuiListItemIcon-root': { display: 'none' }
          }}
        />
      </Box>
    </Scrollbar>
  );

  return (
    <RootStyle>
      <MHidden width="mdUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          PaperProps={{
            sx: { width: DRAWER_WIDTH, bgcolor: 'background.default' }
          }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="mdDown">
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: { width: DRAWER_WIDTH, bgcolor: 'background.default' }
          }}
        >
          <Box sx={{ pt: 10, height: '100%' }}>{renderContent}</Box>
        </Drawer>
      </MHidden>
    </RootStyle>
  );
}
