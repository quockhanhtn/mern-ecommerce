// material
import { Typography, Grid } from '@material-ui/core';
//
import ComponentCard from './ComponentCard';
import { MATERIAL_LIST } from './PathConfig';

// ----------------------------------------------------------------------

export default function ComponentMaterialUI() {
  return (
    <Grid container spacing={3} sx={{ mb: 10 }}>
      <Grid item xs={12} sm={4}>
        <Typography variant="h5" paragraph>
          Material UI
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Components from Material-UI©
        </Typography>
      </Grid>

      <Grid item xs={12} sm={8}>
        <Grid container spacing={3}>
          {MATERIAL_LIST.map((item) => (
            <ComponentCard key={item.name} item={item} />
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
