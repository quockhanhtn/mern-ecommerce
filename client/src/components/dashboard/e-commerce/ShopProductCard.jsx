import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
//
import { fCurrency } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const { name, slug, variants, category } = product;
  const linkTo = `${PATH_DASHBOARD.app.users.root}/${paramCase(category.name)}/${paramCase(slug)}`;

  return (
    <Card>
      <Box sx={{ pt: '90%', position: 'relative' }}>
        <ProductImgStyle alt={name} src={variants[0].thumbnail} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack>
          <Typography
            component="span"
            variant="subtitle2"
            sx={{
              color: 'text.disabled',
              textDecoration: 'line-through'
            }}
          >
            {variants[0].marketPrice && fCurrency(variants[0].marketPrice)}
          </Typography>
          <Typography variant="subtitle1" noWrap>
            {fCurrency(variants[0].price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
