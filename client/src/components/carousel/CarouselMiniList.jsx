import { useRef } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { NavLink as RouterLink } from 'react-router-dom';
// material
import { useTheme } from '@material-ui/core/styles';
import { Box, Link, Typography, Skeleton } from '@material-ui/core';
//
import { CarouselControlsPaging1, CarouselControlsArrowsBasic2 } from './controls';

// ----------------------------------------------------------------------

CarouselMiniList.propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.array,
  numberShow: PropTypes.number,
  isShowTitle: PropTypes.bool,
  otherSlickSetting: PropTypes.object,
  imgObjectFit: PropTypes.oneOf(['cover', 'contain', 'none', 'scale-down', 'initial', 'inherit']),
  customHeight: PropTypes.number,
  sx: PropTypes.object
};

CarouselMiniList.defaultProps = {
  isLoading: false,
  items: [],
  numberShow: 5,
  isShowTitle: true,
  imgObjectFit: 'cover',
  customHeight: 60,
  sx: {}
};

export default function CarouselMiniList({
  isLoading,
  items,
  numberShow,
  otherSlickSetting,
  isShowTitle,
  imgObjectFit,
  customHeight,
  sx
}) {
  const theme = useTheme();
  const carouselRef = useRef();

  const settings = {
    speed: 500,
    dots: true,
    arrows: false,
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
    }),
    ...otherSlickSetting
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  function renderSkeleton() {
    return [...Array(10).keys()].map((i) => (
      <>
        <Skeleton key={`ske-${i}`} variant="rect" width="100%" height={200} />
      </>
    ));
  }

  function renderItems() {
    return items.map((item, index) => (
      <Box key={`box-${index}`} sx={{ px: 1, textAlign: 'center', height: customHeight }}>
        <Link
          key={`link-${index}`}
          component={RouterLink}
          color="inherit"
          underline="none"
          to={item.path}
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            transition: (theme) => theme.transitions.create('all'),
            '&:hover': { color: 'primary.main' }
          }}
        >
          <Box sx={{ mb: 1, position: 'relative', pt: '100%', display: 'flex', justifyContent: 'space-around' }}>
            <Box
              component="img"
              src={item.image}
              alt={index}
              sx={{
                top: 0,
                // width: '100%',
                // height: '100%',
                // width: 200,
                height: customHeight,
                borderRadius: 1,
                objectFit: imgObjectFit,
                position: 'absolute'
              }}
            />
          </Box>
          {isShowTitle && (
            <Typography
              variant="subtitle2"
              sx={{
                height: 20,
                fontSize: 14,
                overflow: 'hidden',
                WebkitLineClamp: 2,
                display: '-webkit-box',
                WebkitBoxOrient: 'vertical'
              }}
            >
              {item.name || item.title}
            </Typography>
          )}
        </Link>
      </Box>
    ));
  }

  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <Slider ref={carouselRef} {...settings}>
        {isLoading ? renderSkeleton() : renderItems()}
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
