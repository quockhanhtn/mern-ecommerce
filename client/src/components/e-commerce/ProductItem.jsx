import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { ImageBrokenIcon } from '../../assets';
//
import useLocales from '../../hooks/useLocales';
import { fCurrency } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ProductItem.propTypes = {
  product: PropTypes.object
};

export default function ProductItem({ product }) {
  const { t, currentLang } = useLocales();
  const { name, slug, variants, category } = product;
  const image = variants?.[0]?.thumbnail || null;
  const linkTo = `/${category.slug}/${slug}`;

  return (
    <Card>
      <Box sx={{ pt: '90%', position: 'relative' }}>
        {image ? (
          <ProductImgStyle alt={name} src={variants[0].thumbnail} />
        ) : (
          <ImageBrokenIcon sx={{ top: 0, width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} />
        )}
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
            sx={{ color: 'text.disabled', textDecoration: 'line-through' }}
          >
            {variants[0].marketPrice && fCurrency(variants[0].marketPrice, currentLang.value)}
          </Typography>
          <Typography variant="subtitle1" noWrap>
            {variants[0].price ? fCurrency(variants[0].price, currentLang.value) : t('product.free')}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
