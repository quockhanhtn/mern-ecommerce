import PropTypes from 'prop-types';
// material
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';
// hooks
import { useLocales } from '~/hooks';

// ----------------------------------------------------------------------

function DialogConfirm({ open, setOpen, handleSubmit, textContent }) {
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

DialogConfirm.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  handleSubmit: PropTypes.func,
  textContent: PropTypes.string
};

export default DialogConfirm;
