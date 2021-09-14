import { useRef } from 'react';
import { Icon } from '@iconify/react';
import attach2Fill from '@iconify/icons-eva/attach-2-fill';
import roundAddPhotoAlternate from '@iconify/icons-ic/round-add-photo-alternate';
// material
import { Box, Card, Button, TextField, IconButton } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function ProfilePostInput() {
  const fileInputRef = useRef(null);

  const handleAttach = () => {
    fileInputRef.current.click();
  };

  return (
    <Card sx={{ p: 3 }}>
      <TextField
        multiline
        fullWidth
        rows={4}
        placeholder="Share what you are thinking here..."
        sx={{
          '& fieldset': {
            borderWidth: `1px !important`,
            borderColor: (theme) => `${theme.palette.grey[500_32]} !important`
          }
        }}
      />

      <Box
        sx={{
          mt: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box sx={{ display: 'flex' }}>
          <IconButton size="small" onClick={handleAttach} sx={{ mr: 1 }}>
            <Icon icon={roundAddPhotoAlternate} width={24} height={24} />
          </IconButton>
          <IconButton size="small" onClick={handleAttach}>
            <Icon icon={attach2Fill} width={24} height={24} />
          </IconButton>
        </Box>
        <Button variant="contained">Post</Button>
      </Box>

      <input ref={fileInputRef} type="file" style={{ display: 'none' }} />
    </Card>
  );
}
