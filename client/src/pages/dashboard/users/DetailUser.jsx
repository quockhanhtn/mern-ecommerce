import PropTypes from 'prop-types';
// material
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@material-ui/core';
import useLocales from '../../../hooks/useLocales';

// ----------------------------------------------------------------------

DetailUser.propTypes = {
  currentId: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

// eslint-disable-next-line no-unused-vars
export default function DetailUser({ currentId, open, setOpen }) {
  const { t } = useLocales();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h4" marginBottom={2} sx={{ textTransform: 'uppercase' }}>
          {t('dashboard.users.title')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <div>aaaaa</div>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {t('common.cancel')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
