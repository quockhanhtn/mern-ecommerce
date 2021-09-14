// material
import { Container, Grid } from '@material-ui/core';
// components
import Page from '../../components/Page';
import {
  EcommerceWelcome,
  EcommerceNewProducts,
  EcommerceProductSold,
  EcommerceSalesProfit,
  EcommerceYearlySales,
  EcommerceBestSalesman,
  EcommerceTotalBalance,
  EcommerceSaleByGender,
  EcommerceSalesOverview,
  EcommerceLatestProducts,
  EcommerceCurrentBalance
} from '../../components/_dashboard/general-ecommerce';

// ----------------------------------------------------------------------

export default function GeneralEcommerce() {
  return (
    <Page title="General: E-commerce | Minimal-UI">
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <EcommerceWelcome />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceNewProducts />
          </Grid>

          <Grid item xs={12} md={4}>
            <EcommerceProductSold />
          </Grid>
          <Grid item xs={12} md={4}>
            <EcommerceTotalBalance />
          </Grid>
          <Grid item xs={12} md={4}>
            <EcommerceSalesProfit />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <EcommerceSaleByGender />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <EcommerceYearlySales />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <EcommerceSalesOverview />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <EcommerceCurrentBalance />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <EcommerceBestSalesman />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <EcommerceLatestProducts />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}
