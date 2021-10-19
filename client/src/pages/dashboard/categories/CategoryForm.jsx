import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';
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
import { MButton } from '../../../components/@material-extend';
import { UploadSingleFile } from '../../../components/upload';

// ----------------------------------------------------------------------

CategoryForm.propTypes = {
  currentId: PropTypes.any.isRequired,
  setCurrentId: PropTypes.any.isRequired
};

export default function CategoryForm({ currentId, setCurrentId, open, setOpen }) {
  const [categoryData, setCategoryData] = useState({ title: '', message: '', tags: '', selectedFile: '' });
  const [file, setFile] = useState(null);

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setFile({
        ...file,
        preview: URL.createObjectURL(file)
      });
    }
    console.log(file);
  }, []);

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We will send updates occasionally.
          </DialogContentText>
          <TextField autoFocus fullWidth type="email" margin="dense" variant="outlined" label="Email Address" />
          <UploadSingleFile file={file} onDrop={handleDropSingleFile} />
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
