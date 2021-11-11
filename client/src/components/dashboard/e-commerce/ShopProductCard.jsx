import PropTypes from 'prop-types';
import { paramCase } from 'change-case';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// utils
//
import { fCurrency } from '../../../utils/formatNumber';
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';

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

export default function ShopProductCard({ product, ...other }) {
  const { name, slug, variants, status, category } = product;
  const linkTo = `${PATH_DASHBOARD.app.users.root}/${paramCase(category.name)}/${paramCase(slug)}`;

  return (
    <Card {...other}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {status}
          </Label>
        )}
        <ProductImgStyle alt={name} src={variants[0].thumbnail} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack>
          <ColorPreview colors={variants} />
          <Typography
            component="span"
            variant="subtitle2"
            sx={{
              color: 'text.disabled',
              textDecoration: 'line-through'
            }}
          >
            {variants[0].price && fCurrency(variants[0].price)}
          </Typography>
          <Typography variant="subtitle1" noWrap>
            {fCurrency(variants[0].price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
