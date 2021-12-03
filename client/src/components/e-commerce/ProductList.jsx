import PropTypes from 'prop-types';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Paper, Skeleton } from '@material-ui/core';
import ProductItem from './ProductItem';

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

const ContainerStyle = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(5),
  borderRadius: theme.shape.borderRadiusSm,
  border: `solid 1px ${theme.palette.divider}`,
  backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 100 : 800]
}));

ProductList.propTypes = {
  products: PropTypes.array.isRequired,
  isLoading: PropTypes.bool
};

export default function ProductList({ products, isLoading, ...other }) {
  if (isLoading) {
    return SkeletonLoad;
  }

  return (
    // <ContainerStyle variant="outlined" {...other}>
    <Box {...other}>
      <Grid container spacing={1.5} {...other}>
        {products.map((product) => (
          <Grid key={product._id} item xs={12} sm={6} md={3}>
            <ProductItem product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
    // </ContainerStyle>
  );
}
