import PropTypes from 'prop-types';
// material
import { Box, Paper, Typography } from '@material-ui/core';
// components
import Scrollbar from '../../../../../components/Scrollbar';
import { MotionInView } from '../../../../../components/animate';
//
import getVariant from '../getVariant';

// ----------------------------------------------------------------------

ContainerView.propTypes = {
  selectVariant: PropTypes.string,
  sx: PropTypes.object
};

export default function ContainerView({ selectVariant, sx, ...other }) {
  return (
    <Paper
      sx={{
        height: 480,
        overflow: 'hidden',
        bgcolor: 'background.neutral',
        ...sx
      }}
      {...other}
    >
      <Scrollbar>
        {[...Array(40)].map((_, index) => (
          <MotionInView key={index} variants={getVariant(selectVariant)}>
            <Box
              sx={{
                my: 2,
                mx: 'auto',
                height: 72,
                maxWidth: 480,
                display: 'flex',
                borderRadius: 1,
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.paper',
                boxShadow: (theme) => theme.customShadows.z8
              }}
            >
              <Typography variant="body2">Item {index + 1}</Typography>
            </Box>
          </MotionInView>
        ))}
      </Scrollbar>
    </Paper>
  );
}
