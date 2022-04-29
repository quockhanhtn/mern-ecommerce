import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
import { Box, Container, Card, CardContent, Stack, Typography } from '@material-ui/core';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { getProductById } from '../../redux/slices/productSlice';
import * as api from '../../api';
import { getRecommendation } from '../../api/fpt';
// hooks
import { useLocales } from '../../hooks';
// components
import Page from '../../components/Page';
import ProductList from '../../components/e-commerce/ProductList';
import { ThumbImgStyle } from '../../components/@styled';
//
import { fCurrency } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

const ContentStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  width: '100%',
  paddingTop: theme.spacing(2),
  paddingBottom: theme.spacing(10),
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 100 : 800]
}));

// ----------------------------------------------------------------------

const LIMIT = 15;

export default function ProductRelatedPage() {
  const { t, currentLang } = useLocales();
  const dispatch = useDispatch();
  const { slug: productSlug } = useParams();
  const { item: product } = useSelector((state) => state.product);

  const [isLoadingRelated, setIsLoadingRelated] = useState(false);
  const [listIds, setListIds] = useState([]);
  const [relatedItems, setRelatedItems] = useState([]);
  const [page, setPage] = useState(-1);
  const [hasNextPage, setHasNextPage] = useState(false);

  async function fetchRelatedIds(productId) {
    try {
      const fptRes = await getRecommendation(productId);
      const ids = fptRes.data.data.map((x) => x.replace('{', '').replace('}', ''));
      setListIds([...ids]);
      setPage(0); // trigger to call useEffect([page])
    } catch (e) {
      console.log('error when fetch related products', e);
    }
  }

  async function fetchRelatedItems() {
    setIsLoadingRelated(true);
    try {
      const { data } = await api.getRelatedProduct(listIds.slice(page * LIMIT, page * LIMIT + LIMIT));
      setRelatedItems((prev) => [...prev, ...data.data]);
      setHasNextPage(relatedItems.length < listIds.length);
    } catch (e) {
      console.log('error when fetch related products', e);
    }
    setIsLoadingRelated(false);
  }

  useEffect(() => {
    dispatch(getProductById(productSlug));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSlug]);

  useEffect(() => {
    fetchRelatedIds(product?._id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?._id]);

  useEffect(() => {
    fetchRelatedItems();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handleLoadMore = () => {
    setPage((page) => page + 1);
  };

  return (
    <Page title={t('home.page-title')} id="move_top">
      <ContentStyle>
        <Container maxWidth="lg">
          <Stack spacing={5}>
            <Box>
              <Card sx={{ marginBottom: 1.5, padding: 3 }}>
                <CardContent sx={{ padding: 0, '&:last-child': { paddingBottom: 0 } }}>
                  <Typography variant="h5" component="h2" sx={{ padding: 0, paddingBottom: 3 }}>
                    SẢN PHẨM TƯƠNG TỰ
                  </Typography>
                  <Stack direction="row">
                    <ThumbImgStyle width={200} height={200} src={product?.variants[0].thumbnail} objectFit="contain" />
                    <Stack direction="column">
                      <Typography component="h2" variant="h4">
                        {product?.name}
                      </Typography>
                      <Typography variant="h4" component="span">
                        {product?.variants[0].price
                          ? fCurrency(product?.variants[0].price, currentLang.value)
                          : t('product.free')}
                        <Box
                          component="span"
                          sx={{ ml: 3, color: 'text.disabled', textDecoration: 'line-through', fontSize: '75%' }}
                        >
                          {product?.variants[0].marketPrice &&
                            fCurrency(product?.variants[0].marketPrice, currentLang.value)}
                        </Box>
                      </Typography>
                    </Stack>
                  </Stack>
                </CardContent>
              </Card>
              <ProductList products={relatedItems} isLoading={isLoadingRelated} limit={LIMIT} />
            </Box>
            {hasNextPage && (
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <LoadingButton
                  variant="outlined"
                  sx={{ backgroundColor: 'white', width: '50%' }}
                  onClick={handleLoadMore}
                  isLoading={isLoadingRelated}
                >
                  {`Xem thêm ${listIds?.length - (page + 1) * LIMIT} sản phẩm`}
                </LoadingButton>
              </Box>
            )}
          </Stack>
        </Container>
      </ContentStyle>
    </Page>
  );
}
