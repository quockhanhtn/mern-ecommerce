import { forwardRef, useState } from 'react';
// material
import CloseIcon from '@material-ui/icons/Close';
import {
  List,
  Slide,
  Button,
  Dialog,
  AppBar,
  Toolbar,
  Divider,
  ListItem,
  IconButton,
  Typography,
  ListItemText
} from '@material-ui/core';
//
import { MButton } from '../../../../components/@material-extend';

// ----------------------------------------------------------------------

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function FullScreenDialogs() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <MButton variant="outlined" color="error" onClick={handleClickOpen}>
        Full Screen Dialogs
      </MButton>

      <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
        <AppBar position="relative">
          <Toolbar>
            <IconButton color="inherit" edge="start" onClick={handleClose}>
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" sx={{ flex: 1, ml: 2 }}>
              Sound
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <ListItemText primary="Phone ringtone" secondary="Titania" />
          </ListItem>

          <Divider />

          <ListItem button>
            <ListItemText primary="Default notification ringtone" secondary="Tethys" />
          </ListItem>
        </List>
      </Dialog>
    </>
  );
}
