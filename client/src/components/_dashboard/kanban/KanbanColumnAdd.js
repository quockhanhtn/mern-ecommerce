import { useState, useRef, useEffect } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { OutlinedInput, Paper, Stack, Button, ClickAwayListener } from '@material-ui/core';
// redux
import { useDispatch } from '../../../redux/store';
import { createColumn } from '../../../redux/slices/kanban';

// ----------------------------------------------------------------------

export default function KanbanColumnAdd() {
  const nameRef = useRef(null);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [name, setName] = useState('');
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      if (nameRef !== null) {
        nameRef.current.focus();
      }
    }
  }, [open]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };

  const handleCreateColumn = async () => {
    try {
      if (name) {
        dispatch(createColumn({ name }));
        enqueueSnackbar('Create section success', { variant: 'success' });
        setName('');
      }
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === 'Enter' || event.keyCode === 13) {
      handleCreateColumn();
    }
  };

  return (
    <Paper sx={{ minWidth: 280, width: 280 }}>
      {!open && (
        <Button
          fullWidth
          size="large"
          color="inherit"
          variant="outlined"
          startIcon={<Icon icon={plusFill} width={20} height={20} />}
          onClick={handleOpen}
        >
          Add section
        </Button>
      )}

      {open && (
        <ClickAwayListener onClickAway={handleCreateColumn}>
          <Stack spacing={2}>
            <OutlinedInput
              fullWidth
              placeholder="New section"
              inputRef={nameRef}
              value={name}
              onChange={handleChangeName}
              onKeyUp={handleKeyUp}
              sx={{ typography: 'h6' }}
            />
          </Stack>
        </ClickAwayListener>
      )}
    </Paper>
  );
}
