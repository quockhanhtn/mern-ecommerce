// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Card, Container, CardHeader, CardContent } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import {
  CarouselBasic1,
  CarouselBasic2,
  CarouselBasic3,
  CarouselBasic4,
  CarouselAnimation,
  CarouselThumbnail,
  CarouselCenterMode
} from '../../../components/carousel';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function Carousel() {
  return (
    <RootStyle title="Components: Carousel | Minimal-UI">
      <Box
        sx={{
          pt: 6,
          pb: 1,
          mb: 10,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800')
        }}
      >
        <Container maxWidth="lg">
          <HeaderBreadcrumbs
            heading="Carousel"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Carousel' }]}
            moreLink="https://react-slick.neostack.com"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Carousel Basic 1" />
              <CardContent>
                <CarouselBasic1 />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Carousel Basic 2" />
              <CardContent>
                <CarouselBasic2 />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Carousel Basic 3" />
              <CardContent>
                <CarouselBasic3 />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Carousel Basic 4" />
              <CardContent>
                <CarouselBasic4 />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title="Carousel Thumbnail" />
              <CardContent>
                <CarouselThumbnail />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title="Carousel Center Mode" />
              <CardContent>
                <CarouselCenterMode />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardHeader title="Carousel Animation" />
              <CardContent>
                <CarouselAnimation />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
