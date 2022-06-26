// icon
import { Icon } from '@iconify/react';
import arrowIosForwardFill from '@iconify/icons-eva/arrow-ios-forward-fill';
import clockFill from '@iconify/icons-eva/clock-fill';
import roundVerified from '@iconify/icons-ic/round-verified';
import roundVerifiedUser from '@iconify/icons-ic/round-verified-user';
//
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import SimpleBarReact from 'simplebar-react';
// material
import { alpha, experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import { Box, Button, Tab, Card, Grid, Divider, Container, Typography, Rating, Stack } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../redux/slices/productSlice';
import { trackingViewCount, trackingViewTime } from '../../redux/slices/userBehaviorSlice';
import * as api from '../../api';
import { getRelatedItems } from '../../api/fpt';
// hooks
import { useLocales, useInterval } from '../../hooks';
// components
import Page from '../../components/Page';
import LoadingScreen from '../../components/LoadingScreen';
import Markdown from '../../components/Markdown';
import { ProductDetailsReview } from '../../components/dashboard/product-details';
import { CarouselThumbnail } from '../../components/carousel';
import { ProductCarousel, ProductList, ProductVariantInfo } from '../../components/e-commerce';
//
import { fShortenNumber } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

const formatVideoYoutubeEmbed = (link) => {
  if (link.includes('://www.youtube.com/')) return link.replace('://www.youtube.com/', '://www.youtube.com/embed/');
  if (link.includes('://youtube.com/')) return link.replace('://youtube.com/', '://www.youtube.com/embed/');
  if (link.includes('://youtu.be/')) return link.replace('://youtu.be/', '://www.youtube.com/embed/');
  return link;
};

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  justifyContent: 'center',
  height: theme.spacing(8),
  marginBottom: theme.spacing(3),
  color: theme.palette.primary.main,
  backgroundColor: `${alpha(theme.palette.primary.main, 0.08)}`
}));

// ----------------------------------------------------------------------

export default function ProductDetailPage() {
  const { t } = useLocales();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { slug: productSlug } = useParams();
  const { item: product, isLoading } = useSelector((state) => state.product);

  const [images, setImages] = useState([]);
  const [tab, setTab] = useState('1');

  const [selectedV, setSelectedV] = useState(null);

  const [isLoadingRelated, setIsLoadingRelated] = useState(false);
  const [relatedItems, setRelatedItems] = useState([]);

  async function fetchRelatedItems(productId) {
    setIsLoadingRelated(true);
    try {
      const fptRes = await getRelatedItems(productId);
      const listIds = fptRes.data.data.map((x) => x.id);
      const { data } = await api.getRelatedProduct(listIds.slice(0, 10));
      setRelatedItems(data.data);
    } catch (e) {
      console.log('error when fetch related products', e);
    }
    setIsLoadingRelated(false);
  }

  useEffect(() => {
    dispatch(getProductById(productSlug));
  }, [dispatch, productSlug]);

  useEffect(() => {
    setSelectedV(product?.variants?.[0]);
  }, [product]);

  useEffect(() => {
    if (product && selectedV) {
      setImages([selectedV?.thumbnail, ...selectedV?.pictures]);
    }
  }, [product, selectedV]);

  useEffect(() => {
    if (product?._id) {
      fetchRelatedItems(product._id);
      dispatch(trackingViewCount({ productId: product._id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product?._id]);

  useInterval(
    () => {
      if (product?._id) {
        dispatch(trackingViewTime({ productId: product?._id, viewTime: 1 }));
      }
    },
    1,
    [product?._id]
  );

  // eslint-disable-next-line no-unused-vars
  const handleChangeTab = (_e, newValue) => {
    setTab(newValue);
  };

  const handleChangeVariant = (newVariant) => {
    setSelectedV(newVariant);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  const productMoreInfos = [
    {
      title: t('products.infor-1-title'),
      description: t('products.infor-1-content'),
      icon: roundVerified
    },
    {
      title: t('products.infor-2-title'),
      description: t('products.infor-2-content'),
      icon: clockFill
    }
  ];

  if (product?.warrantyPeriod) {
    const warrantyPeriod = product?.warrantyPeriod;
    productMoreInfos.push({
      title: t('products.infor-3-title'),
      description: t('products.infor-3-content', { warrantyPeriod }),
      icon: roundVerifiedUser
    });
  }

  return (
    <Page title={(product?.name?.concat(' - ') || '') + t('home.page-title')}>
      <Container maxWidth="lg" sx={{ paddingTop: 2, paddingBottom: 5 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <Typography component="h2" variant="h4">
            {product?.name}
          </Typography>
          <Stack spacing={0.5} direction="row" alignItems="center" sx={{ mb: 2 }}>
            <Rating value={product?.rates?.length || 4.5} precision={0.1} readOnly />
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              ({fShortenNumber(product?.views)}
              &nbsp;lượt xem)
            </Typography>
          </Stack>
        </Box>

        <Card>
          <Grid container>
            <Grid item xs={12} md={6} lg={7} sx={{ marginBottom: theme.spacing(1) }}>
              <CarouselThumbnail carousels={images.map((x) => ({ image: x }))} />
            </Grid>
            <Grid item xs={12} md={6} lg={5}>
              {product?.variants && (
                <ProductVariantInfo
                  allVariants={product.variants}
                  productId={product._id}
                  productName={product.name}
                  selectedVariant={selectedV}
                  onChangeVariant={handleChangeVariant}
                />
              )}
            </Grid>
          </Grid>
        </Card>

        <Grid container sx={{ my: 4 }}>
          {productMoreInfos.map((item) => (
            <Grid item xs={12} md={4} key={item.title}>
              <Box sx={{ my: 2, mx: 'auto', maxWidth: 280, textAlign: 'center' }}>
                <IconWrapperStyle>
                  <Icon icon={item.icon} width={36} height={36} />
                </IconWrapperStyle>
                <Typography variant="subtitle1" gutterBottom>
                  {item.title}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{item.description}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>

        {/* <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <ProductCarousel products={relatedItems} isLoading={isLoadingRelated} />
          </Grid>
        </Grid> */}

        <Card>
          <TabContext value={tab}>
            <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
              <TabList onChange={handleChangeTab}>
                <Tab disableRipple value="1" label={t('home.product-desc')} />
                {product?.video && (
                  <Tab disableRipple value="2" label="Video" sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }} />
                )}
                <Tab
                  disableRipple
                  value="3"
                  label={t('home.review')}
                  sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                />
              </TabList>
            </Box>
            <Divider />
            <TabPanel value="1">
              <SimpleBarReact style={{ maxHeight: '600px' }}>
                <Box sx={{ p: 3 }}>
                  <Markdown children={product?.desc} />
                </Box>
              </SimpleBarReact>
            </TabPanel>
            {product?.video && (
              <TabPanel value="2">
                <iframe
                  width="1280"
                  height="720"
                  src={formatVideoYoutubeEmbed(product?.video)}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </TabPanel>
            )}
            <TabPanel value="3">
              <ProductDetailsReview product={product} />
            </TabPanel>
          </TabContext>
        </Card>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h5" component="h2" sx={{ padding: 0, mt: 5, mb: 2 }}>
            {t('products.list-product-same')}
          </Typography>
          <Button color="inherit" href={`/related/${product?.slug}`} endIcon={<Icon icon={arrowIosForwardFill} />}>
            {t('common.see-more')}
          </Button>
        </Box>
        <ProductList products={relatedItems} isLoading={isLoadingRelated} limit={5} />
      </Container>
    </Page>
  );
}
