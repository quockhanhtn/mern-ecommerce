import { forwardRef, useState } from 'react';
// material
import { Slide, Dialog, Button, DialogTitle, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';
//
import { MButton } from '../../../../components/@material-extend';

// ----------------------------------------------------------------------

const Transition = forwardRef((props, ref) => <Slide direction="up" ref={ref} {...props} />);

export default function TransitionsDialogs() {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MButton variant="outlined" color="success" onClick={handleClickOpen}>
        Transitions Dialogs
      </MButton>

      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">Use Google's location service?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Let Google help apps determine location. This means sending anonymous location data to Google, even when no
            apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={handleClose}>
            Disagree
          </Button>
          <Button variant="contained" onClick={handleClose}>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
