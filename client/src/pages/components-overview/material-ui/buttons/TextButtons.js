// material
import AlarmIcon from '@material-ui/icons/Alarm';
import { Grid, Button } from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// components
import { MButton } from '../../../../components/@material-extend';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { mx: '8px !important' }
};

export default function TextButtons() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Block title="Base" sx={style}>
          <Button color="inherit">Default</Button>
          <Button color="secondary">Secondary</Button>
          <Button>Primary</Button>
          <Button disabled>Disabled</Button>
          <Button>Link</Button>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Adding Colors" sx={style}>
          <MButton color="inherit">Default</MButton>
          <MButton>Primary</MButton>
          <MButton color="secondary">Secondary</MButton>
          <MButton color="info">Info</MButton>
          <MButton color="success">Success</MButton>
          <MButton color="warning">Warning</MButton>
          <MButton color="error">Error</MButton>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="With Icon & Loading" sx={style}>
          <MButton color="error" startIcon={<AlarmIcon />}>
            Icon Left
          </MButton>
          <MButton color="error" endIcon={<AlarmIcon />}>
            Icon Right
          </MButton>
          <LoadingButton loading>Submit</LoadingButton>
          <LoadingButton loading loadingIndicator="Loading...">
            Fetch data
          </LoadingButton>
          <LoadingButton loading loadingPosition="start" startIcon={<AlarmIcon />}>
            Save
          </LoadingButton>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Size" sx={style}>
          <MButton color="info" size="small">
            Small
          </MButton>
          <MButton color="info">Medium</MButton>
          <MButton color="info" size="large">
            Large
          </MButton>
        </Block>
      </Grid>
    </Grid>
  );
}
