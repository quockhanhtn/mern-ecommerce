import { useRef } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// material
import { useTheme } from '@material-ui/core/styles';
import { Box, Link, Typography } from '@material-ui/core';
//
import { CarouselControlsPaging1, CarouselControlsArrowsBasic2 } from './controls';

// ----------------------------------------------------------------------

CarouselBrandList.propTypes = {
  items: PropTypes.array,
  numberShow: PropTypes.number,
  numberPerRow: PropTypes.number,
  sx: PropTypes.object
};

CarouselBrandList.defaultProps = {
  items: [],
  numberShow: 5,
  numberPerRow: 1,
  sx: {}
};

export default function CarouselBrandList({ items, numberPerRow, numberShow, sx }) {
  const theme = useTheme();
  const carouselRef = useRef();

  const settings = {
    speed: 500,
    dots: true,
    arrows: false,
    slidesPerRow: numberPerRow,
    slidesToShow: numberShow,
    slidesToScroll: numberShow,
    adaptiveHeight: true,
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
        {items.map((item, index) => (
          <Box key={index} sx={{ px: 1, textAlign: 'center' }}>
            <Link
              component={RouterLink}
              color="inherit"
              underline="none"
              to={item.path}
              sx={{
                display: 'block',
                transition: (theme) => theme.transitions.create('all'),
                '&:hover': { color: 'primary.main' }
              }}
            >
              <Box sx={{ mb: 1, position: 'relative', pt: '100%' }}>
                <Box
                  component="img"
                  src={item.image}
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
                  // height: 40,
                  fontSize: 12,
                  overflow: 'hidden',
                  WebkitLineClamp: 2,
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical'
                }}
              >
                {item.name || item.title}
              </Typography>
            </Link>
          </Box>
        ))}
      </Slider>

      <CarouselControlsArrowsBasic2
        onNext={handleNext}
        onPrevious={handlePrevious}
        // className="controlsArrows"
        sx={{ '& .MuiIconButton-root': { width: 24, height: 24 } }}
      />
    </Box>
  );
}
