import { Box, Skeleton } from '@material-ui/core';
import PropTypes from 'prop-types';
import ProductItem from './ProductItem';

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array,
  limit: PropTypes.number,
  isLoading: PropTypes.bool
};

export default function ProductList(props) {
  const { products = [], isLoading = true, limit = 10, ...other } = props;

  return (
    <Box display="grid" gridTemplateColumns="repeat(15, 1fr)" gap={1.5} {...other}>
      {products?.map((product) => (
        <Box key={product._id} gridColumn="span 3" sx={{ display: 'flex' }}>
          <ProductItem product={product} />
        </Box>
      ))}
      {isLoading &&
        [...Array(limit)].map((item, index) => (
          <Box key={index} gridColumn="span 3">
            <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '115%', borderRadius: 2 }} />
          </Box>
        ))}
    </Box>
    // <Box {...other}>
    //   <Grid container spacing={1.5}>
    //     {products.map((product) => (
    //       <Grid key={product._id} item xs={12} sm={6} md={3}>
    //         <ProductItem product={product} />
    //       </Grid>
    //     ))}
    //     {isLoading &&
    //       [...Array(8)].map((item, index) => (
    //         <Grid item xs={12} sm={6} md={3} key={index}>
    //           <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '115%', borderRadius: 2 }} />
    //         </Grid>
    //       ))}
    //   </Grid>
    // </Box>
  );
}
