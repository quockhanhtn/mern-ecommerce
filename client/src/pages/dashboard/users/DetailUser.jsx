import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';
// material
import {
  Button,
  Dialog,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Stack,
  Grid,
  RadioGroup,
  FormControlLabel,
  Radio,
  Autocomplete
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { UploadSingleFile } from '../../../components/upload';
import useLocales from '../../../hooks/useLocales';
import { MotionInView, varFadeInUp } from '../../../components/animate';
import { MRadio } from '../../../components/@material-extend';
import { createBrand, updateBrand } from '../../../actions/brands';

// ----------------------------------------------------------------------

DetailUser.propTypes = {
  currentId: PropTypes.any.isRequired,
  setCurrentId: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default function DetailUser({ currentId, open, setOpen }) {
  const { t } = useLocales();
  const dispatch = useDispatch();
  const { list: usersList, isLoading, hasError } = useSelector((state) => state.user);
  const brand = usersList.find((c) => c._id === currentId);
  const [brandData, setBrandData] = useState({
    name: '',
    desc: '',
    isHide: false,
    country: brand?.country || 'Viet Nam',
    headQuarters: '',
    selectedFile: null,
    image: ''
  });

  useEffect(() => {
    if (brand) {
      setBrandData({ ...brandData, ...brand });
    }
  }, [brand]);

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setBrandData({
        ...brandData,
        selectedFile: { ...file, preview: URL.createObjectURL(file) }
      });
    }
  }, []);

  const handleUpdate = () => {
    dispatch(updateBrand(currentId, brandData));
    handleClose();
  };

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
