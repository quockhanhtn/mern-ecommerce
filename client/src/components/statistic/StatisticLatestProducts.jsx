import faker from 'faker';
import { sample } from 'lodash';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Link, Card, CardHeader, Typography, Stack } from '@material-ui/core';
// utils
import { fCurrency } from '../../utils/formatNumber';
import { mockImgProduct } from '../../utils/mockImages';
//
import Scrollbar from '../Scrollbar';
import ColorPreview from '../ColorPreview';

// ----------------------------------------------------------------------

const PRODUCTS = [...Array(5)].map((_, index) => {
  const setIndex = index + 12;
  return {
    name: faker.commerce.productName(),
    image: mockImgProduct(setIndex),
    price: faker.datatype.number({ min: 4, max: 49, precision: 0.1 }),
    priceSale: sample([0, faker.datatype.number({ min: 49, max: 99, precision: 0.1 })]),
    colors: (index === 1 && [faker.vehicle.color(), faker.vehicle.color()]) ||
      (index === 2 && [
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color(),
        faker.commerce.color()
      ]) || [faker.internet.color(), faker.internet.color(), faker.internet.color(), faker.internet.color()]
  };
});

const ThumbImgStyle = styled('img')(({ theme }) => ({
  width: 48,
  height: 48,
  objectFit: 'cover',
  borderRadius: theme.shape.borderRadiusSm
}));

// ----------------------------------------------------------------------

ProductItem.propTypes = {
  product: PropTypes.object.isRequired
};

function ProductItem({ product }) {
  const { name, image, price, priceSale } = product;
  const hasSale = priceSale > 0;

  return (
    <Stack direction="row" spacing={2}>
      <ThumbImgStyle alt={name} src={image} />

      <Box sx={{ flexGrow: 1, minWidth: 200 }}>
        <Link component={RouterLink} to="#" sx={{ color: 'text.primary', typography: 'subtitle2' }}>
          {name}
        </Link>

        <Stack direction="row">
          {hasSale && (
            <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration: 'line-through' }}>
              {fCurrency(priceSale)}
            </Typography>
          )}
          &nbsp;
          <Typography variant="body2" sx={{ color: priceSale ? 'error.main' : 'text.secondary' }}>
            {fCurrency(price)}
          </Typography>
        </Stack>
      </Box>

      <ColorPreview limit={3} colors={product.colors} sx={{ minWidth: 72, pr: 3 }} />
    </Stack>
  );
}

export default function StatisticLatestProducts() {
  return (
    <Card>
      <CardHeader title="Latest Products" />
      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3, pr: 0 }}>
          {PRODUCTS.map((product) => (
            <ProductItem key={product.name} product={product} />
          ))}
        </Stack>
      </Scrollbar>
    </Card>
  );
}
