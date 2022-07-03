import PropTypes from 'prop-types';
import { useRef } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import Slider from 'react-slick';
// material
import { Box, Link, Skeleton } from '@material-ui/core';
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';
//
import { CarouselControlsArrowsBasic3, CarouselControlsPaging1 } from '../carousel/controls';

const ImgStyle = styled('img')(({ theme }) => ({
  objectFit: 'contain',
  borderRadius: theme.shape.borderRadiusSm,
  border: `solid 2px ${theme.palette.divider}`,
  backgroundColor: 'white',
  top: 0,
  left: 0,
  right: 0,
  width: '100%',
  // height: '100%',
  // width: 200,
  position: 'absolute'
}));

// ----------------------------------------------------------------------

BrandCarousel.propTypes = {
  isLoading: PropTypes.bool,
  items: PropTypes.array,
  numberShow: PropTypes.number,
  isShowTitle: PropTypes.bool,
  otherSlickSetting: PropTypes.object,
  imgObjectFit: PropTypes.oneOf(['cover', 'contain', 'none', 'scale-down', 'initial', 'inherit']),
  customHeight: PropTypes.number,
  sx: PropTypes.object
};

BrandCarousel.defaultProps = {
  isLoading: false,
  items: [],
  numberShow: 5,
  isShowTitle: true,
  imgObjectFit: 'cover',
  customHeight: 60,
  sx: {}
};

export default function BrandCarousel({ isLoading, items, customHeight, sx }) {
  const theme = useTheme();
  const carouselRef = useRef();

  const settings = {
    speed: 500,
    dots: true,
    arrows: false,
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
    swipeToSlide: true,
    slidesPerRow: 2,
    rows: 2,
    slidesToShow: 3,
    slidesToScroll: 2,
    infinite: true,
    responsive: [
      {
        breakpoint: 1120,
        settings: { slidesToShow: 2.5, slidesToScroll: 3, infinite: true, dots: true }
      },
      {
        breakpoint: 1000,
        settings: { slidesToShow: 2, slidesToScroll: 2, initialSlide: 2 }
      },
      {
        breakpoint: 760,
        settings: { slidesToShow: 1.5, slidesToScroll: 1, initialSlide: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, slidesToScroll: 1 }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  function renderSkeleton() {
    return [...Array(12).keys()].map((i) => (
      <Box key={`ske-box-${i}`} sx={{ px: 1, textAlign: 'center', height: customHeight }}>
        <Box sx={{ mb: 1, position: 'relative', pt: '100%', display: 'flex', justifyContent: 'space-around' }}>
          <Skeleton
            key={`ske-${i}`}
            variant="rect"
            width="100%"
            height={customHeight}
            sx={{
              top: 0,
              left: 0,
              right: 0,
              width: '100%',
              position: 'absolute'
            }}
          />
        </Box>
      </Box>
    ));
  }

  function renderItems() {
    return items.map((brand, index) => (
      <Box key={`box-${index}`} sx={{ px: 1, textAlign: 'center', height: customHeight }}>
        <Link
          key={`link-${index}`}
          component={RouterLink}
          color="inherit"
          underline="none"
          to={`/q?b=${brand?.slug}`}
          sx={{
            display: 'block',
            width: '100%',
            height: '100%',
            transition: (theme) => theme.transitions.create('all'),
            '&:hover': { color: 'primary.main' }
          }}
        >
          <Box sx={{ mb: 1, position: 'relative', pt: '100%', display: 'flex', justifyContent: 'space-around' }}>
            <ImgStyle
              src={brand?.image}
              alt={brand?.name}
              style={{ height: customHeight }}
              onError={({ currentTarget }) => {
                currentTarget.onerror = null; // prevents looping
                currentTarget.src = '/static/no-picture-available.png';
              }}
            />
          </Box>
        </Link>
      </Box>
    ));
  }

  return (
    <Box sx={{ position: 'relative', ...sx }}>
      <Slider ref={carouselRef} {...settings}>
        {isLoading ? renderSkeleton() : renderItems()}
      </Slider>

      <CarouselControlsArrowsBasic3
        onNext={handleNext}
        onPrevious={handlePrevious}
        // className="controlsArrows"
        sx={{ '& .MuiIconButton-root': { width: 24, height: 24 } }}
      />
    </Box>
  );
}
