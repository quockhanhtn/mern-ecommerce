import PropTypes from 'prop-types';
import { Box, Grid, Skeleton } from '@material-ui/core';
import ProductItem from './ProductItem';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array,
  isLoading: PropTypes.bool
};

ProductList.defaultProps = {
  products: [],
  isLoading: false
};

export default function ProductList({ products, isLoading, ...other }) {
  return (
    <Box {...other}>
      <Grid container spacing={1.5}>
        {products.map((product) => (
          <Grid key={product._id} item xs={12} sm={6} md={3}>
            <ProductItem product={product} />
          </Grid>
        ))}
        {isLoading &&
          [...Array(8)].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '115%', borderRadius: 2 }} />
            </Grid>
          ))}
      </Grid>
    </Box>
  );
}
