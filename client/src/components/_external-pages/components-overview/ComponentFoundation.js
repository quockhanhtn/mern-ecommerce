// material
import { Typography, Grid } from '@material-ui/core';
//
import ComponentCard from './ComponentCard';
import { FOUNDATION_LIST } from './PathConfig';

// ----------------------------------------------------------------------

export default function ComponentFoundation() {
  return (
    <Grid container spacing={3} sx={{ my: 10 }}>
      <Grid item xs={12} sm={4}>
        <Typography variant="h5" paragraph>
          Foundation
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Colors, Typography, Shadows…
        </Typography>
      </Grid>

      <Grid item xs={12} sm={8}>
        <Grid container spacing={3}>
          {FOUNDATION_LIST.map((item) => (
            <ComponentCard key={item.name} item={item} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
