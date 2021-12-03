import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import {
  Autocomplete,
  Box,
  Container,
  Card,
  CardContent,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography
} from '@material-ui/core';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllBrands } from '../../actions/brands';
import { getAllProducts } from '../../actions/products';
// hooks
import useQuery from '../../hooks/useQuery';
import useLocales from '../../hooks/useLocales';
// components
import Page from '../../components/Page';
import ProductList from '../../components/e-commerce/ProductList';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  // paddingTop: theme.spacing(0),
  // paddingBottom: theme.spacing(0),
  // paddingLeft: theme.spacing(0),
  // paddingRight: theme.spacing(0)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(10),
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 100 : 800]
}));

// ----------------------------------------------------------------------

export default function ProductListPage() {
  const query = useQuery();
  const { t } = useLocales();
  const dispatch = useDispatch();

  const brandSlug = query.get('b');
  const categorySlug = query.get('c');
  const search = query.get('search');

  const { list: products, isLoading: isLoadingProduct } = useSelector((state) => state.product);

  const { listSimple: categoryList } = useSelector((state) => state.category);
  const { listSimple: brandList } = useSelector((state) => state.brand);

  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [brandsSelected, setBrandsSelected] = useState([]);
  const [searchText, setSearchText] = useState(decodeURIComponent(search) || '');

  useEffect(() => {
    if (!brandList || brandList.length === 0) {
      dispatch(getAllBrands(true));
    }
  }, []);

  useEffect(() => {
    const brands = brandSlug?.split(',');
    const brandsId = [];
    brands?.forEach((b) => {
      const index = brandList.indexOf((x) => x.slug === b);
      if (index > -1) {
        brandsId.push(brandList[index]._id);
      }
    });
    console.log('brandsId', brandsId);
    setBrandsSelected(brandsId);
  }, [brandList]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <RootStyle title={t('home.page-title')} id="move_top">
      <ContentStyle>
        <Container maxWidth="lg">
          <Stack spacing={5}>
            <Box>
              <Card sx={{ marginBottom: 1.5, padding: 3 }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h5" component="h2">
                      {t('dashboard.products.heading').toUpperCase()}
                    </Typography>
                    <TextField
                      fullWidth
                      label="Filled"
                      value={searchText}
                      onChange={handleSearch}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icon icon={searchFill} />
                          </InputAdornment>
                        )
                      }}
                    />
                    <Box>
                      <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                            multiple
                            fullWidth
                            options={categoryList}
                            getOptionLabel={(item) => item.name}
                            defaultValue={[categoryList[0]]}
                            filterSelectedOptions
                            renderInput={(params) => <TextField {...params} label={t('dashboard.categories.title')} />}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                            multiple
                            fullWidth
                            options={brandList}
                            getOptionLabel={(item) => item?.name}
                            value={brandList.find((x) => brandsSelected.includes(x._id))}
                            filterSelectedOptions
                            renderInput={(params) => <TextField {...params} label={t('dashboard.brands.title')} />}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
              <ProductList products={products} isLoading={isLoadingProduct} />
            </Box>
          </Stack>
        </Container>
      </ContentStyle>
    </RootStyle>
  );
}
