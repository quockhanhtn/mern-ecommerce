import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import { useNavigate } from 'react-router-dom';
// material
import { Box, Card, Button, Typography, Stack } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
//
import { useDispatch } from 'react-redux';
import { useLocales } from '../../hooks';

import { ImageBrokenIcon } from '../../assets';

import ProductNameTypo from './ProductNameTypo';

import { fCurrency } from '../../utils/formatNumber';
import { trackingClick } from '../../redux/slices/userBehaviorSlice';

// ----------------------------------------------------------------------

const ContainerStyle = styled(Card)(({ theme }) => ({
  height: '100%',
  flexGrow: 1,
  zIndex: 1,
  boxShadow: 'none',
  border: `solid 2px ${theme.palette.divider}`,
  '&:hover': {
    transform: 'scale(1.02)',
    boxShadow: theme.customShadows.z8,
    // border: `solid 3px ${theme.palette.primary.main}`,
    '& .btn-recommend': {
      display: 'unset',
      position: 'absolute',
      bottom: '-20px',
      /* transform: translateY(100%); */
      zIndex: 2
    }
  },
  '& .btn-recommend': {
    display: 'none'
  }
}));

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'contain',
  position: 'absolute'
});

const PriceBoxStyle = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  [theme.breakpoints.up('lg')]: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  }
}));

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
    <ContainerStyle>
      <Box sx={{ pt: '90%', position: 'relative' }}>
        {image ? (
          <ProductImgStyle
            alt={name}
            src={variants[0].thumbnail}
            onError={({ currentTarget }) => {
              currentTarget.onerror = null; // prevents looping
              currentTarget.src = '/static/no-picture-available.png';
            }}
          />
        ) : (
          <ImageBrokenIcon sx={{ top: 0, width: '100%', height: '100%', objectFit: 'cover', position: 'absolute' }} />
        )}
      </Box>

      <Stack spacing={1} sx={{ p: 2 }}>
        <ProductNameTypo name={name.replaceAll('/', '/ ')} onClick={handleOnClick} />

        <PriceBoxStyle>
          <Typography variant="subtitle1" noWrap color="primary" sx={{ mr: 2 }}>
            {variants[0].price ? fCurrency(variants[0].price, currentLang.value) : t('products.fee')}
          </Typography>

          <Typography
            component="span"
            variant="subtitle2"
            sx={{ color: 'text.disabled', textDecoration: 'line-through', fontSize: '90%' }}
          >
            {variants[0].marketPrice && fCurrency(variants[0].marketPrice, currentLang.value)}
          </Typography>
        </PriceBoxStyle>
      </Stack>
      {/* <Box sx={{ position: 'fixed' }}>
        <Button className="btn-recommend" size="small" type="button" fullWidth startIcon={<Icon icon={searchFill} />}>
          Tìm sản phẩm tương tự
        </Button>
      </Box> */}
    </ContainerStyle>
  );
}
