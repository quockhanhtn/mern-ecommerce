import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useLocation } from 'react-router-dom';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { Box, List, Drawer, Button, Divider } from '@material-ui/core';
// redux
import { useSelector } from '../../../redux/store';
//
import Scrollbar from '../../Scrollbar';
import { MHidden } from '../../@material-extend';
import MailSidebarItem from './MailSidebarItem';

// ----------------------------------------------------------------------

MailSidebar.propTypes = {
  isOpenSidebar: PropTypes.bool,
  onOpenCompose: PropTypes.func,
  onCloseSidebar: PropTypes.func
};

export default function MailSidebar({ isOpenSidebar, onOpenCompose, onCloseSidebar }) {
  const { pathname } = useLocation();
  const { labels } = useSelector((state) => state.mail);

  useEffect(() => {
    if (isOpenSidebar) {
      onCloseSidebar();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpenCompose = () => {
    onCloseSidebar();
    onOpenCompose();
  };

  const renderContent = (
    <Scrollbar>
      <Box sx={{ p: 3 }}>
        <Button fullWidth variant="contained" startIcon={<Icon icon={plusFill} />} onClick={handleOpenCompose}>
          Compose
        </Button>
      </Box>

      <Divider />

      <List disablePadding>
        {labels.map((label) => (
          <MailSidebarItem key={label.id} label={label} />
        ))}
      </List>
    </Scrollbar>
  );

  return (
    <>
      <MHidden width="mdUp">
        <Drawer
          open={isOpenSidebar}
          onClose={onCloseSidebar}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { width: 280 } }}
        >
          {renderContent}
        </Drawer>
      </MHidden>

      <MHidden width="mdDown">
        <Drawer variant="permanent" PaperProps={{ sx: { width: 280, position: 'relative' } }}>
          {renderContent}
        </Drawer>
      </MHidden>
    </>
  );
}
