import { FullscreenControl } from 'react-map-gl';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

const FullscreenControlStyle = styled(FullscreenControl)(({ theme }) => ({
  zIndex: 99,
  borderRadius: 8,
  overflow: 'hidden',
  top: theme.spacing(1.5),
  left: theme.spacing(1.5),
  boxShadow: theme.customShadows.z8,
  '& span.mapboxgl-ctrl-icon': {
    transform: ' scale(0.75)'
  }
}));

// ----------------------------------------------------------------------

export default function MapControlFullscreen({ ...other }) {
  return <FullscreenControlStyle {...other} />;
}
