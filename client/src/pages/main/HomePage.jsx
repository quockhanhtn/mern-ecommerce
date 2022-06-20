import { useEffect, useState } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import { Box, Container, Card, CardContent, CardHeader, Stack, Typography } from '@material-ui/core';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts, getProductForYou } from '../../redux/slices/productSlice';
// hooks
import { useLocales, useAuth } from '../../hooks';
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import { CarouselAnimation, CarouselMiniList } from '../../components/carousel';
import { ProductCarousel, ProductList } from '../../components/e-commerce';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(10),
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 100 : 800]
}));

// ----------------------------------------------------------------------

const LIMIT = 20;

export default function HomePage() {
  const { t } = useLocales();
  const { user } = useAuth();

  const dispatch = useDispatch();
  const { listSimple: brandsListRaw, isLoading: isLoadingBrand } = useSelector((state) => state.brand);
  const { listSimple: discountsListRaw } = useSelector((state) => state.discount);
  const {
    list: productsApi,
    isLoading: isLoadingProduct,
    pagination: productPagination,
    productForYou
  } = useSelector((state) => state.product);
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);

  const brandsList = brandsListRaw.map((x) => ({
    title: x.name,
    image: x.image,
    description: x.description,
    path: `/q?b=${x.slug}`
  }));
  const discountList = discountsListRaw.map((x) => ({
    _id: x._id,
    image: x.image || 'https://source.unsplash.com/random/800x600',
    title: x.name,
    link: `/d/${x.code}`,
    description: x.desc
  }));

  useEffect(() => {
    dispatch(getProductForYou(user?._id || ''));
  }, [dispatch, user?._id]);

  useEffect(() => {
    dispatch(getAllProducts('', '', '', page, LIMIT));
  }, [dispatch, page]);

  useEffect(() => {
    setProducts((prev) => [...prev, ...productsApi]);
  }, [productsApi]);

  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <Page title={t('home.page-title')} id="move_top">
      <ContentStyle>
        <Container maxWidth="lg">
          <Stack spacing={5}>
            {/* Discount carousel */}
            <CarouselAnimation items={discountList} />

            {/* Brand List carousel */}
            <Card>
              <CardHeader title={t('dashboard.brands.heading').toUpperCase()} />
              <CardContent>
                <CarouselMiniList
                  items={brandsList}
                  numberPerRow={2}
                  numberShow={2}
                  isLoading={isLoadingBrand}
                  width={200}
                  height={60}
                  isShowTitle={false}
                  imgObjectFit="contain"
                  otherSlickSetting={{
                    infinite: true,
                    swipeToSlide: true,
                    slidesPerRow: 2,
                    rows: 2,
                    responsive: [
                      {
                        breakpoint: 1024,
                        settings: { slidesToShow: 3, slidesToScroll: 3, infinite: true, dots: true }
                      },
                      {
                        breakpoint: 600,
                        settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 }
                      },
                      {
                        breakpoint: 480,
                        settings: { slidesToShow: 1, slidesToScroll: 1 }
                      }
                    ]
                  }}
                />
              </CardContent>
            </Card>

            {/* <Box>
              <Card sx={{ marginBottom: 1.5, padding: 3 }}>
                <CardContent sx={{ padding: 0, '&:last-child': { paddingBottom: 0 } }}>
                  <Box sx={{ display: 'flex', marginBottom: -1 }}>
                    <Typography variant="h5" component="h2" sx={{ padding: 0 }}>
                      SẢN PHẨM DÀNH CHO BẠN
                    </Typography>
                    <Label color="info" sx={{ ml: 1 }}>
                      Phù hợp nhất
                    </Label>
                  </Box>
                </CardContent>
              </Card>
              <ProductList products={productForYou.list} isLoading={productForYou.isLoading} />
            </Box> */}

            <Box>
              <Card sx={{ marginBottom: 1.5, padding: 3 }}>
                <CardContent sx={{ padding: 0, '&:last-child': { paddingBottom: 0 } }}>
                  <Box sx={{ display: 'flex', marginBottom: -1 }}>
                    <Typography variant="h5" component="h2" sx={{ padding: 0 }}>
                      SẢN PHẨM DÀNH CHO BẠN
                    </Typography>
                    <Label color="info" sx={{ ml: 1 }}>
                      Phù hợp nhất
                    </Label>
                  </Box>
                </CardContent>
              </Card>
              <ProductCarousel products={productForYou.list} isLoading={productForYou.isLoading} />
            </Box>

            <Box>
              <Card sx={{ marginBottom: 1.5, padding: 3 }}>
                <CardContent sx={{ padding: 0, '&:last-child': { paddingBottom: 0 } }}>
                  <Box sx={{ display: 'flex', marginBottom: -1 }}>
                    <Typography variant="h5" component="h2" sx={{ padding: 0 }}>
                      {t('products.heading').toUpperCase()}
                    </Typography>
                    <Label color="info" sx={{ ml: 1 }}>
                      {t('home.newest')}
                    </Label>
                  </Box>
                </CardContent>
              </Card>
              <ProductList products={products} isLoading={isLoadingProduct} limit={LIMIT} />
            </Box>
            {productPagination?.hasNextPage && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <LoadingButton
                  variant="outlined"
                  sx={{ backgroundColor: 'white', width: '50%' }}
                  onClick={handleLoadMore}
                  isLoading={isLoadingProduct}
                >
                  {`Xem thêm ${productPagination.countAll - productPagination.page * LIMIT} sản phẩm`}
                </LoadingButton>
              </Box>
            )}
          </Stack>
        </Container>
      </ContentStyle>
    </Page>
  );
}
