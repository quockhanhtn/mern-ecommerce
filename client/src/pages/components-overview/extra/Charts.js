// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Grid, Container, CardHeader, CardContent } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  ChartPie,
  ChartBar,
  ChartLine,
  ChartArea,
  ChartMixed,
  ChartDonut,
  ChartsRadarBar,
  ChartRadialBar,
  ChartColumnSingle,
  ChartColumnStacked,
  ChartColumnNegative,
  ChartColumnMultiple
} from '../../../components/charts';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function Charts() {
  return (
    <RootStyle title="Components: Charts | Minimal-UI">
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
            heading="Charts"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Charts' }]}
            moreLink="https://apexcharts.com"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Area" />
              <CardContent dir="ltr">
                <ChartArea />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Line" />
              <CardContent dir="ltr">
                <ChartLine />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Column Single" />
              <CardContent dir="ltr">
                <ChartColumnSingle />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Column Multiple" />
              <CardContent dir="ltr">
                <ChartColumnMultiple />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Column Stacked" />
              <CardContent dir="ltr">
                <ChartColumnStacked />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Column Negative" />
              <CardContent dir="ltr">
                <ChartColumnNegative />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Bar" />
              <CardContent dir="ltr">
                <ChartBar />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Mixed" />
              <CardContent dir="ltr">
                <ChartMixed />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Pie" />
              <CardContent
                sx={{
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChartPie />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Donut" />
              <CardContent
                sx={{
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChartDonut />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Radial Bar" />
              <CardContent
                sx={{
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChartRadialBar />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Radar" />
              <CardContent
                sx={{
                  height: 420,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChartsRadarBar />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
