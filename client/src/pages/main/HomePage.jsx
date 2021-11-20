// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, CardHeader, CardContent, Paper, Stack, Container, Grid, Typography } from '@material-ui/core';
// components
import Page from '../../components/Page';
import {
  MegaMenuDesktopHorizon,
  MegaMenuDesktopVertical,
  MegaMenuMobile,
  MenuConfig
} from '../../components/mega-menu';
import { MHidden } from '../../components/@material-extend';
import { CarouselAnimation } from '../../components/carousel';
import {
  ProductDetailsCarousel,
  ProductDetailsReview,
  ProductDetailsSummary
} from '../../components/dashboard/product-details';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(0)
  // paddingBottom: theme.spacing(15)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative'
}));

// ----------------------------------------------------------------------

const images = [
  'https://www.duchuymobile.com/images/thumbnails/180/180/detailed/37/trang_025a-go.jpg',
  'https://www.duchuymobile.com/images/thumbnails/180/180/detailed/38/sac-nhanh-25w-samsung.jpg',
  'https://www.duchuymobile.com/images/thumbnails/180/180/detailed/38/sac-nhanh-25w-samsung.jpg',
  'https://www.duchuymobile.com/images/thumbnails/180/180/detailed/39/magic-mouse.jpg',
  'https://www.duchuymobile.com/images/thumbnails/180/180/detailed/39/ban-phim_pyn5-2j.jpg'
];

export default function HomePage() {
  return (
    <RootStyle title="Home page" id="move_top">
      <ContentStyle sx={{ bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800') }}>
        <Container sx={{ my: 5 }}>
          <MHidden width="mdUp">
            <MegaMenuMobile navConfig={MenuConfig} />
          </MHidden>

          <MegaMenuDesktopHorizon navConfig={MenuConfig} />

          <Stack direction="row" spacing={3} mt={5}>
            <MHidden width="mdDown">
              <Card sx={{ width: 280, flexShrink: 0, overflow: 'unset' }}>
                <Typography variant="h6" sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                  Category list
                </Typography>
                <MegaMenuDesktopVertical navConfig={MenuConfig} />
              </Card>
            </MHidden>

            <Paper sx={{ minHeight: 480, overflow: 'hidden', borderRadius: 1 }}>
              {/* <Box
                component="img"
                src="/static/mock-images/feeds/feed_8.jpg"
                sx={{ height: '100%', objectFit: 'cover' }}
              /> */}
              <ProductDetailsCarousel images={images} />
              {/* <CarouselAnimation /> */}
            </Paper>
          </Stack>
        </Container>
      </ContentStyle>
    </RootStyle>
  );
}
