import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
// material
import { alpha, useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Paper, Button, Typography, CardContent } from '@material-ui/core';
// utils
import { mockImgFeed } from '../../utils/mockImages';
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

const CAROUSELS = [
  {
    title: 'title 1',
    description: 'description 1',
    image: mockImgFeed(1)
  },
  {
    title: 'title 2',
    description: 'description 2',
    image: mockImgFeed(2)
  },
  {
    title: 'title 3',
    description: 'description 3',
    image: mockImgFeed(3)
  },
  {
    title: 'title 4',
    description: 'description 4',
    image: mockImgFeed(4)
  },
  {
    title: 'title 5',
    description: 'description 5',
    image: mockImgFeed(5)
  }
];

CarouselItem.propTypes = {
  item: PropTypes.object,
  isActive: PropTypes.bool
};

function CarouselItem({ item, isActive }) {
  const theme = useTheme();
  const { image, title } = item;

  return (
    <Paper
      sx={{
        position: 'relative',
        paddingTop: { xs: '100%', md: '50%' }
      }}
    >
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
        sx={{
          bottom: 0,
          width: '100%',
          maxWidth: 480,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white'
        }}
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
          <motion.div variants={varFadeInRight}>
            <Button variant="contained" sx={{ mt: 3 }}>
              View More
            </Button>
          </motion.div>
        </MotionContainer>
      </CardContent>
    </Paper>
  );
}

export default function CarouselAnimation() {
  const theme = useTheme();
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? CAROUSELS.length - 1 : 0);

  const settings = {
    speed: 800,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next)
  };

  const handlePrevious = () => {
    carouselRef.current.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current.slickNext();
  };

  return (
    <Card>
      <Slider ref={carouselRef} {...settings}>
        {CAROUSELS.map((item, index) => (
          <CarouselItem key={item.title} item={item} isActive={index === currentIndex} />
        ))}
      </Slider>

      <CarouselControlsArrowsIndex
        index={currentIndex}
        total={CAROUSELS.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </Card>
  );
}
