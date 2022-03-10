import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
// form validation
import * as Yup from 'yup';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import {
  Card,
  Chip,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  FormControlLabel,
  Link,
  Button
} from '@material-ui/core';
// icons
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getAllBrands } from '../../../redux/actions/brands';
import { getAllCategories } from '../../../redux/slices/categorySlice';
import { createProduct } from '../../../redux/actions/products';
// components
import CountryPicker from '../../../components/CountryPicker';
import { QuillEditor } from '../../../components/editor';
import { UploadMultiFile, UploadSingleFile } from '../../../components/upload';
import { MIconButton } from '../../../components/@material-extend';
// others
import useLocales from '../../../hooks/useLocales';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { allowImageMineTypes } from '../../../constants/imageMineTypes';
import { firebaseUploadMultiple, firebaseUploadSingle } from '../../../helper/firebaseHelper';

// ----------------------------------------------------------------------

const TAGS_OPTION = [
  'Toy Story 3',
  'Logan',
  'Full Metal Jacket',
  'Dangal',
  'The Sting',
  '2001: A Space Odyssey',
  "Singin' in the Rain",
  'Toy Story',
  'Bicycle Thieves',
  'The Kid',
  'Inglourious Basterds',
  'Snatch',
  '3 Idiots'
];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

ProductForm.propTypes = {};

export default function ProductForm() {
  const { t } = useLocales();
  const navigate = useNavigate();
  const theme = useTheme();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { list: brandsList } = useSelector((state) => state?.brand);
  const { list: categoriesList } = useSelector((state) => state?.category);
  const [specifications, setSpecifications] = useState([{ id: 1, name: '', value: '' }]);
  const [isErrorSpecifications, setIsErrorSpecifications] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(-1);
  const [validationThumbnail, setValidationThumbnail] = useState(false);
  const [validationBrand, setValidationBrand] = useState(false);
  const [validationCategory, setValidationCategory] = useState(false);
  const [urlsPictures, setUrlsPictures] = useState([]);

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

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
    if (!values.brand) {
      setValidationBrand(true);
    }
    if (!values.category) {
      setValidationCategory(true);
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
    return !!(uploadImage && values.brand && values.category);
  };

  const handleSave = () => {
    if (validationCustomer()) {
      if (!uploadImage || typeof uploadImage === 'string') {
        if (typeof uploadImage === 'string') {
          try {
            const productData = handleAddDataForProduct(uploadImage);
            dispatch(createProduct(productData));
            enqueueSnackbar(t('products.add-success'), {
              variant: 'success'
            });
            navigate(PATH_DASHBOARD.app.products.list);
          } catch (e) {
            enqueueSnackbar(t('products.error'), {
              variant: 'error'
            });
          }
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
          try {
            const productData = handleAddDataForProduct(url);
            dispatch(createProduct(productData));
            enqueueSnackbar(t('products.add-success'), {
              variant: 'success'
            });
            navigate(PATH_DASHBOARD.app.products.list);
          } catch (e) {
            enqueueSnackbar(t('products.error'), {
              variant: 'error'
            });
          }
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

  const handleAddDataForProduct = (url) => {
    const product = {
      name: values.name,
      variantName: values?.variantName,
      desc: values.description,
      sku: values.sku,
      quantity: values.quantity,
      warrantyPeriod: values.warrantyPeriod,
      origin: values?.origin.label,
      brandId: values.brand,
      categoryId: values.category,
      tags: values.tags,
      price: values.price,
      marketPrice: values.marketPrice,
      thumbnail: url,
      pictures: urlsPictures[0],
      video: values.video
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
    name: Yup.string().required(t('products.name-validation')),
    description: Yup.string().required(t('products.desc-validation')),
    sku: Yup.string().required(t('products.sku-validation')),
    price: Yup.number().required(t('products.price-validation')),
    marketPrice: Yup.number().required(t('products.market-price-validation'))
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      variantName: '',
      description: '',
      sku: '',
      quantity: 1,
      warrantyPeriod: 12,
      origin: '',
      brand: '',
      category: '',
      tags: [TAGS_OPTION[0]],
      price: '',
      marketPrice: '',
      thumbnail: '',
      pictures: [],
      video: '',
      taxes: true
    },
    validationSchema: NewProductSchema,
    onSubmit: async () => {
      handleSave();
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

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label={t('products.name')}
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <TextField fullWidth label="Loại sản phẩm" {...getFieldProps('variantName')} />

                  <div>
                    <LabelStyle>{t('products.desc')}</LabelStyle>
                    <QuillEditor
                      simple
                      id="product-description"
                      value={values.description}
                      onChange={(val) => setFieldValue('description', val)}
                      error={Boolean(touched.description && errors.description)}
                    />
                    {touched.description && errors.description && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.description && errors.description}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>
              </Card>

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
                      label={t('products.thumbnail')}
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
                      {t('products.pictures')}
                      <Typography component="span" variant="subtitle4" sx={{ color: 'primary.main' }}>
                        &nbsp;{t('products.pictures-note')}
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
                  <TextField fullWidth label={t('products.video')} {...getFieldProps('video')} />
                </Stack>
              </Card>
            </Stack>
          </Grid>

          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
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
                  <TextField
                    type="number"
                    fullWidth
                    label={t('products.warranty-period')}
                    {...getFieldProps('warrantyPeriod')}
                    defaultValue={12}
                  />
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <CountryPicker
                    label={t('products.origin')}
                    onChange={(event, label) => {
                      setFieldValue('origin', label);
                    }}
                    required
                    fullWidth
                  />

                  <Autocomplete
                    required
                    fullWidth
                    options={brandsList.filter((x) => !x.isHide && x._id !== values.brand)}
                    getOptionLabel={(option) => option.name}
                    value={brandsList.find((c) => c.slug === values.brand)}
                    onChange={(e, newValue) => {
                      setFieldValue('brand', newValue?._id);
                      setValidationBrand(false);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t('products.brand')}
                        margin="none"
                        error={Boolean(validationBrand)}
                      />
                    )}
                    error={Boolean(true)}
                  />
                  <Link to={PATH_DASHBOARD.app.brands} color="inherit" component={RouterLink}>
                    <Typography
                      variant="inherit"
                      sx={{
                        marginTop: theme.spacing(-2),
                        marginLeft: theme.spacing(1),
                        fontSize: 'small'
                      }}
                    >
                      <a>
                        <Typography component="span" variant="subtitle4" sx={{ color: 'primary.main' }}>
                          &nbsp;{t('products.brand-add')}
                        </Typography>
                      </a>
                    </Typography>
                  </Link>

                  <Autocomplete
                    fullWidth
                    options={categoriesList.filter((x) => !x.isHide && x._id !== values?.category)}
                    getOptionLabel={(option) => option.name}
                    value={categoriesList.find((c) => c.slug === values?.category)}
                    onChange={(e, newValue) => {
                      setFieldValue('category', newValue?._id);
                      setValidationCategory(false);
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t('products.category')}
                        margin="none"
                        error={Boolean(validationCategory)}
                      />
                    )}
                  />
                  <Link to={PATH_DASHBOARD.app.brands} color="inherit" component={RouterLink}>
                    <Typography
                      variant="inherit"
                      sx={{
                        marginTop: theme.spacing(-2),
                        marginLeft: theme.spacing(1),
                        fontSize: 'small'
                      }}
                    >
                      <a>
                        <Typography component="span" variant="subtitle4" sx={{ color: 'primary.main' }}>
                          &nbsp;{t('products.category-add')}
                        </Typography>
                      </a>
                    </Typography>
                  </Link>

                  <Autocomplete
                    multiple
                    freeSolo
                    value={values.tags}
                    onChange={(event, newValue) => {
                      setFieldValue('tags', newValue);
                    }}
                    options={TAGS_OPTION.map((option) => option)}
                    renderTags={(value, getTagProps) =>
                      value.map((option, index) => (
                        <Chip key={option} size="small" label={option} {...getTagProps({ index })} />
                      ))
                    }
                    renderInput={(params) => <TextField label="Tags" {...params} />}
                  />
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
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

                <FormControlLabel
                  control={<Switch {...getFieldProps('taxes')} checked={values.taxes} />}
                  label={t('products.price-includes-taxes')}
                  sx={{ mt: 2 }}
                />
              </Card>

              <Button fullWidth variant="contained" size="large" onClick={handleSubmit}>
                {t('products.create')}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
