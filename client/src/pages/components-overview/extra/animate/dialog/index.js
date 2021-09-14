import { useState } from 'react';
// material
import { Grid, Card } from '@material-ui/core';
//
import variantTypes from './types';
import ControlPanel from '../ControlPanel';
import ContainerView from './ContainerView';

// ----------------------------------------------------------------------

export default function Dialog() {
  const [open, setOpen] = useState(false);
  const [selectVariant, setSelectVariant] = useState('slideInUp');

  const handleChangeVariant = (event) => {
    setSelectVariant(event.target.value);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={9}>
          <ContainerView
            isOpen={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            selectVariant={selectVariant}
          />
        </Grid>
        <Grid item xs={3}>
          <ControlPanel
            variantTypes={variantTypes}
            selectVariant={selectVariant}
            onChangeVariant={handleChangeVariant}
          />
        </Grid>
      </Grid>
    </Card>
  );
}
