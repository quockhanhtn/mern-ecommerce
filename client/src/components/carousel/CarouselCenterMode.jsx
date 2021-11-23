import { useRef } from 'react';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import arrowForwardFill from '@iconify/icons-eva/arrow-forward-fill';
// material
import { alpha, useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Paper, Link, Typography, CardContent } from '@material-ui/core';
//
import { CarouselControlsArrowsBasic2 } from './controls';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  '&:before, &:after': {
    top: 0,
    left: 0,
    zIndex: 8,
    width: 48,
    content: "''",
    height: '100%',
    display: 'none',
    position: 'absolute',
    backgroundImage: 'linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)',
    [theme.breakpoints.up(480)]: {
      display: 'block'
    }
  },
  '&:after': {
    right: 0,
    left: 'auto',
    transform: 'scaleX(-1)'
  }
}));

const CarouselImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
  transition: theme.transitions.create('all')
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = { item: PropTypes.object };

function CarouselItem({ item }) {
  const { image, title } = item;

  return (
    <Paper
      sx={{
        mx: 1,
        borderRadius: 2,
        overflow: 'hidden',
        paddingTop: 'calc(16 /9 * 100%)',
        position: 'relative',
        '&:hover img': {
          width: '120%',
          height: '120%'
        }
      }}
    >
      <CarouselImgStyle alt={title} src={image} />
      <CardContent
        sx={{
          bottom: 0,
          zIndex: 9,
          width: '100%',
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
          backgroundImage: (theme) =>
            `linear-gradient(to top, ${theme.palette.grey[900]} 0%,${alpha(theme.palette.grey[900], 0)} 100%)`
        }}
      >
        <Typography variant="h4" paragraph>
          {title}
        </Typography>
        <Link
          to="#"
          color="inherit"
          variant="overline"
          component={RouterLink}
          sx={{
            opacity: 0.72,
            alignItems: 'center',
            display: 'inline-flex',
            transition: (theme) => theme.transitions.create('opacity'),
            '&:hover': { opacity: 1 }
          }}
        >
          learn More
          <Box component={Icon} icon={arrowForwardFill} sx={{ width: 16, height: 16, ml: 1 }} />
        </Link>
      </CardContent>
    </Paper>
  );
}

CarouselCenterMode.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      link: PropTypes.string
    })
  ).isRequired,
  otherProps: PropTypes.object
};

export default function CarouselCenterMode({ items }) {
  const carouselRef = useRef();
  const theme = useTheme();

  const settings = {
    speed: 500,
    slidesToShow: 3,
    rows: 2,
    centerMode: true,
    centerPadding: '60px',
    rtl: Boolean(theme.direction === 'rtl'),
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 600,
        settings: { slidesToShow: 2 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1, centerPadding: '0' }
      }
    ]
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  if (!items || items.length === 0) {
    return <></>;
  }

  return (
    <RootStyle>
      <Slider ref={carouselRef} {...settings}>
        {items.map((item) => (
          <CarouselItem key={item.title} item={item} />
        ))}
      </Slider>
      <CarouselControlsArrowsBasic2 onNext={handleNext} onPrevious={handlePrevious} />
    </RootStyle>
  );
}
