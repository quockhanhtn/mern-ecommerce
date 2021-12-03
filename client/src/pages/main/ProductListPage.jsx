import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// components
import {
  Autocomplete,
  Box,
  Button,
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
  const navigate = useNavigate();

  const brandSlug = query.get('b');
  const categorySlug = query.get('c');
  const search = query.get('search');

  const { list: products, isLoading: isLoadingProduct, pagination } = useSelector((state) => state.product);

  const { listSimple: categoryList } = useSelector((state) => state.category);
  const { listSimple: brandList } = useSelector((state) => state.brand);

  const [categoriesSelected, setCategoriesSelected] = useState([]);
  const [brandsSelected, setBrandsSelected] = useState([]);
  const [searchText, setSearchText] = useState(decodeURIComponent(search || ''));

  useEffect(() => {
    setCategoriesSelected([...categoryList.filter((x) => categorySlug?.split(',').includes(x.slug))]);
    setBrandsSelected([...brandList.filter((x) => brandSlug?.split(',').includes(x.slug))]);

    const b = brandsSelected.map((x) => x._id).join(',');
    const c = categoriesSelected.map((x) => x._id).join(',');
    dispatch(getAllProducts(searchText, b, c, 1, 100));
  }, [categorySlug, brandSlug, search]);

  const handleSearchTextKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCategoriesChange = (e, value) => {
    setCategoriesSelected(value);
  };

  const handleBrandsChange = (e, value) => {
    setBrandsSelected(value);
  };

  const handleSearch = () => {
    const b = brandsSelected.map((x) => x._id).join(',');
    const bQuery = brandsSelected.map((x) => x.slug).join(',');
    const c = categoriesSelected.map((x) => x._id).join(',');
    const cQuery = categoriesSelected.map((x) => x.slug).join(',');

    dispatch(getAllProducts(searchText, b, c, 1, 100));
    navigate(`/q?c=${cQuery}&b=${bQuery}&search=${encodeURIComponent(searchText)}`);
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
                      label={t('dashboard.products.name')}
                      value={searchText}
                      onChange={handleSearchTextChange}
                      onKeyDown={handleSearchTextKeyDown}
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
                            value={categoriesSelected}
                            filterSelectedOptions
                            renderInput={(params) => <TextField {...params} label={t('dashboard.categories.title')} />}
                            onChange={handleCategoriesChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                            multiple
                            fullWidth
                            options={brandList}
                            getOptionLabel={(item) => item?.name}
                            value={brandsSelected}
                            filterSelectedOptions
                            renderInput={(params) => <TextField {...params} label={t('dashboard.brands.title')} />}
                            onChange={handleBrandsChange}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                    <Box>
                      <Button variant="contained" color="primary" sx={{ paddingX: 5 }} onClick={handleSearch}>
                        {t('home.search')}
                      </Button>
                    </Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                      {`Tìm thấy ${pagination?.total || 0}/${pagination?.countAll || 0} sản phẩm`}
                    </Typography>
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
