// material
import { Container, Grid } from '@material-ui/core';
// components
import Page from '../../../components/Page';
import {
  StatisticBestSeller,
  StatisticBrandTotal,
  StatisticCategoryTotal,
  StatisticNewProducts,
  StatisticProductSold,
  StatisticProductTotal,
  StatisticOrder,
  StatisticTotalUser,
  StatisticWelcome,
  StatisticTurnover
} from '../../../components/statistic';

// ----------------------------------------------------------------------

export default function PageStatistic() {
  return (
    <Page title="General: E-commerce | HK-Mobile">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <StatisticWelcome />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatisticNewProducts />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatisticProductTotal />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatisticBrandTotal />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatisticCategoryTotal />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatisticProductSold />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatisticTotalUser />
          </Grid>

          <Grid item xs={12} md={4}>
            <StatisticOrder />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}> */}
          {/*  <StatisticYearlySales /> */}
          {/* </Grid> */}

          <Grid item xs={12} md={4}>
            <StatisticTurnover />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={8}> */}
          {/*  <StatisticSalesOverview /> */}
          {/* </Grid> */}

          {/* <Grid item xs={12} md={6} lg={4}> */}
          {/*  <StatisticCurrentBalance /> */}
          {/* </Grid> */}

          <Grid item xs={12} md={6} lg={8}>
            <StatisticBestSeller />
          </Grid>

          {/* <Grid item xs={12} md={6} lg={4}> */}
          {/*  <StatisticLatestProducts /> */}
          {/* </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
