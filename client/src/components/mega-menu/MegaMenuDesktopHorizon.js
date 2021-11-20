import PropTypes from 'prop-types';
import { useState } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';
// material
import { Box, Link, Paper, Typography, Divider, Stack } from '@material-ui/core';
//
import MenuHotProducts from './MenuHotProducts';
import MegaMenuCarousel from './MegaMenuCarousel';

// ----------------------------------------------------------------------

const CONTENT_HEIGHT = 400;
const ITEM_SPACING = 4;
const ITEM_HEIGHT = 64;
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
    color: 'primary.main'
  };

  return (
    <Link
      to={path}
      component={RouterLink}
      underline="none"
      color="inherit"
      variant="subtitle2"
      sx={{
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        textTransform: 'capitalize',
        height: ITEM_HEIGHT,
        lineHeight: `${ITEM_HEIGHT}px`,
        transition: (theme) => theme.transitions.create('all'),
        '&:hover': activeStyle,
        ...(open && activeStyle)
      }}
      {...other}
    >
      {title}
      {hasSub && <Box component={Icon} icon={chevronDownFill} sx={{ ml: 1, width: 20, height: 20 }} />}
    </Link>
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
        <ParentItem onMouseEnter={handleOpen} onMouseLeave={handleClose} path={path} title={title} open={open} hasSub />

        {open && (
          <Paper
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            sx={{
              p: 3,
              width: '100%',
              position: 'absolute',
              borderRadius: 2,
              top: ITEM_HEIGHT,
              left: -ITEM_SPACING * 8,
              zIndex: (theme) => theme.zIndex.modal,
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
              <MegaMenuCarousel products={products} numberShow={8} />
              <Divider />

              <MenuHotProducts tags={tags} />
            </Stack>
          </Paper>
        )}
      </>
    );
  }

  return <ParentItem path={path} title={title} />;
}

MegaMenuDesktopHorizon.propTypes = {
  navConfig: PropTypes.array
};

export default function MegaMenuDesktopHorizon({ navConfig, ...other }) {
  return (
    <Stack direction="row" spacing={ITEM_SPACING} {...other}>
      {navConfig.map((parent) => (
        <MegaMenuItem key={parent.title} parent={parent} />
      ))}
    </Stack>
  );
}
