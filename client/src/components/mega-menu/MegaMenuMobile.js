import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState, useEffect } from 'react';
import listFill from '@iconify/icons-eva/list-fill';
import menu2Fill from '@iconify/icons-eva/menu-2-fill';
import { NavLink as RouterLink, useLocation } from 'react-router-dom';
import arrowIosBackFill from '@iconify/icons-eva/arrow-ios-back-fill';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
// material
import {
  Box,
  List,
  Link,
  Stack,
  Drawer,
  Button,
  Divider,
  ListItem,
  Typography,
  IconButton,
  ListItemText,
  ListItemIcon
} from '@material-ui/core';
//
import Logo from '../Logo';
import Scrollbar from '../Scrollbar';

// ----------------------------------------------------------------------

const ICON_SIZE = 22;
const PADDING = 2.5;
const DRAWER_WIDTH = 260;

// ----------------------------------------------------------------------

ParentItem.propTypes = {
  icon: PropTypes.node,
  title: PropTypes.string,
  hasSub: PropTypes.bool
};

function ParentItem({ icon, title, hasSub, ...other }) {
  return (
    <ListItem button sx={{ textTransform: 'capitalize', height: 44 }} {...other}>
      <ListItemIcon sx={{ width: 22, height: 22 }}>{icon}</ListItemIcon>
      <ListItemText primaryTypographyProps={{ typography: 'body2' }}>{title}</ListItemText>
      {hasSub && <Box component={Icon} icon={arrowIosForwardFill} />}
    </ListItem>
  );
}

SubMenu.propTypes = {
  parent: PropTypes.object,
  pathname: PropTypes.string
};

function SubMenu({ parent, pathname }) {
  const [open, setOpen] = useState(false);
  const { title, icon, path, children } = parent;

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (children) {
    return (
      <>
        <ParentItem title={title} icon={icon} onClick={handleOpen} hasSub />

        <Drawer
          open={open}
          onClose={handleClose}
          ModalProps={{ keepMounted: true }}
          PaperProps={{ sx: { width: DRAWER_WIDTH - 12 } }}
        >
          <Stack direction="row" alignItems="center" px={1} py={1.5}>
            <IconButton onClick={handleClose}>
              <Icon icon={arrowIosBackFill} width={20} height={20} />
            </IconButton>
            <Typography noWrap variant="subtitle1" sx={{ ml: 1, textTransform: 'capitalize' }}>
              {title}
            </Typography>
          </Stack>
          <Divider />

          <Scrollbar>
            <Stack spacing={5} py={3}>
              {children.map((list) => {
                const { subheader, items } = list;

                return (
                  <List key={subheader} disablePadding>
                    <Typography
                      component="div"
                      variant="overline"
                      sx={{ px: 2.5, mb: 1, color: 'text.secondary' }}
                      noWrap
                    >
                      {subheader}
                    </Typography>
                    {items.map((link) => (
                      <ListItem
                        button
                        disableGutters
                        key={link.title}
                        component={RouterLink}
                        to={link.path}
                        sx={{ px: 1.5 }}
                      >
                        <ListItemIcon
                          sx={{
                            mr: 0.5,
                            width: ICON_SIZE,
                            height: ICON_SIZE,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          <Box sx={{ width: 4, height: 4, bgcolor: 'currentColor', borderRadius: '50%' }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={link.title}
                          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
                        />
                      </ListItem>
                    ))}
                  </List>
                );
              })}
            </Stack>
          </Scrollbar>
        </Drawer>
      </>
    );
  }

  return <ParentItem component={RouterLink} title={title} icon={icon} to={path} />;
}

MegaMenuMobile.propTypes = {
  navConfig: PropTypes.array
};

export default function MegaMenuMobile({ navConfig }) {
  const { pathname } = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (openDrawer) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  return (
    <>
      <Button variant="contained" onClick={handleDrawerOpen} startIcon={<Icon icon={menu2Fill} />}>
        Menu Mobile
      </Button>

      <Drawer
        open={openDrawer}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { pb: 5, width: DRAWER_WIDTH } }}
      >
        <Scrollbar>
          <Link component={RouterLink} to="/" sx={{ display: 'inline-flex' }}>
            <Logo sx={{ mx: PADDING, my: 3 }} />
          </Link>
          <Typography variant="h6" sx={{ px: 2, mb: 2, display: 'flex', alignItems: 'center' }}>
            <Box component={Icon} icon={listFill} sx={{ mr: 1, width: 24, height: 24 }} /> Categories
          </Typography>

          {navConfig.map((parent) => (
            <SubMenu key={parent.title} parent={parent} pathname={pathname} />
          ))}
        </Scrollbar>
      </Drawer>
    </>
  );
}
