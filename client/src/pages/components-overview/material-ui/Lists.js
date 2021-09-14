import { useState } from 'react';
// material
import SendIcon from '@material-ui/icons/Send';
import WorkIcon from '@material-ui/icons/Work';
import WifiIcon from '@material-ui/icons/Wifi';
import InboxIcon from '@material-ui/icons/Inbox';
import ImageIcon from '@material-ui/icons/Image';
import DraftsIcon from '@material-ui/icons/Drafts';
import CommentIcon from '@material-ui/icons/Comment';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import BluetoothIcon from '@material-ui/icons/Bluetooth';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Grid,
  List,
  Paper,
  Avatar,
  Switch,
  Divider,
  ListItem,
  Collapse,
  Checkbox,
  Container,
  IconButton,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  ListItemAvatar,
  ListItemSecondaryAction
} from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

const ListWrapperStyle = styled(Paper)(({ theme }) => ({
  width: '100%',
  border: `solid 1px ${theme.palette.divider}`
}));

// ----------------------------------------------------------------------

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

export default function ListsComponent() {
  const [open, setOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [checked, setChecked] = useState([0]);
  const [toggle, setToggle] = useState(['wifi']);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleCheck = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    setChecked(newChecked);
  };

  const handleToggle = (value) => () => {
    const currentIndex = toggle.indexOf(value);
    const newChecked = [...toggle];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setToggle(newChecked);
  };

  return (
    <RootStyle title="Components: Lists | Minimal-UI">
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
            heading="Lists"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Lists' }]}
            moreLink="https://next.material-ui.com/components/lists"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Block title="Simple">
              <ListWrapperStyle>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem button>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                  </ListItem>
                </List>

                <Divider />

                <List component="nav" aria-label="secondary mailbox folders">
                  <ListItem button>
                    <ListItemText primary="Trash" />
                  </ListItem>
                  <ListItemLink href="#simple-list">
                    <ListItemText primary="Spam" />
                  </ListItemLink>
                </List>
              </ListWrapperStyle>
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="Nested">
              <ListWrapperStyle>
                <List
                  component="nav"
                  aria-labelledby="nested-list-subheader"
                  subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                      Nested List Items
                    </ListSubheader>
                  }
                >
                  <ListItem button>
                    <ListItemIcon>
                      <SendIcon />
                    </ListItemIcon>
                    <ListItemText primary="Sent mail" />
                  </ListItem>
                  <ListItem button>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                  </ListItem>
                  <ListItem button onClick={handleClick}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </ListItem>
                  <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItem button>
                        <ListItemIcon>
                          <StarBorder />
                        </ListItemIcon>
                        <ListItemText primary="Starred" />
                      </ListItem>
                    </List>
                  </Collapse>
                </List>
              </ListWrapperStyle>
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="Folder">
              <ListWrapperStyle>
                <List>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <ImageIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <WorkIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Work" secondary="Jan 7, 2014" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <BeachAccessIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Vacation" secondary="July 20, 2014" />
                  </ListItem>
                </List>
              </ListWrapperStyle>
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="Selected">
              <ListWrapperStyle>
                <List component="nav" aria-label="main mailbox folders">
                  <ListItem button selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
                    <ListItemIcon>
                      <InboxIcon />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                  </ListItem>
                  <ListItem button selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
                    <ListItemIcon>
                      <DraftsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Drafts" />
                  </ListItem>
                </List>

                <Divider />

                <List component="nav" aria-label="secondary mailbox folder">
                  <ListItem button selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
                    <ListItemText primary="Trash" />
                  </ListItem>
                  <ListItem button selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
                    <ListItemText primary="Spam" />
                  </ListItem>
                </List>
              </ListWrapperStyle>
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="Controls">
              <ListWrapperStyle>
                <List>
                  {[0, 1, 2, 3].map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                      <ListItem key={value} role={undefined} dense button onClick={handleCheck(value)}>
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={checked.indexOf(value) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText id={labelId} primary={`Line item ${value + 1}`} />
                        <ListItemSecondaryAction>
                          <IconButton edge="end">
                            <CommentIcon />
                          </IconButton>
                        </ListItemSecondaryAction>
                      </ListItem>
                    );
                  })}
                </List>
              </ListWrapperStyle>
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="Switch">
              <ListWrapperStyle>
                <List subheader={<ListSubheader>Settings</ListSubheader>}>
                  <ListItem>
                    <ListItemIcon>
                      <WifiIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-wifi" primary="Wi-Fi" />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        onChange={handleToggle('wifi')}
                        checked={toggle.indexOf('wifi') !== -1}
                        inputProps={{
                          'aria-labelledby': 'switch-list-label-wifi'
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      <BluetoothIcon />
                    </ListItemIcon>
                    <ListItemText id="switch-list-label-bluetooth" primary="Bluetooth" />
                    <ListItemSecondaryAction>
                      <Switch
                        edge="end"
                        onChange={handleToggle('bluetooth')}
                        checked={toggle.indexOf('bluetooth') !== -1}
                        inputProps={{
                          'aria-labelledby': 'switch-list-label-bluetooth'
                        }}
                      />
                    </ListItemSecondaryAction>
                  </ListItem>
                </List>
              </ListWrapperStyle>
            </Block>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
