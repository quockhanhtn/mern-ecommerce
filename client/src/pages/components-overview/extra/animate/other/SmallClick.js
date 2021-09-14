import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { Fab, Button, IconButton } from '@material-ui/core';
// components
import { ButtonAnimate } from '../../../../../components/animate';

// ----------------------------------------------------------------------

export default function SmallClick() {
  return (
    <>
      <ButtonAnimate>
        <Button variant="contained">Button</Button>
      </ButtonAnimate>
      <ButtonAnimate>
        <Fab size="small">
          <Icon icon={plusFill} width={20} height={20} />
        </Fab>
      </ButtonAnimate>
      <ButtonAnimate>
        <IconButton color="primary">
          <Icon icon={plusFill} width={20} height={20} />
        </IconButton>
      </ButtonAnimate>
    </>
  );
}
