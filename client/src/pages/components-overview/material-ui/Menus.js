import { useState } from 'react';
// material
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  List,
  Stack,
  Menu,
  Button,
  ListItem,
  MenuItem,
  Container,
  IconButton,
  ListItemText
} from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const OPTIONS = [
  'Show some love to Material-UI',
  'Show all notification content',
  'Hide sensitive notification content',
  'Hide all notification content'
];

const OPTIONS_MAXHEIGHT = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel'
];

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function MenusComponent() {
  const [isOpen, setOpen] = useState(null);
  const [isOpenList, setOpenList] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [isOpenMaxHeight, setOpenMaxHeight] = useState(null);

  const handleClick = (event) => {
    setOpenMaxHeight(event.currentTarget);
  };

  const handleClickListItem = (event) => {
    setOpenList(event.currentTarget);
  };

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpenList(null);
  };

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMaxHeightClose = () => {
    setOpenMaxHeight(null);
  };

  return (
    <RootStyle title="Components: Menus | Minimal-UI">
      <Box
        sx={{
          pt: 6,
          pb: 1,
          mb: 10,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800')
        }}
      >
        <Container maxWidth="lg">
          <HeaderBreadcrumbs
            heading="Menus"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Menus' }]}
            moreLink="https://next.material-ui.com/components/menus"
          />
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
          <Block title="Simple" sx={style}>
            <Button variant="outlined" onClick={handleOpen}>
              Open Menu
            </Button>
            <Menu keepMounted id="simple-menu" anchorEl={isOpen} onClose={handleClose} open={Boolean(isOpen)}>
              {['Profile', 'My account', 'Logout'].map((option) => (
                <MenuItem key={option} onClick={handleClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Block>

          <Block title="Selected" sx={style}>
            <List component="nav" aria-label="Device settings">
              <ListItem
                button
                aria-haspopup="true"
                aria-controls="lock-menu"
                aria-label="when device is locked"
                onClick={handleClickListItem}
              >
                <ListItemText primary="When device is locked" secondary={OPTIONS[selectedIndex]} />
              </ListItem>
            </List>
            <Menu keepMounted id="lock-menu" anchorEl={isOpenList} onClose={handleClose} open={Boolean(isOpenList)}>
              {OPTIONS.map((option, index) => (
                <MenuItem
                  key={option}
                  disabled={index === 0}
                  selected={index === selectedIndex}
                  onClick={(event) => handleMenuItemClick(event, index)}
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Block>

          <Block title="Max height" sx={style}>
            <IconButton aria-label="more" aria-controls="long-menu" aria-haspopup="true" onClick={handleClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu
              keepMounted
              id="long-menu"
              anchorEl={isOpenMaxHeight}
              onClose={handleMaxHeightClose}
              open={Boolean(isOpenMaxHeight)}
              PaperProps={{
                style: {
                  maxHeight: 48 * 4.5,
                  width: '20ch'
                }
              }}
            >
              {OPTIONS_MAXHEIGHT.map((option) => (
                <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleMaxHeightClose}>
                  {option}
                </MenuItem>
              ))}
            </Menu>
          </Block>
        </Stack>
      </Container>
    </RootStyle>
  );
}
