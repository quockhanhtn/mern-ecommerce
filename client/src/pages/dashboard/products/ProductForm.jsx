import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import { QuillEditor } from '../../../components/editor';
import { UploadMultiFile, UploadSingleFile } from '../../../components/upload';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useLocales from '../../../hooks/useLocales';
import countries from '../../../utils/countries';
import { getAllBrands } from '../../../actions/brands';
import { getAllCategories } from '../../../actions/categories';
import { allowImageMineTypes } from '../../../constants/imageMineTypes';
import { MIconButton } from '../../../components/@material-extend';
import { firebaseUploadMultiple, firebaseUploadSingle } from '../../../helper/firebaseHelper';
import { createProduct } from '../../../actions/products';

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
            label="Specifications name"
            size="small"
            value={inputField.name}
            error={isErrorSpecifications && inputField.name === ''}
            onChange={(event) => handleChangeInput(inputField.id, event)}
          />
          <TextField
            fullWidth
            name="value"
            label="Specifications value"
            size="small"
            value={inputField.value}
            error={isErrorSpecifications && inputField.value === ''}
            onChange={(event) => handleChangeInput(inputField.id, event)}
          />
          <Button disabled={specifications.length === 1} onClick={() => handleRemoveFields(inputField.id)}>
            Remove
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
          const productData = handleAddDataForProduct(uploadImage);
          dispatch(createProduct(productData));
          enqueueSnackbar(t('dashboard.brands.edit-title'), {
            variant: 'success'
          });
          navigate(PATH_DASHBOARD.app.products.list);
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
          const productData = handleAddDataForProduct(url);
          dispatch(createProduct(productData));
          enqueueSnackbar(t('dashboard.brands.edit-title'), {
            variant: 'success'
          });
          navigate(PATH_DASHBOARD.app.products.list);
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
      code: values.code,
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
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    code: Yup.string().required('Code is required'),
    sku: Yup.string().required('Sku is required'),
    price: Yup.number().required('Price is required'),
    marketPrice: Yup.number().required('Market Price is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      variantName: '',
      description: '',
      code: '',
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
                    label="Product Name"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <TextField fullWidth label="Variant Name" {...getFieldProps('variantName')} />

                  <div>
                    <LabelStyle>Description</LabelStyle>
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
                  Add
                </Button>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <div onChange={() => setValidationThumbnail(false)}>
                    <UploadSingleFile
                      label="Thumbnail"
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
                      Add more picture.
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
                  <TextField fullWidth label="Link Video" {...getFieldProps('video')} />
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
                    label="Product Code"
                    {...getFieldProps('code')}
                    error={Boolean(touched.code && errors.code)}
                    helperText={touched.code && errors.code}
                  />
                  <TextField
                    fullWidth
                    label="Product SKU"
                    {...getFieldProps('sku')}
                    error={Boolean(touched.sku && errors.sku)}
                    helperText={touched.sku && errors.sku}
                  />
                  <TextField
                    type="number"
                    fullWidth
                    label="Quantity"
                    {...getFieldProps('quantity')}
                    defaultValue={1}
                    error={Boolean(touched.quantity && errors.quantity)}
                    helperText={touched.quantity && errors.quantity}
                  />
                  <TextField
                    type="number"
                    fullWidth
                    label="Warranty Period"
                    {...getFieldProps('warrantyPeriod')}
                    defaultValue={12}
                  />
                </Stack>
              </Card>

              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <Autocomplete
                    required
                    fullWidth
                    defaultValue={countries[0]}
                    options={countries.map((country) => ({
                      label: country.label
                    }))}
                    onChange={(event, label) => {
                      setFieldValue('origin', label);
                    }}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} label="Origin" margin="none" />}
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
                      <TextField {...params} label="Brand" margin="none" error={Boolean(validationBrand)} />
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
                      <a>Add new brand here.</a>
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
                      <TextField {...params} label="Category" margin="none" error={Boolean(validationCategory)} />
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
                      <a>Add new category here.</a>
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
                    label="Price"
                    {...getFieldProps('price')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      type: 'number'
                    }}
                    error={Boolean(touched.price && errors.price)}
                    helperText={touched.price && errors.price}
                  />

                  <TextField
                    fullWidth
                    placeholder="0.00"
                    label="Market Price"
                    {...getFieldProps('marketPrice')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">$</InputAdornment>,
                      type: 'number'
                    }}
                    error={Boolean(touched.marketPrice && errors.marketPrice)}
                    helperText={touched.marketPrice && errors.marketPrice}
                  />
                </Stack>

                <FormControlLabel
                  control={<Switch {...getFieldProps('taxes')} checked={values.taxes} />}
                  label="Price includes taxes"
                  sx={{ mt: 2 }}
                />
              </Card>

              <Button fullWidth variant="contained" size="large" onClick={handleSubmit}>
                Create Product
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
