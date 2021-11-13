import PropTypes from 'prop-types';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const RootStyle = styled('ul')(({ theme }) => ({
  display: 'flex',
  listStyle: 'none',
  alignItems: 'center',
  position: 'absolute',
  right: theme.spacing(3),
  bottom: theme.spacing(3),
  '& li': {
    width: 18,
    height: 18,
    opacity: 0.32,
    cursor: 'pointer',
    '&.slick-active': { opacity: 1 }
  }
}));

// ----------------------------------------------------------------------

CarouselControlsPaging1.propTypes = {
  color: PropTypes.string
};

export default function CarouselControlsPaging1({ color, ...other }) {
  return {
    appendDots: (dots) => (
      <>
        <RootStyle {...other}>{dots}</RootStyle>
      </>
    ),
    customPaging: () => (
      <Box
        sx={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <Box
          component="span"
          sx={{
            width: 8,
            height: 8,
            borderRadius: '50%',
            bgcolor: color || 'common.white'
          }}
        />
      </Box>
    )
  };
}
