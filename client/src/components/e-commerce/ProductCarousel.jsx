import PropTypes from 'prop-types';
import { useRef } from 'react';
import Slider from 'react-slick';
//
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
import { MCircularProgress } from '../@material-extend';

import { CarouselControlsPaging2, CarouselControlsArrowsBasic3 } from '../carousel/controls';
import ProductItem from './ProductItem';

const RootStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  '& .slick-list': {
    // boxShadow: theme.customShadows.z16,
    borderRadius: theme.shape.borderRadiusMd,
    margin: '0 -5px'
  }
}));

function ProductCarousel(props) {
  const { products, isLoading } = props;

  const theme = useTheme();
  const carouselRef = useRef();

  const settings = {
    speed: 500,
    dots: true,
    arrows: false,
    autoplay: false,
    slidesToShow: 5,
    slidesToScroll: 5,
    slidesPerRow: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselControlsPaging2({
      sx: { m: 0 }
    })
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  if (isLoading) {
    return (
      <Box>
        <MCircularProgress />
      </Box>
    );
  }

  if (!products || products?.length === 0) {
    return null;
  }

  return (
    <RootStyle>
      <Slider ref={carouselRef} {...settings}>
        {products.map((item, index) => (
          <Box key={index} sx={{ padding: '0 5px' }}>
            <ProductItem product={item} />
          </Box>
        ))}
      </Slider>
      <CarouselControlsArrowsBasic3 onNext={handleNext} onPrevious={handlePrevious} />
    </RootStyle>
  );
}

ProductCarousel.propTypes = {
  products: PropTypes.array,
  isLoading: PropTypes.bool
};

export default ProductCarousel;
