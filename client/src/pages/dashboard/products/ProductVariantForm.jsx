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
  Card,
  FormHelperText,
  InputAdornment
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import { UploadMultiFile, UploadSingleFile } from '../../../components/upload';
import useLocales from '../../../hooks/useLocales';
import { MIconButton } from '../../../components/@material-extend';
import { allowImageMineTypes } from '../../../constants/imageMineTypes';
import { firebaseUploadMultiple, firebaseUploadSingle } from '../../../helper/firebaseHelper';
import { createProductVariant, getProductById, updateProductVariant } from '../../../redux/slices/productSlice';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));
// ----------------------------------------------------------------------

ProductVariantForm.propTypes = {
  currentVariant: PropTypes.object,
  currentVariantId: PropTypes.any.isRequired,
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
};

export default function ProductVariantForm({ currentVariant, currentProductId, open, handleClose, handleCreateDone }) {
  const { t } = useLocales();
  const theme = useTheme();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [specifications, setSpecifications] = useState([{ id: 1, name: '', value: '' }]);
  const [isErrorSpecifications, setIsErrorSpecifications] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(-1);
  const [validationThumbnail, setValidationThumbnail] = useState(false);
  const [urlsPictures, setUrlsPictures] = useState([]);
  const { item: currentProduct } = useSelector((state) => state.product);

  useEffect(() => {
    let id = 1;
    currentVariant?.addSpecifications?.map((item) => {
      delete item.key;
      item.id = id;
      id += 1;
      return item;
    });
    if (currentVariant?.addSpecifications?.length > 0) {
      setSpecifications(currentVariant?.addSpecifications);
    }
    setUploadImage(currentVariant?.thumbnail);
  }, [currentVariant?.addSpecifications]);

  useEffect(() => {
    dispatch(getProductById(currentProductId));
  }, [currentProductId]);

  const handleChangeInput = (id, event) => {
    setIsErrorSpecifications(false);
    const newSpecifications = specifications.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setSpecifications(newSpecifications);
  };

  const handleAddFields = () => {
    const indexCurrent = specifications.length - 1;
    if (specifications[indexCurrent].name === '' || specifications[indexCurrent].value === '') {
      setIsErrorSpecifications(true);
      return;
    }
    setSpecifications([...specifications, { id: specifications.length + 1, name: '', value: '' }]);
  };

  const handleRemoveFields = (id) => {
    const values = [...specifications];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setSpecifications(values);
  };

  const renderSpecificationsForm = () => (
    <div>
      {specifications.map((inputField) => (
        <Stack key={inputField.id} direction="row" spacing={3} sx={{ marginBottom: theme.spacing(2) }}>
          <TextField
            fullWidth
            name="name"
            label={t('products.specifications-name')}
            size="small"
            value={inputField.name}
            error={isErrorSpecifications && inputField.name === ''}
            onChange={(event) => handleChangeInput(inputField.id, event)}
          />
          <TextField
            fullWidth
            name="value"
            label={t('products.specifications-value')}
            size="small"
            value={inputField.value}
            error={isErrorSpecifications && inputField.value === ''}
            onChange={(event) => handleChangeInput(inputField.id, event)}
          />
          <Button disabled={specifications.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
            Xóa
          </Button>
        </Stack>
      ))}
      {isErrorSpecifications && (
        <Typography
          variant="inherit"
          sx={{
            marginLeft: theme.spacing(1),
            marginBottom: theme.spacing(1),
            fontSize: 'small',
            color: theme.palette.error.main
          }}
        >
          Specifications must be filled in completely !!!
        </Typography>
      )}
    </div>
  );

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

  const validationCustomer = () => {
    if (!uploadImage) {
      setValidationThumbnail(true);
    }
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < specifications.length; i++) {
      if (
        (specifications[i]?.name !== '' && specifications[i]?.value === '') ||
        (specifications[i]?.name === '' && specifications[i]?.value !== '')
      ) {
        setIsErrorSpecifications(true);
      }
    }
    return !!uploadImage;
  };

  const handleSave = () => {
    if (validationCustomer() && handleCheckSku()) {
      if (!uploadImage || typeof uploadImage === 'string') {
        if (typeof uploadImage === 'string') {
          const productVariantData = handleAddDataForProductVariant(uploadImage);
          if (currentVariant) {
            dispatch(updateProductVariant(currentProductId, currentVariant.sku, productVariantData));
            enqueueSnackbar(t('dashboard.products.save'), {
              variant: 'success'
            });
            handleCreateDone();
            return true;
          }
          dispatch(createProductVariant(currentProductId, productVariantData));
          enqueueSnackbar(t('dashboard.products.save'), {
            variant: 'success'
          });
          handleCreateDone();
          return true;
        }
      }
      firebaseUploadSingle(
        uploadImage,
        'products',
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
          const productVariantData = handleAddDataForProductVariant(url);
          if (currentVariant) {
            dispatch(updateProductVariant(currentProductId, currentVariant.sku, productVariantData));
            enqueueSnackbar(t('dashboard.products.save'), {
              variant: 'success'
            });
            handleCreateDone();
            return true;
          }
          dispatch(createProductVariant(currentProductId, productVariantData));
          enqueueSnackbar(t('dashboard.products.save'), {
            variant: 'success'
          });
          handleCreateDone();
          return true;
        }
      );
    }
  };

  const handleUploadMultiple = async () => {
    const urlsPicturesNew = [];
    if (values.pictures) {
      firebaseUploadMultiple(
        values.pictures,
        'products',
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
        (urls) => {
          urlsPicturesNew.push(urls);
        }
      );
      setUrlsPictures(urlsPicturesNew);
    }
  };

  const handleAddDataForProductVariant = (url) => {
    const product = {
      variantName: values.variantName,
      sku: values.sku,
      quantity: values.quantity,
      price: values.price,
      marketPrice: values.marketPrice,
      thumbnail: url,
      pictures: urlsPictures[0]
    };
    specifications.map((item) => {
      delete item.id;
      return item;
    });
    if (specifications.length >= 0 && specifications[0].name !== '') {
      product.addSpecifications = specifications;
    }
    return product;
  };

  const NewProductSchema = Yup.object().shape({
    variantName: Yup.string().required('Variant Name is required'),
    sku: Yup.string().required('Sku is required'),
    price: Yup.number().required('Price is required'),
    marketPrice: Yup.number().required('Market Price is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      variantName: currentVariant?.variantName || '',
      sku: currentVariant?.sku || '',
      quantity: currentVariant?.quantity || 1,
      price: currentVariant?.price || '',
      marketPrice: currentVariant?.marketPrice || '',
      thumbnail: currentVariant?.thumbnail || '',
      pictures: currentVariant?.pictures || []
    },
    validationSchema: NewProductSchema,
    onSubmit: async () => {
      try {
        handleSave();
        // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  });

  const { errors, values, touched, handleSubmit, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      setFieldValue(
        'pictures',
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      );
    },
    [setFieldValue]
  );

  const handleRemoveAll = () => {
    setFieldValue('pictures', []);
  };

  const handleRemove = (file) => {
    const filteredItems = values.pictures.filter((_file) => _file !== file);
    setFieldValue('pictures', filteredItems);
  };

  const handleCheckSku = () => {
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < currentProduct?.variants.length; i++) {
      if (currentProduct?.variants[i].sku === values.sku && !currentVariant) {
        enqueueSnackbar('Sku phải là duy nhất', {
          variant: 'error'
        });
        return false;
      }
    }
    return true;
  };

  return (
    <Dialog open={open} maxWidth="md" fullWidth>
      <DialogTitle>
        <Typography variant="h4" marginBottom={2} sx={{ textTransform: 'uppercase' }}>
          Thêm loại sản phẩm
        </Typography>
      </DialogTitle>
      <DialogContent>
        <FormikProvider value={formik}>
          <Form>
            <Stack spacing={3}>
              <TextField
                fullWidth
                label="Loại"
                {...getFieldProps('variantName')}
                error={Boolean(touched.variantName && errors.variantName)}
                helperText={touched.variantName && errors.variantName}
              />
              <Stack direction="row" spacing={3} sx={{ marginBottom: theme.spacing(2) }}>
                <TextField
                  fullWidth
                  disabled={currentVariant}
                  label={t('products.sku')}
                  {...getFieldProps('sku')}
                  error={Boolean(touched.sku && errors.sku)}
                  helperText={touched.sku && errors.sku}
                />
                <TextField
                  type="number"
                  fullWidth
                  label={t('products.quantity')}
                  {...getFieldProps('quantity')}
                  defaultValue={1}
                  error={Boolean(touched.quantity && errors.quantity)}
                  helperText={touched.quantity && errors.quantity}
                />
              </Stack>
              <Stack direction="row" spacing={3} sx={{ marginBottom: theme.spacing(2) }}>
                <TextField
                  fullWidth
                  placeholder="0.00"
                  label={t('products.price')}
                  {...getFieldProps('price')}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">đ</InputAdornment>,
                    type: 'number'
                  }}
                  error={Boolean(touched.price && errors.price)}
                  helperText={touched.price && errors.price}
                />
                <TextField
                  fullWidth
                  placeholder="0.00"
                  label={t('products.market-price')}
                  {...getFieldProps('marketPrice')}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">đ</InputAdornment>,
                    type: 'number'
                  }}
                  error={Boolean(touched.marketPrice && errors.marketPrice)}
                  helperText={touched.marketPrice && errors.marketPrice}
                />
              </Stack>
              <Card sx={{ p: 3 }}>
                {renderSpecificationsForm()}
                <Button variant="outlined" onClick={handleAddFields}>
                  Thêm
                </Button>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div onChange={() => setValidationThumbnail(false)}>
                    <UploadSingleFile
                      label="Ảnh bìa"
                      file={uploadImage}
                      setFile={setUploadImage}
                      onDrop={handleDropSingleFile}
                      uploadPercent={uploadPercent}
                      accepted="image/*"
                      maxSize={3145728}
                      error={Boolean(validationThumbnail)}
                    />
                    {validationThumbnail && (
                      <FormHelperText error sx={{ px: 2 }}>
                        Thumbnail is required
                      </FormHelperText>
                    )}
                  </div>
                  <div>
                    <LabelStyle>
                      Hình ảnh khác
                      <Typography component="span" variant="subtitle4" sx={{ color: 'primary.main' }}>
                        &nbsp;Note: must upload more pictures before saving.
                      </Typography>
                    </LabelStyle>
                    <UploadMultiFile
                      showPreview
                      maxSize={3145728}
                      accept="image/*"
                      files={values.pictures}
                      onDrop={handleDrop}
                      onRemove={handleRemove}
                      onRemoveAll={handleRemoveAll}
                      uploadAll={handleUploadMultiple}
                    />
                  </div>
                </Stack>
              </Card>
            </Stack>
          </Form>
        </FormikProvider>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="inherit">
          {t('common.cancel')}
        </Button>
        <Button onClick={handleSubmit} variant="contained">
          {currentVariant ? t('common.save') : t('common.create')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
