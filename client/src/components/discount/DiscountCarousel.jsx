import Slider from 'react-slick';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useState, useRef } from 'react';
// material
import { alpha, useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Paper, Typography, CardContent, Skeleton } from '@material-ui/core';
//
import { varFadeInRight, MotionContainer } from '../animate';
import { CarouselControlsArrowsIndex } from '../carousel/controls';
import { useLocales } from '../../hooks';
import { fCurrency } from '../../utils/formatNumber';

// ----------------------------------------------------------------------

const CarouselImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

function CarouselItem({ item, isActive }) {
  const theme = useTheme();
  const { currentLang } = useLocales();
  const { image, name, desc, code, discount, discountType, minimumTotal } = item;

  return (
    <Paper sx={{ position: 'relative', paddingTop: { xs: '50vh', md: '60vh' } }}>
      <CarouselImgStyle alt={name} src={image || 'https://source.unsplash.com/random/800x600'} />
      <Box
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundImage: `linear-gradient(to top, ${theme.palette.grey[900]} 0%,${alpha(
            theme.palette.grey[900],
            0
          )} 50%)`
        }}
      />
      <CardContent
        sx={{
          width: '100%',
          maxWidth: 480,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
          bottom: 0,
          padding: `${theme.spacing(0, 0, 2, 2)} !important`
        }}
      >
        <MotionContainer open={isActive}>
          <motion.div variants={varFadeInRight}>
            <Typography variant="h3" gutterBottom>
              {name}
            </Typography>
          </motion.div>
          <motion.div variants={varFadeInRight}>
            {desc && (
              <Typography variant="body2" noWrap gutterBottom>
                {desc}
              </Typography>
            )}
            <Typography variant="body2" noWrap gutterBottom>
              Mã&nbsp;
              <Typography color="primary" variant="subtitle1" component="span">
                {code}
              </Typography>
              &nbsp;-&nbsp;Giảm&nbsp;
              <Typography color="primary" variant="subtitle1" component="span">
                {discountType === 'price' ? fCurrency(discount, currentLang.value) : `${discount}%`}
              </Typography>
              &nbsp;
              {minimumTotal < 1000
                ? ' cho tất cả đơn hàng'
                : ` cho đơn hàng từ ${fCurrency(minimumTotal, currentLang.value)}`}
            </Typography>
          </motion.div>
        </MotionContainer>
      </CardContent>
    </Paper>
  );
}

CarouselItem.propTypes = {
  item: PropTypes.object,
  isActive: PropTypes.bool
};

function DiscountCarousel({ discounts, isLoading, otherProps }) {
  // const discountList = discountsListRaw.map((x) => ({
  //   _id: x._id,
  //   image: x.image || 'https://source.unsplash.com/random/800x600',
  //   title: x.name,
  //   link: `/d/${x.code}`,
  //   description: x.desc
  // }));
  const theme = useTheme();
  const carouselRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? discounts.length - 1 : 0);

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

  function renderSkeleton() {
    return [...Array(1).keys()].map((i) => (
      <Paper key={`skeleton-${i}`} sx={{ position: 'relative', paddingTop: { xs: '50vh', md: '60vh' } }}>
        <Skeleton
          variant="rect"
          width="100%"
          height={400}
          sx={{
            top: 0,
            width: '100%',
            height: '100%',
            position: 'absolute'
          }}
        />
      </Paper>
    ));
  }

  function renderItems() {
    return discounts.map((item, index) => (
      <CarouselItem key={`discount${index}`} item={item} isActive={index === currentIndex} />
    ));
  }

  if (!isLoading && !discounts && discounts?.length < 1) {
    return <></>;
  }

  return (
    <Card>
      <Slider ref={carouselRef} {...settings}>
        {isLoading ? renderSkeleton() : renderItems()}
      </Slider>

      {!isLoading && (
        <CarouselControlsArrowsIndex
          index={currentIndex}
          total={discounts.length}
          onNext={handleNext}
          onPrevious={handlePrevious}
        />
      )}
    </Card>
  );
}

DiscountCarousel.propTypes = {
  discounts: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      link: PropTypes.string
    })
  ).isRequired,
  isLoading: PropTypes.bool,
  otherProps: PropTypes.object
};

export default DiscountCarousel;
