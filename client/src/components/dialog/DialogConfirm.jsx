// material
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';
// hooks
import useLocales from '../../hooks/useLocales';

// ----------------------------------------------------------------------

export default function DialogConfirm({ open, setOpen, handleSubmit, textContent }) {
  const { t } = useLocales();
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h4" marginBottom={2} sx={{ textTransform: 'uppercase' }}>
          {t('common.confirm-action-delete')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6">{textContent}</Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {t('common.cancel')}
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {t('common.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
