// icons
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
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
import { LoadingButton } from '@material-ui/lab';
// hooks
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useQuery from '../../hooks/useQuery';
import useLocales from '../../hooks/useLocales';
// components
import Page from '../../components/Page';
import { ProductList } from '../../components/e-commerce';

import {
  initialSearch,
  searchProduct,
  setSelectedCategories,
  setSelectedBrands
} from '../../redux/slices/searchProductSlice';

// ----------------------------------------------------------------------

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

  const {
    isInitialized,
    categoryOpts,
    brandOpts,
    selectedCategories,
    selectedBrands,
    list: productsApi,
    isLoading: isLoadingProduct,
    pagination
  } = useSelector((state) => state.searchProduct);

  const [searchText, setSearchText] = useState(decodeURIComponent(search || ''));

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 10;

  useEffect(() => {
    dispatch(initialSearch());
  }, [dispatch]);

  useEffect(() => {
    const cs = [...categoryOpts.filter((x) => categorySlug?.split(',').includes(x.slug))];
    dispatch(setSelectedCategories(cs));
    const bs = [...brandOpts.filter((x) => brandSlug?.split(',').includes(x.slug))];
    dispatch(setSelectedBrands(bs));

    const b = selectedBrands.map((x) => x._id).join(',');
    const c = selectedCategories.map((x) => x._id).join(',');
    dispatch(searchProduct({ search: searchText, category: c, brand: b, page, limit }));

    console.log('searchpage', {
      cs,
      bs,
      selectedBrands,
      selectedCategories,
      categoryOpts,
      brandOpts,
      categorySlug,
      brandSlug,
      search,
      c,
      b,
      searchText
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, isInitialized, categorySlug, brandSlug, search, page]);

  useEffect(() => {
    if (page === 1) {
      setProducts([...productsApi]);
    } else {
      setProducts((prev) => [...prev, ...productsApi]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productsApi]);

  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  const handleSearchTextKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearchTextChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleCategoriesChange = (_e, value) => {
    dispatch(setSelectedCategories(value));
  };

  const handleBrandsChange = (_e, value) => {
    dispatch(setSelectedBrands(value));
  };

  const handleSearch = () => {
    const bQuery = selectedBrands.map((x) => x.slug).join(',');
    const cQuery = selectedCategories.map((x) => x.slug).join(',');

    setPage(1);
    dispatch(searchProduct({ search: searchText, page, limit }));
    navigate(`/q?c=${cQuery}&b=${bQuery}&search=${encodeURIComponent(searchText)}`);
  };

  return (
    <Page title={t('home.page-title')} id="move_top">
      <ContentStyle>
        <Container maxWidth="lg">
          <Stack spacing={5}>
            <Box>
              <Card sx={{ marginBottom: 1, padding: 2 }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Typography variant="h5" component="h2">
                      {t('products.heading').toUpperCase()}
                    </Typography>
                    <TextField
                      fullWidth
                      label={t('products.name')}
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
                            options={categoryOpts}
                            getOptionLabel={(item) => item.name}
                            value={selectedCategories}
                            filterSelectedOptions
                            renderInput={(params) => <TextField {...params} label={t('dashboard.categories.title')} />}
                            onChange={handleCategoriesChange}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Autocomplete
                            multiple
                            fullWidth
                            options={brandOpts}
                            getOptionLabel={(item) => item?.name}
                            value={selectedBrands}
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
                      {isLoadingProduct
                        ? 'Đang tìm kiếm'
                        : `Tìm thấy ${pagination?.total || 0}/${pagination?.countAll || 0} sản phẩm`}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
              <ProductList products={products} isLoading={isLoadingProduct} />
              {pagination?.hasNextPage && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                  <LoadingButton
                    variant="outlined"
                    sx={{ backgroundColor: 'white', width: '50%' }}
                    onClick={handleLoadMore}
                    loading={isLoadingProduct}
                  >
                    Xem thêm
                  </LoadingButton>
                </Box>
              )}
            </Box>
          </Stack>
        </Container>
      </ContentStyle>
    </Page>
  );
}
