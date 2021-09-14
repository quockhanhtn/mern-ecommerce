import { useRef } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// material
import { useTheme } from '@material-ui/core/styles';
import { Box, Link, Typography } from '@material-ui/core';
//
import { CarouselControlsPaging1, CarouselControlsArrowsBasic2 } from '../carousel';

// ----------------------------------------------------------------------

MegaMenuCarousel.propTypes = {
  numberShow: PropTypes.number,
  products: PropTypes.array,
  sx: PropTypes.object
};

export default function MegaMenuCarousel({ products, numberShow, sx }) {
  const theme = useTheme();
  const carouselRef = useRef();

  const settings = {
    speed: 500,
    dots: true,
    arrows: false,
    slidesToShow: numberShow,
    slidesToScroll: numberShow,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselControlsPaging1({
      color: 'primary.main',
      sx: {
        mt: 1,
        mx: 'auto',
        display: 'flex',
        position: 'unset',
        justifyContent: 'center'
      }
    })
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <Slider ref={carouselRef} {...settings}>
        {products.map((product) => (
          <Box key={product.name} sx={{ px: 1, textAlign: 'center' }}>
            <Link
              component={RouterLink}
              color="inherit"
              underline="none"
              to={product.path}
              sx={{
                display: 'block',
                transition: (theme) => theme.transitions.create('all'),
                '&:hover': { color: 'primary.main' }
              }}
            >
              <Box sx={{ mb: 1, position: 'relative', pt: '100%' }}>
                <Box
                  component="img"
                  src={product.image}
                  sx={{
                    top: 0,
                    width: '100%',
                    height: '100%',
                    borderRadius: 1,
                    objectFit: 'cover',
                    position: 'absolute'
                  }}
                />
              </Box>
              <Typography
                variant="subtitle2"
                sx={{
                  height: 40,
                  fontSize: 12,
                  overflow: 'hidden',
                  WebkitLineClamp: 2,
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {product.name}
              </Typography>
            </Link>
          </Box>
        ))}
      </Slider>

      <CarouselControlsArrowsBasic2
        onNext={handleNext}
        onPrevious={handlePrevious}
        className="controlsArrows"
        sx={{
          mt: 7,
          '& .MuiIconButton-root': { width: 24, height: 24 }
        }}
      />
    </Box>
  );
}
