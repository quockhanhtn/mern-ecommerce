import PropTypes from 'prop-types';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const EVENT_NAMES = ['onDragStart', 'onDrag', 'onDragEnd'];

function round5(value) {
  return (Math.round(value * 1e5) / 1e5).toFixed(5);
}

const RootStyle = styled('div')(({ theme }) => ({
  zIndex: 99,
  minWidth: 200,
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
  padding: theme.spacing(2),
  backdropFilter: 'blur(8px)',
  WebkitBackdropFilter: 'blur(8px)', // Fix on Mobile
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.grey[900], 0.72)
}));

// ----------------------------------------------------------------------

ControlPanel.propTypes = {
  events: PropTypes.object
};

export default function ControlPanel({ events = {} }) {
  return (
    <RootStyle>
      {EVENT_NAMES.map((event) => {
        const lngLat = events[event];
        return (
          <div key={event}>
            <Typography variant="subtitle2" sx={{ color: 'common.white' }}>
              {event}:
            </Typography>
            {lngLat ? (
              <Typography variant="subtitle2" sx={{ color: 'primary.main' }}>
                {lngLat.map(round5).join(', ')}
              </Typography>
            ) : (
              <Typography variant="subtitle2" sx={{ color: 'error.main' }}>
                <em>null</em>
              </Typography>
            )}
          </div>
        );
      })}
    </RootStyle>
  );
}
