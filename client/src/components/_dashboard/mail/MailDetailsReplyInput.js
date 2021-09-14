import { Icon } from '@iconify/react';
import { useRef, useState } from 'react';
import attach2Fill from '@iconify/icons-eva/attach-2-fill';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
// material
import { Box, Button, TextField, IconButton } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function MailDetailsReplyInput() {
  const fileInputRef = useRef(null);
  const [message, setMessage] = useState('');

  const handleChangeMessage = (event) => {
    setMessage(event.target.value);
  };

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <TextField
        fullWidth
        multiline
        minRows={2}
        maxRows={8}
        value={message}
        placeholder="Type a message"
        onChange={handleChangeMessage}
        sx={{ '& fieldset': { border: 'none !important' } }}
      />

      <Box
        sx={{
          mr: 3,
          mb: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <IconButton size="small" onClick={handleAttach}>
          <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
        </IconButton>

        <IconButton size="small" onClick={handleAttach} sx={{ ml: 1, mr: 2 }}>
          <Icon icon={attach2Fill} width={24} height={24} />
        </IconButton>

        <Button variant="contained">Send</Button>
      </Box>

      <input type="file" ref={fileInputRef} style={{ display: 'none' }} />
    </>
  );
}
