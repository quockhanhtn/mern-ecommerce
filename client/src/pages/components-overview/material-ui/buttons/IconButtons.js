// material
import AlarmIcon from '@material-ui/icons/Alarm';
import { Grid, IconButton } from '@material-ui/core';
// components
import { MIconButton } from '../../../../components/@material-extend';
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

export default function IconButtons() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Block title="Base" sx={style}>
          <IconButton color="inherit">
            <AlarmIcon />
          </IconButton>
          <IconButton>
            <AlarmIcon />
          </IconButton>
          <IconButton color="primary">
            <AlarmIcon />
          </IconButton>
          <IconButton color="secondary">
            <AlarmIcon />
          </IconButton>
          <IconButton disabled>
            <AlarmIcon />
          </IconButton>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Adding Colors" sx={style}>
          <MIconButton color="inherit">
            <AlarmIcon />
          </MIconButton>
          <MIconButton>
            <AlarmIcon />
          </MIconButton>
          <MIconButton color="primary">
            <AlarmIcon />
          </MIconButton>
          <MIconButton color="secondary">
            <AlarmIcon />
          </MIconButton>
          <MIconButton color="info">
            <AlarmIcon />
          </MIconButton>
          <MIconButton color="success">
            <AlarmIcon />
          </MIconButton>
          <MIconButton color="warning">
            <AlarmIcon />
          </MIconButton>
          <MIconButton color="error">
            <AlarmIcon />
          </MIconButton>
        </Block>
      </Grid>

      <Grid item xs={12} md={6}>
        <Block title="Size" sx={style}>
          <MIconButton size="small" color="info">
            <AlarmIcon fontSize="inherit" />
          </MIconButton>
          <MIconButton color="info">
            <AlarmIcon fontSize="small" />
          </MIconButton>
          <MIconButton color="info">
            <AlarmIcon />
          </MIconButton>
          <MIconButton color="info">
            <AlarmIcon fontSize="large" />
          </MIconButton>
        </Block>
      </Grid>
    </Grid>
  );
}
