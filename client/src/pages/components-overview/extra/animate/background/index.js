import { useState } from 'react';
// material
import { Grid, Card } from '@material-ui/core';
//
import variantTypes from './types';
import Toolbar from './Toolbar';
import ControlPanel from '../ControlPanel';
import ContainerView from './ContainerView';

// ----------------------------------------------------------------------

export default function Background() {
  const [count, setCount] = useState(0);
  const [selectVariant, setSelectVariant] = useState('kenburnsTop');

  const handleChangeVariant = (event) => {
    setCount(count + 1);
    setSelectVariant(event.target.value);
  };

  return (
    <Card sx={{ p: 3 }}>
      <Grid container sx={{ mb: 3 }}>
        <Grid item xs={9}>
          <Toolbar onRefresh={() => setCount(count + 1)} />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={9}>
          <ContainerView key={count} selectVariant={selectVariant} />
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
