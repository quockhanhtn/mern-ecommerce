import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack, Zoom, Tooltip } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
//
import { useDispatch } from 'react-redux';
import { useLocales } from '../../hooks';

import { ImageBrokenIcon } from '../../assets';

import { fCurrency } from '../../utils/formatNumber';
import { trackingClick } from '../../redux/slices/userBehaviorSlice';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute'
});

const TypographyStyle = styled(Typography)({
  cursor: 'pointer',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  display: '-webkit-box',
  WebkitLineClamp: 2,
  WebkitBoxOrient: 'vertical'
});

// ----------------------------------------------------------------------

ProductItem.propTypes = {
  product: PropTypes.object
};

export default function ProductItem({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t, currentLang } = useLocales();

  const { _id, name, slug, variants, category } = product;
  const image = variants?.[0]?.thumbnail || null;
  const linkTo = `/${category?.slug || 'c'}/${slug}`;

  // eslint-disable-next-line no-unused-vars
  const handleOnClick = (_e) => {
    dispatch(trackingClick({ productId: _id }));
    navigate(linkTo);
  };

  return (
    <Card sx={{ flexGrow: 1, '&:hover': { transform: 'scale(1.02)', boxShadow: (theme) => theme.customShadows.z8 } }}>
      <Box sx={{ pt: '90%', position: 'relative' }}>
        {image ? (
          <ProductImgStyle alt={name} src={variants[0].thumbnail} />
        ) : (
          <ImageBrokenIcon sx={{ top: 0, width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} />
        )}
      </Box>

      <Stack spacing={2} sx={{ p: 2 }}>
        <Tooltip TransitionComponent={Zoom} title={name} placement="top">
          <TypographyStyle component={Link} color="inherit" onClick={handleOnClick} variant="subtitle2">
            {name}
          </TypographyStyle>
        </Tooltip>

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
