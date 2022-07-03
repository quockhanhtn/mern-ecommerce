import arrowLeftFill from '@iconify/icons-eva/arrow-left-fill';
import arrowRightFill from '@iconify/icons-eva/arrow-right-fill';
import { Icon } from '@iconify/react';
import PropTypes from 'prop-types';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

const SIZE = 40;

const RootStyle = styled('div')(({ theme }) => ({
  top: 0,
  bottom: 0,
  zIndex: 9,
  height: SIZE,
  width: `calc(100% + ${SIZE}px)`,
  transform: `translateX(-${SIZE / 2}px)`,
  margin: 'auto',
  display: 'flex',
  position: 'absolute',
  padding: theme.spacing(0, 0),
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

CarouselControlsArrowsBasic3.propTypes = {
  onNext: PropTypes.func,
  onPrevious: PropTypes.func
};

export default function CarouselControlsArrowsBasic3(props) {
  const { onNext, onPrevious, ...other } = props;
  return (
    <RootStyle {...other}>
      <ArrowStyle size="small" onClick={onPrevious}>
        <Icon width={20} height={20} icon={arrowLeftFill} />
      </ArrowStyle>

      <ArrowStyle size="small" onClick={onNext}>
        <Icon width={20} height={20} icon={arrowRightFill} />
      </ArrowStyle>
    </RootStyle>
  );
}
