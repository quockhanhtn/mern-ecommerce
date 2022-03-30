import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import arrowLeftFill from '@iconify/icons-eva/arrow-left-fill';
import arrowRightFill from '@iconify/icons-eva/arrow-right-fill';
// material
import { alpha, useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  bottom: theme.spacing(2),
  right: theme.spacing(2),
  color: theme.palette.common.white,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[900], 0.48)
}));

const ArrowStyle = styled(MIconButton)(({ theme }) => ({
  padding: 6,
  opacity: 0.48,
  color: theme.palette.common.white,
  '&:hover': { opacity: 1 }
}));

// ----------------------------------------------------------------------

CarouselControlsArrowsIndex.propTypes = {
  index: PropTypes.number,
  total: PropTypes.number,
  onNext: PropTypes.func,
  onPrevious: PropTypes.func,
  showArrow: PropTypes.bool
};

export default function CarouselControlsArrowsIndex(props) {
  const { index, total, onNext, onPrevious, showArrow = true, ...other } = props;
  const theme = useTheme();
  const isRTL = theme.direction === 'rtl';

  return (
    <RootStyle {...other}>
      {showArrow ? (
        <ArrowStyle size="small" onClick={onPrevious}>
          <Icon width={20} height={20} icon={isRTL ? arrowRightFill : arrowLeftFill} />
        </ArrowStyle>
      ) : (
        <ArrowStyle size="small" />
      )}

      <Typography variant="subtitle2">
        {index + 1}/{total}
      </Typography>

      {showArrow ? (
        <ArrowStyle size="small" onClick={onNext}>
          <Icon width={20} height={20} icon={isRTL ? arrowLeftFill : arrowRightFill} />
        </ArrowStyle>
      ) : (
        <ArrowStyle size="small" />
      )}
    </RootStyle>
  );
}
