import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
// material
import { alpha, useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Paper, Typography, CardContent } from '@material-ui/core';
//
import { varFadeInRight, MotionContainer } from '../animate';
import { CarouselControlsArrowsIndex } from './controls';

// ----------------------------------------------------------------------

const CarouselImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

CarouselItem.propTypes = { item: PropTypes.object, isActive: PropTypes.bool };

function CarouselItem({ item, isActive }) {
  const theme = useTheme();
  const { image, title, link } = item;

  const handleOnClick = () => {
    if (link) {
      window.location.href = link;
    }
  };

  return (
    <Paper sx={{ position: 'relative', paddingTop: { xs: '100%', md: '50%' } }} onClick={handleOnClick}>
      <CarouselImgStyle alt={title} src={image} />
      <Box
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundImage: `linear-gradient(to top, ${theme.palette.grey[900]} 0%,${alpha(
            theme.palette.grey[900],
            0
          )} 100%)`
        }}
      />
      <CardContent
        sx={{ bottom: 0, width: '100%', maxWidth: 480, textAlign: 'left', position: 'absolute', color: 'common.white' }}
      >
        <MotionContainer open={isActive}>
          <motion.div variants={varFadeInRight}>
            <Typography variant="h3" gutterBottom>
              {item.title}
            </Typography>
          </motion.div>
          <motion.div variants={varFadeInRight}>
            <Typography variant="body2" noWrap gutterBottom>
              {item.description}
            </Typography>
          </motion.div>
          {/* <motion.div variants={varFadeInRight}>
            <Button variant="contained" sx={{ mt: 3 }}>
              View More
            </Button>
          </motion.div> */}
        </MotionContainer>
      </CardContent>
    </Paper>
  );
}

CarouselAnimation.propTypes = {
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

export default function CarouselAnimation({ items, otherProps }) {
  const theme = useTheme();
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? items.length - 1 : 0);

  const settings = {
    speed: 800,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (_current, next) => setCurrentIndex(next),
    ...otherProps
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
    <Card>
      <Slider ref={carouselRef} {...settings}>
        {items.map((item, index) => (
          <CarouselItem key={index} item={item} isActive={index === currentIndex} />
        ))}
      </Slider>

      <CarouselControlsArrowsIndex
        index={currentIndex}
        total={items.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </Card>
  );
}
