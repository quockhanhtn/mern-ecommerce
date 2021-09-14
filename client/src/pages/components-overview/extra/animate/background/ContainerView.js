import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
// material
import { Box, Paper } from '@material-ui/core';
//
import getVariant from '../getVariant';

// ----------------------------------------------------------------------

ContainerView.propTypes = {
  selectVariant: PropTypes.string
};

export default function ContainerView({ selectVariant, ...other }) {
  const isKenburns = selectVariant.includes('kenburns');

  return (
    <Paper
      sx={{
        height: 480,
        width: '100%',
        overflow: 'hidden',
        boxShadow: (theme) => theme.customShadows.z8
      }}
      {...other}
    >
      {isKenburns ? (
        <Box
          component={motion.img}
          src="/static/mock-images/feeds/feed_8.jpg"
          {...getVariant(selectVariant)}
          sx={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      ) : (
        <Box component={motion.div} {...getVariant(selectVariant)} sx={{ height: '100%', width: '100%' }} />
      )}
    </Paper>
  );
}
