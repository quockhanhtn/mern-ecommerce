import { useState } from 'react';
// material
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import {
  Box,
  List,
  Avatar,
  Button,
  Dialog,
  ListItem,
  Typography,
  DialogTitle,
  ListItemText,
  ListItemAvatar
} from '@material-ui/core';

// ----------------------------------------------------------------------

const emails = ['username@gmail.com', 'user02@gmail.com'];

export default function SimpleDialog() {
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[1]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
    setSelectedValue(value);
  };

  return (
    <Box sx={{ textAlign: 'center' }}>
      <Typography variant="subtitle1" component="div">
        Selected: {selectedValue}
      </Typography>
      <br />
      <Button variant="outlined" onClick={handleClickOpen}>
        Open simple dialog
      </Button>

      <Dialog open={open} onClose={() => handleClose(selectedValue)}>
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <List>
          {emails.map((email) => (
            <ListItem button onClick={() => handleClose(email)} key={email}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    color: 'info.main',
                    backgroundColor: 'info.lighter'
                  }}
                >
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItem>
          ))}

          <ListItem autoFocus button onClick={() => handleClose('addAccount')}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItem>
        </List>
      </Dialog>
    </Box>
  );
}
