import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { NavLink as RouterLink } from 'react-router-dom';
import chevronRightFill from '@iconify/icons-eva/chevron-right-fill';
// material
import { alpha } from '@material-ui/core/styles';
import { Box, Link, List, Paper, ListItem, Typography, Divider, Stack } from '@material-ui/core';
//
import MenuHotProducts from './MenuHotProducts';
import MegaMenuCarousel from './MegaMenuCarousel';

// ----------------------------------------------------------------------

const MENU_WIDTH = 280;
const MENU_PAPER_WIDTH = 800;
const CONTENT_HEIGHT = 400;
const ITEM_HEIGHT = 40;
const ITEM_ON_ROW = {
  width: 'calc((100%/3) - 16px)',
  '&:nth-child(3n+1)': { order: 1 },
  '&:nth-child(3n+2)': { order: 2 },
  '&:nth-child(3n)': { order: 3 }
};

// ----------------------------------------------------------------------

ParentItem.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
  open: PropTypes.bool,
  hasSub: PropTypes.bool
};

function ParentItem({ path, title, open, hasSub, ...other }) {
  const activeStyle = {
    color: 'primary.main',
    bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.hoverOpacity)
  };

  return (
    <ListItem
      disableGutters
      to={path}
      component={RouterLink}
      sx={{
        pl: 2.5,
        pr: 1.5,
        height: ITEM_HEIGHT,
        cursor: 'pointer',
        color: 'text.primary',
        typography: 'subtitle2',
        textTransform: 'capitalize',
        justifyContent: 'space-between',
        transition: (theme) => theme.transitions.create('all'),
        '&:hover': activeStyle,
        ...(open && activeStyle)
      }}
      {...other}
    >
      {title}
      {hasSub && <Box component={Icon} icon={chevronRightFill} sx={{ ml: 1, width: 20, height: 20 }} />}
    </ListItem>
  );
}

MegaMenuItem.propTypes = {
  parent: PropTypes.object
};

function MegaMenuItem({ parent }) {
  const { title, path, more, products, tags, children } = parent;
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (children) {
    return (
      <>
        <ParentItem onMouseEnter={handleOpen} onMouseLeave={handleClose} path={path} title={title} open={open} hasSub>
          {title}
        </ParentItem>

        {open && (
          <Paper
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            sx={{
              p: 3,
              top: -62,
              left: MENU_WIDTH,
              width: MENU_PAPER_WIDTH,
              borderRadius: 2,
              position: 'absolute',
              boxShadow: (theme) => theme.customShadows.z20
            }}
          >
            <Stack flexWrap="wrap" alignContent="space-between" height={CONTENT_HEIGHT}>
              {children.map((list) => {
                const { subheader, items } = list;

                return (
                  <Stack key={subheader} spacing={1.25} sx={{ mb: 2.5, ...ITEM_ON_ROW }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightBold' }} noWrap>
                      {subheader}
                    </Typography>
                    {items.map((link) => (
                      <Link
                        noWrap
                        key={link.title}
                        component={RouterLink}
                        to={link.path}
                        underline="none"
                        sx={{
                          typography: 'body2',
                          color: 'text.primary',
                          fontSize: 13,
                          transition: (theme) => theme.transitions.create('all'),
                          '&:hover': { color: 'primary.main' }
                        }}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </Stack>
                );
              })}
            </Stack>

            <Stack spacing={3}>
              <Link
                to={more.path}
                component={RouterLink}
                sx={{ typography: 'body2', display: 'inline-flex', fontSize: 13 }}
              >
                {more.title}
              </Link>

              <Divider />
              <MegaMenuCarousel products={products} numberShow={6} sx={{ '& .controlsArrows': { mt: 5 } }} />
              <Divider />

              <MenuHotProducts tags={tags} />
            </Stack>
          </Paper>
        )}
      </>
    );
  }

  return (
    <ParentItem path={path} title={title}>
      {title}
    </ParentItem>
  );
}

MegaMenuDesktopVertical.propTypes = {
  navConfig: PropTypes.array
};

export default function MegaMenuDesktopVertical({ navConfig, ...other }) {
  return (
    <List disablePadding {...other}>
      {navConfig.map((parent) => (
        <MegaMenuItem key={parent.title} parent={parent} />
      ))}
    </List>
  );
}
