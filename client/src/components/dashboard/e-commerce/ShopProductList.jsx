import PropTypes from 'prop-types';
// material
import { Skeleton, Grid } from '@material-ui/core';
import ShopProductCard from './ShopProductCard';

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <>
    {[...Array(12)].map((item, index) => (
      <Grid item xs={12} sm={6} md={3} key={index}>
        <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '115%', borderRadius: 2 }} />
      </Grid>
    ))}
  </>
);

ShopProductList.propTypes = {
  products: PropTypes.array.isRequired,
  isLoad: PropTypes.bool
};

export default function ShopProductList({ products, isLoad, ...other }) {
  return (
    <Grid container spacing={3} {...other}>
      {products.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
        </Grid>
      ))}
      {isLoad && SkeletonLoad}
    </Grid>
  );
}
