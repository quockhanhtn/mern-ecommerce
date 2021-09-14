import PropTypes from 'prop-types';
// material
import { Grid, Paper } from '@material-ui/core';
// components
import { MCircularProgress } from '../../../../components/@material-extend';
//
import { Label } from '../../Block';

// ----------------------------------------------------------------------

const style = {
  minHeight: 160,
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': { m: 1 }
};

// ----------------------------------------------------------------------

ProgressCircular.propTypes = {
  progress: PropTypes.number
};

export default function ProgressCircular({ progress }) {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <Label title="Circular Indeterminate" />
        <Paper variant="outlined" sx={style}>
          <MCircularProgress color="inherit" />
          <MCircularProgress />
          <MCircularProgress color="secondary" />
          <MCircularProgress color="info" />
          <MCircularProgress color="success" />
          <MCircularProgress color="warning" />
          <MCircularProgress color="error" />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Label title="Circular determinate" />
        <Paper variant="outlined" sx={style}>
          <MCircularProgress color="info" />
          <MCircularProgress color="info" variant="determinate" value={25} />
          <MCircularProgress color="info" variant="determinate" value={50} />
          <MCircularProgress color="info" variant="determinate" value={75} />
          <MCircularProgress color="info" variant="determinate" value={100} />
          <MCircularProgress color="info" variant="determinate" value={progress} />
        </Paper>
      </Grid>

      <Grid item xs={12} md={4}>
        <Label title="Circular Size" />
        <Paper variant="outlined" sx={style}>
          <MCircularProgress size={48} color="info" />
          <MCircularProgress color="info" />
          <MCircularProgress size={32} color="info" />
          <MCircularProgress size={24} color="info" />
        </Paper>
      </Grid>
    </Grid>
  );
}
