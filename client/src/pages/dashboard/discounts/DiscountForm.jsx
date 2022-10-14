import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';

import PropTypes from 'prop-types';
import { useState, useCallback, useEffect } from 'react';
// material
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  InputAdornment,
  Radio,
  RadioGroup,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { MobileDatePicker } from '@mui/lab';
import { merge } from 'lodash';

import { checkExistedDiscountCode } from '../../../api';

import { UploadSingleFile } from '../../../components/upload';
import { useLocales } from '../../../hooks';
import { MotionInView, varFadeInUp } from '../../../components/animate';
import { MIconButton, MRadio } from '../../../components/@material-extend';
import { createDiscount, updateDiscount } from '../../../redux/actions/discounts';
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

const initialData = {
  name: '',
  desc: '',
  isHide: false,
  code: '',
  beginDate: new Date(),
  endDate: new Date(new Date() + 30 * 86400000),
  unlimitedQty: false,
  quantity: 100,
  discount: 0,
  discountType: 'percent',
  minimumTotal: 0,
  maximumApplied: 1000,
  image: ''
};

export default function DiscountForm({ currentId, open, setOpen }) {
  const { t } = useLocales();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { list: discountsList, isLoading } = useSelector((state) => state.discount);
  const discount = discountsList.find((c) => c._id === currentId);
  const [uploadImage, setUploadImage] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(-1);
  const [discountData, setDiscountData] = useState(initialData);

  const getInitialValues = (discountData) => {
    const _discountData = {
      name: '',
      desc: '',
      isHide: false,
      code: '',
      beginDate: discount?.beginDate ? new Date(discount.beginDate) : new Date(),
      endDate: discount?.endDate ? new Date(discount.endDate) : new Date(new Date() + 30 * 86400000),
      quantity: discount?.quantity || 100,
      unlimitedQty: discount?.unlimitedQty || false,
      discount: discount?.discount || 0,
      discountType: discount?.discountType || 'percent',
      minimumTotal: discount?.minimumTotal || 0,
      maximumApplied: discount?.maximumApplied || 0,
      image: ''
    };

    if (discountData || discount) {
      return merge({}, _discountData, discount);
    }
    return _discountData;
  };

  const checkExisted = async (code) => {
    if (currentId) {
      return false;
    }
    let isExistCode = false;
    try {
      const { data } = await checkExistedDiscountCode(code);
      if (data?.data && data.data === '1') {
        isExistCode = true;
      }
    } catch {
      //
    }
    return isExistCode;
  };

  useEffect(() => {
    if (discount) {
      setDiscountData({ ...discountData, ...discount });
      if (discount.image) {
        setUploadImage(discount.image);
      }
    } else {
      setDiscountData(initialData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    code: Yup.string()
      .uppercase()
      .trim()
      .required(t('dashboard.discounts.code-validation'))
      .min(5, t('dashboard.discounts.code-validation-len'))
      .max(20, t('dashboard.discounts.code-validation-len')),
    // .test('unique_code', 'Mã khuyến mãi đã tồn tại', testUniqueCode),
    beginDate: Yup.date(),
    endDate: Yup.date().when(
      'beginDate',
      (beginDate, schema) => beginDate && schema.min(beginDate, 'End date must be later than start date')
    ),
    unlimitedQty: Yup.bool(),
    quantity: Yup.number().when('unlimitedQty', {
      is: true,
      then: Yup.number().notRequired(),
      otherwise: Yup.number().min(1, 'Số lượng tối thiểu là 1').required(t('dashboard.discounts.quantity-validation'))
    }),
    discountType: Yup.string().oneOf(['percent', 'price']),
    discount: Yup.number()
      .required(t('dashboard.discounts.discount-validation'))
      .when('discountType', {
        is: 'percent',
        then: Yup.number()
          .max(100, t('dashboard.discounts.discount-validation-max'))
          .min(0, t('dashboard.discounts.discount-validation-min')),
        otherwise: Yup.number().min(1000, 'Khuyến mãi theo giá ít nhất là 1000vnđ')
      }),
    minimumTotal: Yup.number(),
    maximumApplied: Yup.number().when('discountType', {
      is: 'percent',
      then: Yup.number().min(1000, 'Khuyến mãi tối đa ít nhất là 1000vnđ')
    })
  });

  const formik = useFormik({
    initialValues: getInitialValues(discount),
    validationSchema: DiscountSchema,
    onSubmit: async (values, { setSubmitting, setFieldError }) => {
      try {
        const isExistCode = await checkExisted(values.code);
        if (isExistCode) {
          setFieldError('code', 'Mã khuyến mãi đã tồn tại');
          enqueueSnackbar('Mã khuyến mãi đã tồn tại', { variant: 'error' });
          setSubmitting(false);
        } else {
          handleSave();
        }
      } catch (error) {
        enqueueSnackbar(t('dashboard.discounts.error'), { variant: 'error' });
      }
    }
  });
  const { values, errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;

  useEffect(() => {
    const beginDate = new Date(values.beginDate);
    const endDate = new Date(values.endDate);
    const isSameDay =
      beginDate.getDate() === endDate.getDate() &&
      beginDate.getMonth() === endDate.getMonth() &&
      beginDate.getFullYear() === endDate.getFullYear();

    if (isSameDay) {
      const newEndDate = new Date(beginDate.getTime() + 30 * 86400000);
      setFieldValue('endDate', newEndDate);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.beginDate, values.endDate]);

  const handleChangeCode = (e) => {
    const newValue = e.target.value.toString().trim().toUpperCase();
    setDiscountData({ ...discountData, code: newValue });
    setFieldValue('code', newValue);
  };

  const handleChangeDiscountType = (e) => {
    setDiscountData({ ...discountData, discountType: e.target.value });
    setFieldValue('discountType', e.target.value);
  };

  const handleChangeUnlimitedQty = (e) => {
    setDiscountData({ ...discountData, unlimitedQty: e.target.checked });
    setFieldValue('unlimitedQty', e.target.checked);
  };

  const handleChangeBeginDate = (date) => {
    setFieldValue('beginDate', date);
  };
  const handleChangeEndDate = (date) => {
    setFieldValue('endDate', date);
  };

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
                    label={t('dashboard.discounts.code')}
                    {...getFieldProps('code')}
                    onChange={handleChangeCode}
                    error={Boolean(touched.code && errors.code)}
                    helperText={touched.code && errors.code}
                    disabled={!!currentId}
                  />
                </MotionInView>
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
                  <Grid container>
                    <Grid sm={12} md={6}>
                      <MobileDatePicker
                        label={t('dashboard.discounts.date-start')}
                        value={values.beginDate}
                        inputFormat="dd/MM/yyyy"
                        onChange={handleChangeBeginDate}
                        renderInput={(params) => <TextField {...params} fullWidth />}
                      />
                    </Grid>
                    <Grid sm={12} md={6}>
                      <MobileDatePicker
                        label={t('dashboard.discounts.date-end')}
                        value={values.endDate}
                        inputFormat="dd/MM/yyyy"
                        onChange={handleChangeEndDate}
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
                    </Grid>
                  </Grid>
                </MotionInView>
                <MotionInView variants={varFadeInUp}>
                  <FormControlLabel
                    control={<Switch value={discountData.unlimitedQty} onChange={handleChangeUnlimitedQty} />}
                    label="Không giới hạn số lượng"
                    sx={{ mb: 2 }}
                  />
                  {!discountData.unlimitedQty && (
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
                  )}
                </MotionInView>
                <MotionInView variants={varFadeInUp}>
                  <Grid>
                    <Typography variant="body2" marginRight={5}>
                      Khuyến mãi theo
                    </Typography>
                    <RadioGroup row value={discountData.discountType} onChange={handleChangeDiscountType}>
                      <FormControlLabel value="percent" control={<MRadio color="primary" />} label="Phần trăm" />
                      <FormControlLabel value="price" control={<Radio color="primary" />} label="Giá tiền" />
                    </RadioGroup>
                  </Grid>
                </MotionInView>
                <MotionInView variants={varFadeInUp}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    placeholder="0"
                    label={
                      discountData.discountType === 'percent' ? t('dashboard.discounts.discount') : 'Tiền khuyến mãi'
                    }
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {discountData.discountType === 'percent' ? '%' : 'đ'}
                        </InputAdornment>
                      ),
                      type: 'number'
                    }}
                    {...getFieldProps('discount')}
                    error={Boolean(touched.discount && errors.discount)}
                    helperText={touched.discount && errors.discount}
                  />
                </MotionInView>
                <MotionInView variants={varFadeInUp}>
                  <TextField
                    required
                    fullWidth
                    type="number"
                    placeholder="0"
                    InputProps={{
                      startAdornment: <InputAdornment position="start">đ</InputAdornment>,
                      type: 'number'
                    }}
                    label="Giá trị đơn hàng tối thiểu"
                    {...getFieldProps('minimumTotal')}
                    error={Boolean(touched.minimumTotal && errors.minimumTotal)}
                    helperText={touched.minimumTotal && errors.minimumTotal}
                  />
                  {discountData.discountType === 'percent' && (
                    <TextField
                      required
                      fullWidth
                      type="number"
                      placeholder="0"
                      label="Khuyến mãi tối đa"
                      InputProps={{
                        startAdornment: <InputAdornment position="start">đ</InputAdornment>,
                        type: 'number'
                      }}
                      {...getFieldProps('maximumApplied')}
                      error={Boolean(touched.maximumApplied && errors.maximumApplied)}
                      helperText={touched.maximumApplied && errors.maximumApplied}
                      sx={{ mt: 3 }}
                    />
                  )}
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
