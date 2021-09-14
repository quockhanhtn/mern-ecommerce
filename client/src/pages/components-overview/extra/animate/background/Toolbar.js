import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import refreshFill from '@iconify/icons-eva/refresh-fill';
// material
import { Paper } from '@material-ui/core';
// components
import { MIconButton } from '../../../../../components/@material-extend';

// ----------------------------------------------------------------------

Toolbar.propTypes = {
  onRefresh: PropTypes.func
};

export default function Toolbar({ onRefresh, ...other }) {
  return (
    <Paper sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }} {...other}>
      <MIconButton onClick={onRefresh}>
        <Icon icon={refreshFill} width={20} height={20} />
      </MIconButton>
    </Paper>
  );
}
