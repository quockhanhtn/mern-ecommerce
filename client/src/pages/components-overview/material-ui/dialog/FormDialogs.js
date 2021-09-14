import { useState } from 'react';
// material
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText
} from '@material-ui/core';
//
import { MButton } from '../../../../components/@material-extend';

// ----------------------------------------------------------------------

export default function FormDialogs() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MButton variant="outlined" color="warning" onClick={handleClickOpen}>
        Form Dialogs
      </MButton>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
          <TextField autoFocus fullWidth type="email" margin="dense" variant="outlined" label="Email Address" />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleClose} variant="contained">
            Subscribe
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
