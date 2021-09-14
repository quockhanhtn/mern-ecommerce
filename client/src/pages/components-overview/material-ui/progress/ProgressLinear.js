import PropTypes from 'prop-types';
// material
import { Box, Grid, Paper } from '@material-ui/core';
import { MLinearProgress } from '../../../../components/@material-extend';
//
import { Label } from '../../Block';

// ----------------------------------------------------------------------

const style = {
  p: 2,
  minHeight: 160,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { m: 1 }
};

// ----------------------------------------------------------------------

ProgressLinear.propTypes = {
  progress: PropTypes.number,
  buffer: PropTypes.number
};

export default function ProgressLinear({ progress, buffer }) {
  return (
    <Grid container spacing={5}>
      <Grid item xs={12} md={6}>
        <Label title="Linears Indeterminate" />
        <Paper variant="outlined" sx={style}>
          <Box sx={{ width: '100%' }}>
            <MLinearProgress color="inherit" /> <br />
            <MLinearProgress /> <br />
            <MLinearProgress color="secondary" /> <br />
            <MLinearProgress color="info" /> <br />
            <MLinearProgress color="success" /> <br />
            <MLinearProgress color="warning" /> <br />
            <MLinearProgress color="error" />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Label title="Linears Determinate" />
        <Paper variant="outlined" sx={style}>
          <Box sx={{ width: '100%' }}>
            <MLinearProgress variant="determinate" value={progress} color="inherit" />
            <br />
            <MLinearProgress variant="determinate" value={progress} />
            <br />
            <MLinearProgress variant="determinate" value={progress} color="secondary" />
            <br />
            <MLinearProgress variant="determinate" value={progress} color="info" />
            <br />
            <MLinearProgress variant="determinate" value={progress} color="success" />
            <br />
            <MLinearProgress variant="determinate" value={progress} color="warning" />
            <br />
            <MLinearProgress variant="determinate" value={progress} color="error" />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Label title="Linears Buffer" />
        <Paper variant="outlined" sx={style}>
          <Box sx={{ width: '100%' }}>
            <MLinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="inherit" />
            <br />
            <MLinearProgress variant="buffer" value={progress} valueBuffer={buffer} />
            <br />
            <MLinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="secondary" />
            <br />
            <MLinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="info" />
            <br />
            <MLinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="success" />
            <br />
            <MLinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="warning" />
            <br />
            <MLinearProgress variant="buffer" value={progress} valueBuffer={buffer} color="error" />
          </Box>
        </Paper>
      </Grid>

      <Grid item xs={12} md={6}>
        <Label title="Linears Query" />
        <Paper variant="outlined" sx={style}>
          <Box sx={{ width: '100%' }}>
            <MLinearProgress variant="query" value={progress} valueBuffer={buffer} color="inherit" />
            <br />
            <MLinearProgress variant="query" value={progress} valueBuffer={buffer} />
            <br />
            <MLinearProgress variant="query" value={progress} valueBuffer={buffer} color="secondary" />
            <br />
            <MLinearProgress variant="query" value={progress} valueBuffer={buffer} color="info" />
            <br />
            <MLinearProgress variant="query" value={progress} valueBuffer={buffer} color="success" />
            <br />
            <MLinearProgress variant="query" value={progress} valueBuffer={buffer} color="warning" />
            <br />
            <MLinearProgress variant="query" value={progress} valueBuffer={buffer} color="error" />
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
}
