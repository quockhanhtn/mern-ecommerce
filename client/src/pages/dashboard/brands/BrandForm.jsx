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
import { UploadSingleFile } from '../../../components/upload';
import useLocales from '../../../hooks/useLocales';
import { MotionInView, varFadeInUp } from '../../../components/animate';
import { MRadio } from '../../../components/@material-extend';
import countries from '../../../utils/countries';
import { createBrand, updateBrand } from '../../../actions/brands';

// ----------------------------------------------------------------------

BrandForm.propTypes = {
  currentId: PropTypes.any.isRequired,
  setCurrentId: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default function BrandForm({ currentId, setCurrentId, open, setOpen }) {
  const { t } = useLocales();
  const dispatch = useDispatch();
  const { list: brandsList, isLoading, hasError } = useSelector((state) => state.brand);
  const brand = brandsList.find((c) => c._id === currentId);
  const [brandData, setBrandData] = useState({
    name: '',
    desc: '',
    isHide: false,
    country: '',
    headQuarters: '',
    selectedFile: null,
    image: ''
  });

  useEffect(() => {
    console.log(brand);
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

  const handleCreate = () => {
    dispatch(createBrand(brandData));
    handleClose();
  };

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
          {currentId ? t('dashboard.brands.edit') : t('dashboard.brands.add-title')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <MotionInView variants={varFadeInUp}>
            <TextField
              required
              fullWidth
              label={t('dashboard.brands.name')}
              value={brandData.name}
              onChange={(e) => setBrandData({ ...brandData, name: e.target.value })}
            />
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <TextField
              fullWidth
              label={t('dashboard.brands.desc')}
              multiline
              rows={3}
              value={brandData.desc}
              onChange={(e) => setBrandData({ ...brandData, desc: e.target.value })}
            />
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Grid>
              <Typography variant="body2" marginRight={5}>
                {t('dashboard.brands.status')}
              </Typography>
              <RadioGroup
                row
                value={brandData.isHide.toString()}
                onChange={(e) => setBrandData({ ...brandData, isHide: e.target.value === 'true' })}
              >
                <FormControlLabel
                  value="false"
                  control={<MRadio color="success" />}
                  label={t('dashboard.brands.visible')}
                />
                <FormControlLabel
                  value="true"
                  control={<Radio color="default" />}
                  label={t('dashboard.brands.hidden')}
                />
              </RadioGroup>
            </Grid>
          </MotionInView>
          <MotionInView variants={varFadeInUp}>
            <Autocomplete
              fullWidth
              options={countries.map((country) => ({
                label: country.label
              }))}
              getOptionLabel={(option) => option.label}
              value={countries.find((c) => c.label === brandData.parent)}
              onChange={(e, newValue) => setBrandData({ ...brandData, country: newValue.label })}
              renderInput={(params) => <TextField {...params} label={t('dashboard.brands.country')} margin="none" />}
            />
          </MotionInView>
          <MotionInView variants={varFadeInUp}>
            <TextField
              fullWidth
              label={t('dashboard.brands.headQuarters')}
              value={brandData.headQuarters}
              onChange={(e) => setBrandData({ ...brandData, headQuarters: e.target.value })}
            />
          </MotionInView>
          <MotionInView variants={varFadeInUp}>
            <UploadSingleFile file={brandData.selectedFile} onDrop={handleDropSingleFile} accept="image/*" />
          </MotionInView>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {t('common.cancel')}
        </Button>
        <Button onClick={currentId ? handleUpdate : handleCreate} variant="contained">
          {currentId ? t('common.save') : t('common.create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
