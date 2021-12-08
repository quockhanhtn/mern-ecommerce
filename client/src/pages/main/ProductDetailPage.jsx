import { Icon } from '@iconify/react';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import clockFill from '@iconify/icons-eva/clock-fill';
import roundVerified from '@iconify/icons-ic/round-verified';
import roundVerifiedUser from '@iconify/icons-ic/round-verified-user';
// material
import { alpha, experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import { Box, Tab, Card, Grid, Divider, Skeleton, Container, Typography } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getProductById } from '../../actions/products';
// hooks
import useLocales from '../../hooks/useLocales';
// components
import Page from '../../components/Page';
import LoadingScreen from '../../components/LoadingScreen';
import Markdown from '../../components/Markdown';
import {
  ProductDetailsCarousel,
  ProductDetailsReview,
  ProductDetailsSummary
} from '../../components/dashboard/product-details';

// ----------------------------------------------------------------------

const PRODUCT_DESCRIPTION = [
  {
    title: '100% Genuine',
    description: 'All products in the store are genuine products.',
    icon: roundVerified
  },
  {
    title: '10 Day Replacement',
    description: '10 days free product return for any reason.',
    icon: clockFill
  },
  {
    title: 'Year Warranty',
    description: 'Genuine warranty from the manufacturer.',
    icon: roundVerifiedUser
  }
];

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

const SkeletonLoad = (
  <Grid container spacing={3}>
    <Grid item xs={12} md={6} lg={7}>
      <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '100%', borderRadius: 2 }} />
    </Grid>
    <Grid item xs={12} md={6} lg={5}>
      <Skeleton variant="circular" width={80} height={80} />
      <Skeleton variant="text" height={240} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
      <Skeleton variant="text" height={40} />
    </Grid>
  </Grid>
);

export default function ProductDetailPage() {
  const { t } = useLocales();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { slug: productSlug } = useParams();
  const { item: product, isLoading } = useSelector((state) => state.product);
  const [images, setImages] = useState([]);
  const [tab, setTab] = useState('1');
  const [indexVariant, setIndexVariant] = useState(0);

  useEffect(() => {
    dispatch(getProductById(productSlug));
  }, [productSlug]);

  useEffect(() => {
    setImages([]);
    handleGatherPicture();
  }, [product, indexVariant]);

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleGatherPicture = () => {
    if (product?.variants?.[indexVariant].pictures.length > 0) {
      const temp = [...product?.variants[indexVariant].pictures];
      temp.push(product?.variants[indexVariant].thumbnail);
      setImages(temp);
    } else {
      const temp = [product?.variants?.[indexVariant].thumbnail];
      setImages(temp);
    }
  };

  const handleChangeIndexVariant = (index) => {
    setIndexVariant(index);
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Page title={(product?.name?.concat(' - ') || '') + t('home.page-title')}>
      <Container maxWidth="lg" sx={{ paddingY: 5 }}>
        <>
          <Card>
            <Grid container>
              <Grid item xs={12} md={6} lg={7} sx={{ marginBottom: theme.spacing(1) }}>
                <ProductDetailsCarousel images={images} />
              </Grid>
              <Grid item xs={12} md={6} lg={5}>
                <ProductDetailsSummary
                  isLoading={isLoading}
                  product={product}
                  indexVariant={indexVariant}
                  handleChangeIndexVariant={handleChangeIndexVariant}
                />
              </Grid>
            </Grid>
          </Card>
          <Grid container sx={{ my: 8 }}>
            {PRODUCT_DESCRIPTION.map((item) => (
              <Grid item xs={12} md={4} key={item.title}>
                <Box
                  sx={{
                    my: 2,
                    mx: 'auto',
                    maxWidth: 280,
                    textAlign: 'center'
                  }}
                >
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

          <Card>
            <TabContext value={tab}>
              <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                <TabList onChange={handleChangeTab}>
                  <Tab disableRipple value="1" label={t('home.product-desc')} />
                  <Tab
                    disableRipple
                    value="2"
                    label={t('home.review')}
                    sx={{ '& .MuiTab-wrapper': { whiteSpace: 'nowrap' } }}
                  />
                </TabList>
              </Box>
              <Divider />
              <TabPanel value="1">
                <Box sx={{ p: 3 }}>
                  <Markdown children={product.desc} />
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <ProductDetailsReview product={product} />
              </TabPanel>
            </TabContext>
          </Card>
        </>
      </Container>
    </Page>
  );
}
