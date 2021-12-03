import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import {
  Card,
  Chip,
  Grid,
  Stack,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  Link,
  Button
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { QuillEditor } from '../../../components/editor';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useLocales from '../../../hooks/useLocales';
import { getAllBrands } from '../../../actions/brands';
import { getAllCategories } from '../../../actions/categories';
import { getProductById, updateProduct } from '../../../actions/products';
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

PageProductEdit.propTypes = {
  isEdit: PropTypes.bool,
  currentProduct: PropTypes.object
};

export default function PageProductEdit() {
  const { t } = useLocales();
  const navigate = useNavigate();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { item: currentProduct } = useSelector((state) => state.product);
  const { list: brandsList } = useSelector((state) => state.brand);
  const { list: categoriesList } = useSelector((state) => state.category);
  const [validationBrand, setValidationBrand] = useState(false);
  const [validationCategory, setValidationCategory] = useState(false);

  useEffect(() => {
    dispatch(getAllBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllCategories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProductById(id));
  }, [id]);

  const validationCustomer = () => {
    if (!values.brand) {
      setValidationBrand(true);
    }
    if (!values.category) {
      setValidationCategory(true);
    }
    return !!(values.brand && values.category);
  };

  const handleSave = () => {
    if (validationCustomer()) {
      const productData = handleAddDataForProduct();
      if (currentProduct) {
        dispatch(updateProduct(currentProduct._id, productData));
        enqueueSnackbar(`Update product ${currentProduct.name} successfully!`, {
          variant: 'success'
        });
        navigate(PATH_DASHBOARD.app.products.list);
      }
    }
  };

  const handleAddDataForProduct = () => {
    const product = {
      name: values.name,
      desc: values.description,
      warrantyPeriod: values.warrantyPeriod,
      origin: values?.origin.label,
      brandId: values.brand,
      categoryId: values.category,
      tags: values.tags,
      video: values.video
    };
    return product;
  };

  const NewProductSchema = Yup.object().shape({
    name: Yup.string().required(t('dashboard.products.name-validation')),
    description: Yup.string().required(t('dashboard.products.desc-validation'))
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentProduct?.name || '',
      description: currentProduct?.desc || '',
      warrantyPeriod: currentProduct?.warrantyPeriod || 12,
      origin: currentProduct?.origin || '',
      brand: currentProduct?.brand || '',
      category: currentProduct?.category || '',
      tags: currentProduct?.tags || [TAGS_OPTION[0]],
      video: currentProduct?.video || ''
    },
    validationSchema: NewProductSchema,
    onSubmit: async () => {
      handleSave();
    }
  });

  const { errors, values, touched, handleSubmit, setFieldValue, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off">
        <Stack direction="row" spacing={3} sx={{ justifyContent: 'space-between', marginBottom: theme.spacing(2) }}>
          <Typography variant="h4" gutterBottom>
            {t('dashboard.products.general-info')}
          </Typography>
        </Stack>
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Stack spacing={3}>
              <Card sx={{ p: 3 }}>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    label={t('dashboard.products.name')}
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <div>
                    <LabelStyle>{t('dashboard.products.desc')}</LabelStyle>
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
                  <TextField fullWidth label={t('dashboard.products.video')} {...getFieldProps('video')} />
                </Stack>
              </Card>
            </Stack>
          </Grid>
          <Grid item xs={12} md={4}>
            <Stack spacing={3}>
              {currentProduct?.brand?.name !== undefined &&
                currentProduct?.category?.name !== undefined &&
                currentProduct?.origin && (
                  <Card sx={{ p: 3 }}>
                    <Stack spacing={3}>
                      <TextField
                        type="number"
                        fullWidth
                        label={t('dashboard.products.warranty-period')}
                        {...getFieldProps('warrantyPeriod')}
                        defaultValue={12}
                      />
                      {/* <Autocomplete */}
                      {/*  required */}
                      {/*  fullWidth */}
                      {/*  // defaultValue={{ code: 'CN', label: 'China', phone: '86' }} */}
                      {/*  defaultValue={countries.find((c) => c.label === currentProduct.origin)} */}
                      {/*  options={countries.map((country) => ({ */}
                      {/*    label: country.label */}
                      {/*  }))} */}
                      {/*  onChange={(event, label) => { */}
                      {/*    setFieldValue('origin', label); */}
                      {/*  }} */}
                      {/*  getOptionLabel={(option) => option.label} */}
                      {/*  renderInput={(params) => <TextField {...params} label="Origin" margin="none" />} */}
                      {/* /> */}
                      <Autocomplete
                        required
                        fullWidth
                        defaultValue={currentProduct.brand}
                        options={brandsList.filter((x) => !x.isHide && x._id !== currentProduct?.brand)}
                        getOptionLabel={(option) => option.name}
                        value={brandsList.find((c) => c.slug === currentProduct?.brand)}
                        onChange={(e, newValue) => {
                          setFieldValue('brand', newValue?._id);
                          setValidationBrand(false);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t('dashboard.products.brand')}
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
                              &nbsp;{t('dashboard.products.brand-add')}
                            </Typography>
                          </a>
                        </Typography>
                      </Link>
                      <Autocomplete
                        fullWidth
                        defaultValue={currentProduct.category}
                        options={categoriesList.filter((x) => !x.isHide && x._id !== currentProduct?.category)}
                        getOptionLabel={(option) => option.name}
                        value={categoriesList.find((c) => c.slug === currentProduct?.category)}
                        onChange={(e, newValue) => {
                          setFieldValue('category', newValue?._id);
                          setValidationCategory(false);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            label={t('dashboard.products.category')}
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
                              &nbsp;{t('dashboard.products.category-add')}
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
                )}
              <Button fullWidth variant="contained" size="large" onClick={handleSubmit}>
                {t('dashboard.products.save')}
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
