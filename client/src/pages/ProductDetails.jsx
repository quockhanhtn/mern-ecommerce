import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import clockFill from '@iconify/icons-eva/clock-fill';
import roundVerified from '@iconify/icons-ic/round-verified';
import roundVerifiedUser from '@iconify/icons-ic/round-verified-user';
// material
import { alpha, experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
import { Box, Tab, Card, Grid, Divider, Skeleton, Container, Typography } from '@material-ui/core';
import { TabContext, TabList, TabPanel } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import Page from '../components/Page';
import { CartWidget } from '../components/dashboard/e-commerce';
import Markdown from '../components/Markdown';
import {
  ProductDetailsCarousel,
  ProductDetailsReview,
  ProductDetailsSummary
} from '../components/dashboard/product-details';
import { getAllProducts, getProductById } from '../actions/products';
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

export default function ProductDetails() {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [value, setValue] = useState('1');
  const { item: product } = useSelector((state) => state.product);
  const [images, setImages] = useState([]);
  const [indexVariant, setIndexVariant] = useState(0);

  useEffect(() => {
    dispatch(getProductById(slug));
  }, [slug]);

  useEffect(() => {
    setImages([]);
    handleGatherPicture();
  }, [product, indexVariant]);

  const handleChangeTab = (event, newValue) => {
    setValue(newValue);
  };

  const handleGatherPicture = () => {
    if (product?.variants[indexVariant].pictures.length > 0) {
      const temp = [...product?.variants[indexVariant].pictures];
      setImages(temp);
    } else {
      const temp = [product?.variants[indexVariant].thumbnail];
      setImages(temp);
    }
  };

  const handleChangeIndexVariant = (index) => {
    setIndexVariant(index);
  };

  return (
    <Page title="Ecommerce: Product Details | Minimal-UI">
      <Container>
        <CartWidget />
        {product && (
          <>
            <Card>
              <Grid container>
                <Grid item xs={12} md={6} lg={7} sx={{ marginBottom: theme.spacing(1) }}>
                  <ProductDetailsCarousel images={images} />
                </Grid>
                <Grid item xs={12} md={6} lg={5}>
                  <ProductDetailsSummary
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
              <TabContext value={value}>
                <Box sx={{ px: 3, bgcolor: 'background.neutral' }}>
                  <TabList onChange={handleChangeTab}>
                    <Tab disableRipple value="1" label="Description" />
                    <Tab
                      disableRipple
                      value="2"
                      // label={`Review (${product?.c.length})`}
                      label="Review"
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
        )}
      </Container>
    </Page>
  );
}
