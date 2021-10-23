import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// material
import {
  Autocomplete,
  Button,
  Dialog,
  FormControlLabel,
  Grid,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  RadioGroup,
  Radio,
  Stack,
  Typography
} from '@material-ui/core';
import { MRadio } from '../../../components/@material-extend';
//
import { UploadSingleFile } from '../../../components/upload';
import { varFadeInUp, MotionInView } from '../../../components/animate';
import useLocales from '../../../hooks/useLocales';
import { createCategory, updateCategory } from '../../../actions/categories';

// ----------------------------------------------------------------------

CategoryForm.propTypes = {
  currentId: PropTypes.any.isRequired,
  setCurrentId: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default function CategoryForm({ currentId, setCurrentId, open, setOpen }) {
  const { t } = useLocales();
  const dispatch = useDispatch();
  const { list: categoriesList, isLoading, hasError } = useSelector((state) => state.category);
  const category = categoriesList.find((c) => c._id === currentId);
  const [categoryData, setCategoryData] = useState({
    name: '',
    desc: '',
    isHide: false,
    parent: '',
    selectedFile: null,
    image: ''
  });

  useEffect(() => {
    if (category) {
      setCategoryData({ ...categoryData, ...category });
    }
  }, [category]);

  // setCategoryData({ ...categoryData, ...category });

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file) {
      setCategoryData({
        ...categoryData,
        selectedFile: { ...file, preview: URL.createObjectURL(file) }
      });
    }
  }, []);

  const handleCreate = () => {
    if (!categoryData.parent) {
      delete categoryData.parent;
    }
    dispatch(createCategory(categoryData));
    console.log(categoryData);
    handleClose();
  };

  const handleUpdate = () => {
    dispatch(updateCategory(currentId, categoryData));
    console.log(categoryData);
    handleClose();
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h4" marginBottom={2} sx={{ textTransform: 'uppercase' }}>
          {currentId ? t('dashboard.categories.edit') : t('dashboard.categories.add-title')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          <MotionInView variants={varFadeInUp}>
            <TextField
              fullWidth
              label={t('dashboard.categories.name')}
              value={categoryData.name}
              onChange={(e) => setCategoryData({ ...categoryData, name: e.target.value })}
            />
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <TextField
              fullWidth
              label={t('dashboard.categories.desc')}
              multiline
              rows={3}
              value={categoryData.desc}
              onChange={(e) => setCategoryData({ ...categoryData, desc: e.target.value })}
            />
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Grid>
              <Typography variant="body2" marginRight={5}>
                {t('dashboard.categories.status')}
              </Typography>
              <RadioGroup
                row
                value={categoryData.isHide.toString()}
                onChange={(e) => setCategoryData({ ...categoryData, isHide: e.target.value === 'true' })}
              >
                <FormControlLabel
                  value="false"
                  control={<MRadio color="success" />}
                  label={t('dashboard.categories.visible')}
                />
                <FormControlLabel
                  value="true"
                  control={<Radio color="default" />}
                  label={t('dashboard.categories.hidden')}
                />
              </RadioGroup>
            </Grid>
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <Autocomplete
              fullWidth
              options={categoriesList.filter((x) => !x.isHide)}
              getOptionLabel={(option) => option.name}
              value={categoriesList.find((c) => c.slug === categoryData.parent)}
              onChange={(e, newValue) => setCategoryData({ ...categoryData, parent: newValue._id })}
              renderInput={(params) => <TextField {...params} label={t('dashboard.categories.parent')} margin="none" />}
            />
          </MotionInView>

          <MotionInView variants={varFadeInUp}>
            <UploadSingleFile file={categoryData.selectedFile} onDrop={handleDropSingleFile} />
          </MotionInView>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {t('common.cancel')}
        </Button>
        <Button onClick={currentId ? handleUpdate : handleCreate} variant="contained">
          {t('common.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
