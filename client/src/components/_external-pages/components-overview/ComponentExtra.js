// material
import { Typography, Grid } from '@material-ui/core';
//
import ComponentCard from './ComponentCard';
import { EXTRA_LIST } from './PathConfig';

// ----------------------------------------------------------------------

export default function ComponentExtra() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={4}>
        <Typography variant="h5" paragraph>
          Extra Component
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Chart, Map, Editor…
        </Typography>
      </Grid>

      <Grid item xs={12} sm={8}>
        <Grid container spacing={3}>
          {EXTRA_LIST.map((item) => (
            <ComponentCard key={item.name} item={item} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
