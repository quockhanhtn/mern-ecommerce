import { Box, Skeleton } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import ProductItem from './ProductItem';

// ----------------------------------------------------------------------

const BoxListStyle = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(5, 1fr)',
  gridGap: theme.spacing(1.5),
  [theme.breakpoints.down('md+')]: {
    gridTemplateColumns: 'repeat(4, 1fr)'
  },
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: 'repeat(3, 1fr)'
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: 'repeat(2, 1fr)'
  }
}));

const BoxItemStyle = styled(Box)(({ _theme }) => ({
  gridColumn: 'span'
}));

// ----------------------------------------------------------------------

ProductList.propTypes = {
  products: PropTypes.array,
  limit: PropTypes.number,
  isLoading: PropTypes.bool
};

export default function ProductList(props) {
  const { products = [], isLoading = true, limit = 10, ...other } = props;

  return (
    <BoxListStyle {...other}>
      {products?.map((product) => (
        <BoxItemStyle key={product._id}>
          <ProductItem product={product} />
        </BoxItemStyle>
      ))}
      {isLoading &&
        [...Array(limit)].map((_item, index) => (
          <BoxItemStyle key={index}>
            <Skeleton variant="rectangular" width="100%" sx={{ paddingTop: '115%', borderRadius: 2 }} />
          </BoxItemStyle>
        ))}
    </BoxListStyle>
  );
}
