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
  Radio
} from '@material-ui/core';
// icons
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
// form validation
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { createBrand, updateBrand } from '../../../redux/slices/brandSlice';
// hooks
import useLocales from '../../../hooks/useLocales';
// components
import CountryPicker, { defaultCountryName } from '../../../components/CountryPicker';
import { UploadSingleFile } from '../../../components/upload';
import { MotionInView, varFadeInUp } from '../../../components/animate';
import { MIconButton, MRadio } from '../../../components/@material-extend';
// others
import { allowImageMineTypes } from '../../../constants/imageMineTypes';
import { firebaseUploadSingle } from '../../../helper/firebaseHelper';

// ----------------------------------------------------------------------

BrandForm.propTypes = {
  currentId: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default function BrandForm({ currentId, open, setOpen }) {
  const { t } = useLocales();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { list: brandsList } = useSelector((state) => state.brand);
  const brand = brandsList.find((c) => c._id === currentId);
  const [uploadImage, setUploadImage] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(-1);
  const [brandData, setBrandData] = useState({
    name: '',
    desc: '',
    isHide: false,
    country: brand?.country || defaultCountryName,
    headQuarters: '',
    image: ''
  });

  useEffect(() => {
    if (brand) {
      setBrandData({ ...brandData, ...brand });
      if (brand.image) {
        setUploadImage(brand.image);
      }
    } else {
      setBrandData({
        name: '',
        desc: '',
        country: 'Việt Nam',
        headQuarters: '',
        isHide: false,
        image: ''
      });
    }
  }, [brand]);

  const handleDropSingleFile = useCallback((acceptedFiles) => {
    const uploadFile = acceptedFiles[0];
    if (uploadFile) {
      if (allowImageMineTypes.indexOf(uploadFile.type) < 0) {
        enqueueSnackbar(t('common.invalid-file-type'), {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        return;
      }
      uploadFile.preview = URL.createObjectURL(uploadFile);
      setUploadImage(uploadFile);
    }
  }, []);

  const handleSave = () => {
    if (!uploadImage || typeof uploadImage === 'string') {
      if (typeof uploadImage === 'string') {
        setBrandData({ ...brandData, image: uploadImage });
      }

      if (currentId) {
        dispatch(updateBrand(currentId, brandData));
      } else {
        dispatch(createBrand(brandData));
      }
      handleClose();
      enqueueSnackbar(!currentId ? t('dashboard.brands.add-title') : t('dashboard.brands.edit-title'), {
        variant: 'success'
      });
      return;
    }

    firebaseUploadSingle(
      uploadImage,
      'brands',
      setUploadPercent,
      (error) => {
        enqueueSnackbar(error, {
          variant: 'error',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      },
      (url) => {
        brandData.image = url;
        setBrandData(brandData);
        if (currentId) {
          dispatch(updateBrand(currentId, brandData));
        } else {
          dispatch(createBrand(brandData));
        }
        handleClose();
        enqueueSnackbar(!currentId ? t('dashboard.brands.add-title') : t('dashboard.brands.edit-title'), {
          variant: 'success'
        });
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const BrandSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(t('dashboard.brands.name-validation'))
      .min(6, t('dashboard.brands.name-validation-len'))
      .max(25, t('dashboard.brands.name-validation-len'))
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: brandData?.name || '',
      desc: brandData?.desc || '',
      country: brandData?.country || '',
      headQuarters: brandData?.headQuarters || ''
    },
    validationSchema: BrandSchema,
    onSubmit: async () => {
      try {
        await handleSave();
      } catch (error) {
        enqueueSnackbar('Error', { variant: 'error' });
      }
    }
  });
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h4" marginBottom={2} sx={{ textTransform: 'uppercase' }}>
          {currentId ? t('dashboard.brands.edit') : t('dashboard.brands.add-title')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <Form>
            <Stack spacing={3}>
              <MotionInView variants={varFadeInUp}>
                <TextField
                  required
                  fullWidth
                  label={t('dashboard.brands.name')}
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                  onChange={(e) => setBrandData({ ...brandData, name: e.target.value })}
                />
              </MotionInView>
              <MotionInView variants={varFadeInUp}>
                <TextField
                  fullWidth
                  label={t('dashboard.brands.desc')}
                  multiline
                  rows={3}
                  {...getFieldProps('desc')}
                  error={Boolean(touched.desc && errors.desc)}
                  helperText={touched.desc && errors.desc}
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
                <CountryPicker
                  label={t('dashboard.brands.country')}
                  onChange={(e, newValue) => setBrandData({ ...brandData, country: newValue.label })}
                  value={brandData.country}
                  required
                  fullWidth
                />
              </MotionInView>
              <MotionInView variants={varFadeInUp}>
                <TextField
                  fullWidth
                  label={t('dashboard.brands.headQuarters')}
                  {...getFieldProps('headQuarters')}
                  error={Boolean(touched.headQuarters && errors.headQuarters)}
                  helperText={touched.headQuarters && errors.headQuarters}
                  onChange={(e) => setBrandData({ ...brandData, headQuarters: e.target.value })}
                />
              </MotionInView>
              <MotionInView variants={varFadeInUp}>
                <UploadSingleFile
                  label={t('dashboard.brands.image')}
                  file={uploadImage}
                  setFile={setUploadImage}
                  onDrop={handleDropSingleFile}
                  uploadPercent={uploadPercent}
                  accepted="image/*"
                />
              </MotionInView>
            </Stack>
          </Form>
        </FormikProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {t('common.cancel')}
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {currentId ? t('common.save') : t('common.create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
