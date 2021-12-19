import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha, useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Button, CardContent, Typography } from '@material-ui/core';
// utils
import { mockImgProduct } from '../../utils/mockImages';
//
import { CarouselControlsPaging1 } from '../carousel/controls';

// ----------------------------------------------------------------------

const PRODUCTS = [
  'IPhone 13 Promax',
  'Air Pod Pro',
  'Samsung Galaxy Z Flip',
  'Apple watch series 7',
  'Macbook Air',
  'Oppo find X'
].map((product, index) => {
  const setIndex = index + 1;
  return {
    name: product,
    image: mockImgProduct(setIndex)
  };
});

const CarouselImgStyle = styled('img')(({ theme }) => ({
  width: '100%',
  height: 280,
  objectFit: 'cover',
  [theme.breakpoints.up('xl')]: {
    height: 320
  }
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object
};

function CarouselItem({ item }) {
  const { image, name } = item;

  return (
    <Box sx={{ position: 'relative' }}>
      <CarouselImgStyle alt={name} src={image} />
      <Box
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
        }}
      />
      <CardContent
        sx={{
          left: 0,
          bottom: 0,
          maxWidth: '80%',
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white'
        }}
      >
        <Typography variant="overline" sx={{ opacity: 0.48 }}>
          New
        </Typography>
        <Typography noWrap variant="h5" sx={{ mt: 1, mb: 3 }}>
          {name}
        </Typography>
        <Button to="#" variant="contained" component={RouterLink}>
          Buy Now
        </Button>
      </CardContent>
    </Box>
  );
}

export default function EcommerceLatestProducts() {
  const theme = useTheme();

  const settings = {
    speed: 1000,
    dots: true,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselControlsPaging1({ color: 'primary.main' })
  };

  return (
    <Card>
      <Slider {...settings}>
        {PRODUCTS.map((item) => (
          <CarouselItem key={item.name} item={item} />
        ))}
      </Slider>
    </Card>
  );
}
