import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { Box, Card, Typography } from '@material-ui/core';
import { MotionContainer, varBounceIn } from './animate';
import { EmptyBoxIcon } from '../assets';

// ----------------------------------------------------------------------

EmptyCard.propTypes = {
  title: PropTypes.string.isRequired
};

// ----------------------------------------------------------------------

export default function EmptyCard({ title }) {
  return (
    <MotionContainer initial="initial" open>
      <Card>
        <Box sx={{ margin: 'auto', marginTop: 10, marginBottom: 10, textAlign: 'center' }}>
          <motion.div variants={varBounceIn}>
            <Typography variant="h4" paragraph>
              {title}
            </Typography>
          </motion.div>
          <motion.div variants={varBounceIn}>
            <EmptyBoxIcon sx={{ margin: 'auto' }} height={200} width={200} />
          </motion.div>
        </Box>
      </Card>
    </MotionContainer>
  );
}
