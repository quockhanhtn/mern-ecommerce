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
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { MobileDateTimePicker } from '@material-ui/lab';
import { merge } from 'lodash';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { UploadSingleFile } from '../../../components/upload';
import useLocales from '../../../hooks/useLocales';
import { MotionInView, varFadeInUp } from '../../../components/animate';
import { MIconButton, MRadio } from '../../../components/@material-extend';
import { createDiscount, updateDiscount } from '../../../actions/discounts';
import LoadingScreen from '../../../components/LoadingScreen';
import { allowImageMineTypes } from '../../../constants/imageMineTypes';
import { firebaseUploadSingle } from '../../../helper/firebaseHelper';

// ----------------------------------------------------------------------
DiscountForm.propTypes = {
  currentId: PropTypes.any.isRequired,
  setCurrentId: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default function DiscountForm({ currentId, open, setOpen }) {
  const { t } = useLocales();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { list: discountsList, isLoading } = useSelector((state) => state.discount);
  const discount = discountsList.find((c) => c._id === currentId);
  const [uploadImage, setUploadImage] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(-1);
  const [discountData, setDiscountData] = useState({
    name: '',
    desc: '',
    isHide: false,
    code: '',
    fromDate: '',
    endDate: '',
    quantity: 100,
    discount: 0,
    image: ''
  });

  const getInitialValues = (discountData) => {
    const _discountData = {
      name: '',
      desc: '',
      isHide: false,
      code: '',
      fromDate: discount ? new Date(discount.fromDate) : new Date(),
      endDate: discount ? new Date(discount.endDate) : new Date(),
      quantity: discount?.quantity || 100,
      discount: discount?.discount || 0,
      image: ''
    };

    if (discountData || discount) {
      return merge({}, _discountData, discount);
    }
    return _discountData;
  };

  useEffect(() => {
    if (discount) {
      setDiscountData({ ...discountData, ...discount });
      if (discount.image) {
        setUploadImage(discount.image);
      }
    } else {
      setDiscountData({
        name: '',
        desc: '',
        isHide: false,
        code: '',
        fromDate: '',
        endDate: '',
        quantity: 100,
        discount: 0,
        image: ''
      });
    }
  }, [discount]);

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
    values.isHide = discountData.isHide;
    if (!uploadImage || typeof uploadImage === 'string') {
      if (typeof uploadImage === 'string') {
        setDiscountData({ ...discountData, image: uploadImage });
        values.image = discountData.image;
      }
      if (currentId) {
        dispatch(updateDiscount(currentId, values));
        enqueueSnackbar(t('dashboard.discounts.updated-success'), { variant: 'success' });
      } else {
        dispatch(createDiscount(values));
        enqueueSnackbar(t('dashboard.discounts.create-success'), { variant: 'success' });
      }
      handleClose();
      return;
    }

    firebaseUploadSingle(
      uploadImage,
      'discounts',
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
        discountData.image = url;
        setDiscountData(discountData);
        values.image = discountData.image;
        if (currentId) {
          dispatch(updateDiscount(currentId, values));
          enqueueSnackbar(t('dashboard.discounts.updated-success'), { variant: 'success' });
        } else {
          dispatch(createDiscount(values));
          enqueueSnackbar(t('dashboard.discounts.create-success'), { variant: 'success' });
        }
        handleClose();
      }
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  const DiscountSchema = Yup.object().shape({
    name: Yup.string()
      .trim()
      .required(t('dashboard.discounts.name-validation'))
      .min(6, t('dashboard.discounts.name-validation-len'))
      .max(50, t('dashboard.discounts.name-validation-len')),
    // desc: Yup.string().required(t('dashboard.discounts.desc-validation')),
    code: Yup.string()
      .trim()
      .required(t('dashboard.discounts.code-validation'))
      .min(5, t('dashboard.discounts.code-validation-len'))
      .max(20, t('dashboard.discounts.code-validation-len')),
    fromDate: Yup.date(),
    endDate: Yup.date().when(
      'fromDate',
      (fromDate, schema) => fromDate && schema.min(fromDate, 'End date must be later than start date')
    ),
    quantity: Yup.number().required(t('dashboard.discounts.quantity-validation')),
    discount: Yup.number()
      .required(t('dashboard.discounts.discount-validation'))
      .max(100, t('dashboard.discounts.discount-validation-max'))
      .min(0, t('dashboard.discounts.discount-validation-min'))
  });
  const formik = useFormik({
    initialValues: getInitialValues(discount),
    validationSchema: DiscountSchema,
    onSubmit: async (values) => {
      try {
        handleSave();
      } catch (error) {
        enqueueSnackbar(t('dashboard.discounts.error'), { variant: 'error' });
      }
    }
  });
  const { values, errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;

  return (
    <Dialog disableEscapeKeyDown onBackdropClick="false" open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography variant="h4" marginBottom={2} sx={{ textTransform: 'uppercase' }}>
          {currentId ? t('dashboard.discounts.edit') : t('dashboard.discounts.add-title')}
        </Typography>
      </DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <Form>
            {isLoading ? (
              <LoadingScreen />
            ) : (
              <Stack spacing={3}>
                <MotionInView variants={varFadeInUp}>
                  <TextField
                    required
                    fullWidth
                    label={t('dashboard.discounts.name')}
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                </MotionInView>
                <MotionInView variants={varFadeInUp}>
                  <TextField
                    fullWidth
                    label={t('dashboard.discounts.desc')}
                    multiline
                    rows={3}
                    {...getFieldProps('desc')}
                    error={Boolean(touched.desc && errors.desc)}
                    helperText={touched.desc && errors.desc}
                  />
                </MotionInView>
                <MotionInView variants={varFadeInUp}>
                  <Grid>
                    <Typography variant="body2" marginRight={5}>
                      {t('dashboard.discounts.status')}
                    </Typography>
                    <RadioGroup
                      row
                      value={discountData.isHide.toString()}
                      onChange={(e) => setDiscountData({ ...discountData, isHide: e.target.value === 'true' })}
                    >
                      <FormControlLabel
                        value="false"
                        control={<MRadio color="success" />}
                        label={t('dashboard.discounts.visible')}
                      />
                      <FormControlLabel
                        value="true"
                        control={<Radio color="default" />}
                        label={t('dashboard.discounts.hidden')}
                      />
                    </RadioGroup>
                  </Grid>
                </MotionInView>
                <MotionInView variants={varFadeInUp}>
                  <TextField
                    required
                    fullWidth
                    label={t('dashboard.discounts.code')}
                    {...getFieldProps('code')}
                    error={Boolean(touched.code && errors.code)}
                    helperText={touched.code && errors.code}
                    disabled={!!currentId}
                  />
                </MotionInView>
                <MotionInView variants={varFadeInUp}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    placeholder="0"
                    label={t('dashboard.discounts.quantity')}
                    {...getFieldProps('quantity')}
                    error={Boolean(touched.quantity && errors.quantity)}
                    helperText={touched.quantity && errors.quantity}
                  />
                </MotionInView>
                <MotionInView variants={varFadeInUp}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    placeholder="0"
                    label={t('dashboard.discounts.discount')}
                    {...getFieldProps('discount')}
                    error={Boolean(touched.discount && errors.discount)}
                    helperText={touched.discount && errors.discount}
                  />
                </MotionInView>
                <MotionInView variants={varFadeInUp}>
                  <MobileDateTimePicker
                    label={t('dashboard.discounts.date-start')}
                    value={values.fromDate}
                    inputFormat="dd/MM/yyyy hh:mm a"
                    onChange={(date) => setFieldValue('fromDate', date)}
                    renderInput={(params) => <TextField {...params} fullWidth />}
                  />
                </MotionInView>
                <MotionInView variants={varFadeInUp}>
                  <MobileDateTimePicker
                    label={t('dashboard.discounts.date-end')}
                    value={values.endDate}
                    inputFormat="dd/MM/yyyy hh:mm a"
                    onChange={(date) => setFieldValue('endDate', date)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        error={Boolean(touched.endDate && errors.endDate)}
                        helperText={touched.endDate && errors.endDate}
                        sx={{ mb: 3 }}
                      />
                    )}
                  />
                </MotionInView>
                <MotionInView variants={varFadeInUp}>
                  <UploadSingleFile
                    label={t('dashboard.discounts.image')}
                    file={uploadImage}
                    setFile={setUploadImage}
                    onDrop={handleDropSingleFile}
                    uploadPercent={uploadPercent}
                    accepted="image/*"
                  />
                </MotionInView>
              </Stack>
            )}
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
