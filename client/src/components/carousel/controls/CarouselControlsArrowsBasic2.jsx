import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import arrowLeftFill from '@iconify/icons-eva/arrow-left-fill';
import arrowRightFill from '@iconify/icons-eva/arrow-right-fill';
// material
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

const SIZE = 40;

const RootStyle = styled('div')(({ theme }) => ({
  top: 0,
  bottom: 0,
  zIndex: 9,
  height: SIZE,
  width: '100%',
  margin: 'auto',
  display: 'flex',
  position: 'absolute',
  padding: theme.spacing(0, 2),
  justifyContent: 'space-between'
}));

const ArrowStyle = styled(MIconButton)(({ theme }) => ({
  width: SIZE,
  height: SIZE,
  opacity: 0.48,
  display: 'flex',
  cursor: 'pointer',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  background: theme.palette.grey[900],
  borderRadius: theme.shape.borderRadiusSm,
  transition: theme.transitions.create('opacity'),
  '&:hover': {
    opacity: 1,
    background: theme.palette.grey[900]
  }
}));

// ----------------------------------------------------------------------

CarouselControlsArrowsBasic2.propTypes = {
  onNext: PropTypes.func,
  onPrevious: PropTypes.func
};

export default function CarouselControlsArrowsBasic2({ onNext, onPrevious, ...other }) {
  const theme = useTheme();
  const isRTL = theme.direction === 'rtl';

  return (
    <RootStyle {...other}>
      <ArrowStyle size="small" onClick={onPrevious}>
        <Icon width={20} height={20} icon={isRTL ? arrowRightFill : arrowLeftFill} />
      </ArrowStyle>

      <ArrowStyle size="small" onClick={onNext}>
        <Icon width={20} height={20} icon={isRTL ? arrowLeftFill : arrowRightFill} />
      </ArrowStyle>
    </RootStyle>
  );
}
