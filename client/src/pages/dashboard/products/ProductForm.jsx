import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import {
  Card,
  Chip,
  Grid,
  Stack,
  Radio,
  Switch,
  Select,
  TextField,
  InputLabel,
  Typography,
  RadioGroup,
  FormControl,
  Autocomplete,
  InputAdornment,
  FormHelperText,
  FormControlLabel,
  Link,
  Button
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { QuillEditor } from '../../../components/editor';
import { UploadMultiFile, UploadSingleFile } from '../../../components/upload';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useLocales from '../../../hooks/useLocales';
import countries from '../../../utils/countries';
import { getAllBrands } from '../../../actions/brands';
import { getAllCategories } from '../../../actions/categories';

// ----------------------------------------------------------------------

const CATEGORY_OPTION = [
  { group: 'Clothing', classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather'] },
  { group: 'Tailored', classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats'] },
  { group: 'Accessories', classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'] }
];

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

ProductForm.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object
};

export default function ProductForm({ isEdit, currentProduct }) {
  const { t } = useLocales();
  const navigate = useNavigate();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { list: brandsList, isLoadingBrand, hasErrorBrand } = useSelector((state) => state.brand);
  const { list: categoriesList, isLoadingCategory, hasErrorCategory } = useSelector((state) => state.category);
  const [specifications, setSpecifications] = useState([{ id: 1, name: '', key: '', value: '' }]);
  const [isErrorSpecifications, setIsErrorSpecifications] = useState(false);

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
    if (
      specifications[indexCurrent].name === '' ||
      specifications[indexCurrent].key === '' ||
      specifications[indexCurrent].value === ''
    ) {
      setIsErrorSpecifications(true);
      return;
    }
    setSpecifications([...specifications, { id: specifications.length + 1, name: '', key: '', value: '' }]);
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
        <Stack
          key={inputField.id}
          direction="row"
          justifyContent="flex-between"
          spacing={3}
          sx={{ marginBottom: theme.spacing(2) }}
        >
          <TextField
            name="name"
            label="Specifications name"
            size="small"
            value={inputField.name}
            error={isErrorSpecifications && inputField.name === ''}
            onChange={(event) => handleChangeInput(inputField.id, event)}
          />
          <TextField
            name="key"
            label="Specifications key"
            size="small"
            value={inputField.key}
            error={isErrorSpecifications && inputField.key === ''}
            onChange={(event) => handleChangeInput(inputField.id, event)}
          />
          <TextField
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

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
    code: Yup.string().required('Code is required'),
    sku: Yup.string().required('Sku is required'),
    pictures: Yup.array().min(1, 'Pictures is required'),
    price: Yup.number().required('Price is required'),
    marketPrice: Yup.number().required('Market Price is required')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentProduct?.name || '',
      variantName: currentProduct?.variantName || '',
      description: currentProduct?.description || '',
      code: currentProduct?.code || '',
      sku: currentProduct?.sku || '',
      quantity: currentProduct?.quantity || 0,
      warrantyPeriod: currentProduct?.warrantyPeriod || 12,
      origin: currentProduct?.origin || '',
      brand: currentProduct?.brand || '',
      category: currentProduct?.category || '',
      tags: currentProduct?.tags || [TAGS_OPTION[0]],
      price: currentProduct?.price || '',
      marketPrice: currentProduct?.marketPrice || '',
      thumbnail: currentProduct?.thumbnail || '',
      pictures: currentProduct?.pictures || [],
      video: currentProduct?.video || '',
      taxes: true
    },
    validationSchema: NewProductSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      values.addSpecifications = specifications;
      console.log(values);
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

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
                  <div>
                    <UploadSingleFile
                      label="Thumbnail"
                      // file={uploadImage}
                      // setFile={setUploadImage}
                      // onDrop={handleDropSingleFile}
                      // uploadPercent={uploadPercent}
                      accepted="image/*"
                      maxSize={3145728}
                      error={Boolean(touched.thumbnail && errors.thumbnail)}
                    />
                    {touched.thumbnail && errors.thumbnail && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.thumbnail && errors.thumbnail}
                      </FormHelperText>
                    )}
                  </div>
                  <div>
                    <LabelStyle>Add more picture</LabelStyle>
                    <UploadMultiFile
                      showPreview
                      maxSize={3145728}
                      accept="image/*"
                      files={values.pictures}
                      onDrop={handleDrop}
                      onRemove={handleRemove}
                      onRemoveAll={handleRemoveAll}
                      error={Boolean(touched.pictures && errors.pictures)}
                    />
                    {touched.pictures && errors.pictures && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.pictures && errors.pictures}
                      </FormHelperText>
                    )}
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
                    defaultValue={0}
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
                    options={countries.map((country) => ({
                      label: country.label
                    }))}
                    getOptionLabel={(option) => option.label}
                    renderInput={(params) => <TextField {...params} label="Origin" margin="none" />}
                  />
                  <FormControl fullWidth>
                    <TextField
                      select
                      fullWidth
                      label="Brand"
                      placeholder="Brand"
                      {...getFieldProps('brand')}
                      SelectProps={{ native: true }}
                      error={Boolean(touched.brand && errors.brand)}
                      helperText={touched.brand && errors.brand}
                      defaultValue={brandsList[0]?.name}
                    >
                      {brandsList.map((option) => (
                        <option key={option._id} value={option._id}>
                          {option.name}
                        </option>
                      ))}
                    </TextField>
                    <Link to={PATH_DASHBOARD.app.brands} color="inherit" component={RouterLink}>
                      <Typography
                        variant="inherit"
                        sx={{
                          marginTop: theme.spacing(1),
                          marginLeft: theme.spacing(1),
                          fontSize: 'small'
                        }}
                      >
                        Add new brand here.
                      </Typography>
                    </Link>
                  </FormControl>

                  <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select label="Category" native {...getFieldProps('category')} value={values.category}>
                      {categoriesList.map((category) => (
                        <optgroup key={category._id} label={category.name}>
                          {category.children.map((children) => (
                            <option key={children} value={children._id}>
                              {children.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </Select>
                    <Link to={PATH_DASHBOARD.app.categories} color="inherit" component={RouterLink}>
                      <Typography
                        variant="inherit"
                        sx={{
                          marginTop: theme.spacing(1),
                          marginLeft: theme.spacing(1),
                          fontSize: 'small'
                        }}
                      >
                        Add new category here.
                      </Typography>
                    </Link>
                  </FormControl>
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

              <LoadingButton
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                loading={isSubmitting}
                onClick={handleSubmit}
              >
                {!isEdit ? 'Create Product' : 'Save Changes'}
              </LoadingButton>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
