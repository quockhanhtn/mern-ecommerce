// material
import { ButtonGroup, Button, Grid } from '@material-ui/core';
import { MButtonGroup } from '../../../../components/@material-extend';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' }
};

export default function ButtonGroups() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Block title="Base" sx={style}>
          <ButtonGroup color="inherit">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>

          <ButtonGroup variant="contained" color="inherit">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>

          <ButtonGroup variant="text" color="inherit">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>

          <ButtonGroup>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>

          <ButtonGroup variant="contained">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>

          <ButtonGroup variant="text">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>

          <ButtonGroup disabled>
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>

          <ButtonGroup disabled variant="contained">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>

          <ButtonGroup disabled variant="text">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Size" sx={style}>
          <MButtonGroup size="small" variant="contained" color="info">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="contained" color="info">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup size="large" variant="contained" color="info">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Orientation" sx={style}>
          <ButtonGroup orientation="vertical">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>

          <ButtonGroup orientation="vertical" variant="contained">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>

          <ButtonGroup orientation="vertical" variant="text">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </ButtonGroup>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Adding Colors" sx={style}>
          <MButtonGroup variant="contained" color="inherit">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="contained">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="contained" color="secondary">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="contained" color="info">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="contained" color="success">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="contained" color="warning">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="contained" color="error">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="outlined" color="inherit">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="outlined">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="outlined" color="secondary">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="outlined" color="info">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="outlined" color="success">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="outlined" color="warning">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="outlined" color="error">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="text" color="inherit">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="text">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="text" color="secondary">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="text" color="info">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="text" color="success">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="text" color="warning">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>

          <MButtonGroup variant="text" color="error">
            <Button>One</Button>
            <Button>Two</Button>
            <Button>Three</Button>
          </MButtonGroup>
        </Block>
      </Grid>
    </Grid>
  );
}
