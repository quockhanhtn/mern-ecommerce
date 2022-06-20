import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { MCircularProgress } from '../@material-extend';

function ProductCarousel(props) {
  const { products, isLoading } = props;

  if (isLoading) {
    return (
      <Box>
        <MCircularProgress />
      </Box>
    );
  }

  if (products.length === 0) {
    return null;
  }

  return <>{products.length}</>;
}

ProductCarousel.propTypes = {
  products: PropTypes.array,
  isLoading: PropTypes.bool
};

export default ProductCarousel;
