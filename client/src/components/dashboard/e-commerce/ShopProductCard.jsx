import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
import { fCurrency, fNumber } from '~/utils/formatNumber';
import { ImageIllustration } from '~/assets';
//

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
  const image = variants?.[0]?.thumbnail || null;
  const linkTo = `/${category.slug}/${slug}`;

  return (
    <Card>
      <Box sx={{ pt: '90%', position: 'relative' }}>
        {image ? (
          <ProductImgStyle alt={name} src={variants[0].thumbnail} />
        ) : (
          <ImageIllustration
            sx={{
              top: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute'
            }}
          />
        )}
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={linkTo} color="inherit" component={RouterLink} underline="hover">
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack>
          <Typography
            component="span"
            variant="subtitle2"
            sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
          >
            {variants[0].marketPrice && `${fNumber(variants[0].marketPrice)} ₫`}
          </Typography>
          <Typography variant="subtitle1" noWrap>
            {`${fNumber(variants[0].price)} ₫`}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
