import faker from 'faker';
import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { Icon } from '@iconify/react';
import moreHorizontalFill from '@iconify/icons-eva/more-horizontal-fill';
// material
import { alpha, useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Typography } from '@material-ui/core';
// utils
import { mockImgFeed } from '../../utils/mockImages';
//
import { CarouselControlsArrowsBasic2 } from './controls';
//
import { MIconButton } from '../@material-extend';

// ----------------------------------------------------------------------

const CAROUSELS = [...Array(5)].map((_, index) => {
  const setIndex = index + 1;
  return {
    title: faker.name.title(),
    description: faker.lorem.paragraphs(),
    image: mockImgFeed(setIndex)
  };
});

const ContentItemStyle = styled('div')(({ theme }) => ({
  bottom: 0,
  zIndex: 9,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  padding: theme.spacing(3),
  borderBottomLeftRadius: 16,
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)', // Fix on Mobile
  borderBottomRightRadius: 16,
  justifyContent: 'space-between',
  backgroundColor: alpha(theme.palette.grey[900], 0.72),
  flexDirection: theme.direction === 'rtl' ? 'row-reverse' : 'row'
}));

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object
};

function CarouselItem({ item }) {
  const { image, title } = item;

  return (
    <Box sx={{ position: 'relative', zIndex: 0 }}>
      <Box component="img" alt={title} src={image} sx={{ width: '100%', height: 480, objectFit: 'cover' }} />

      <ContentItemStyle>
        <Typography variant="h6" sx={{ color: 'common.white' }}>
          {item.title}
        </Typography>
        <MIconButton
          onClick={() => {}}
          sx={{
            color: 'common.white',
            '&:hover': {
              bgcolor: (theme) => alpha(theme.palette.common.white, theme.palette.action.hoverOpacity)
            }
          }}
        >
          <Icon icon={moreHorizontalFill} />
        </MIconButton>
      </ContentItemStyle>
    </Box>
  );
}

export default function CarouselBasic4() {
  const theme = useTheme();
  const carouselRef = useRef();

  const settings = {
    speed: 500,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    fade: Boolean(theme.direction !== 'rtl'),
    rtl: Boolean(theme.direction === 'rtl')
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
        {CAROUSELS.map((item) => (
          <CarouselItem key={item.title} item={item} />
        ))}
      </Slider>
      <CarouselControlsArrowsBasic2 onNext={handleNext} onPrevious={handlePrevious} />
    </Card>
  );
}
