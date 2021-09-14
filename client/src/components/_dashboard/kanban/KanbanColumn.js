import PropTypes from 'prop-types';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import plusFill from '@iconify/icons-eva/plus-fill';
// material
import { Paper, Stack, Button, ClickAwayListener } from '@material-ui/core';
// redux
import { useDispatch } from '../../../redux/store';
import { deleteColumn, updateColumn } from '../../../redux/slices/kanban';
//
import KanbanCard from './KanbanCard';
import KanbanColumnToolBar from './KanbanColumnToolBar';
import KanbanAddTask from './KanbanAddTask';

// ----------------------------------------------------------------------

KanbanColumn.propTypes = {
  column: PropTypes.object
};

export default function KanbanColumn({ column }) {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);

  const { name, cards, id } = column;
  const [columnName, setColumnName] = useState(name);

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClickAway = () => {
    setOpen(false);
  };

  const handleChangeName = (event) => {
    setColumnName(event.target.value);
  };

  const handleUpdateColumn = async () => {
    try {
      if (columnName !== name) {
        dispatch(updateColumn(id, { name: columnName }));
        enqueueSnackbar('Update success', { variant: 'success' });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteColumn = async () => {
    try {
      dispatch(deleteColumn(id));
      enqueueSnackbar('Delete success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Paper variant="outlined" sx={{ px: 2, py: 3, bgcolor: 'grey.5008' }}>
      <Stack spacing={3}>
        <KanbanColumnToolBar
          onOpen={handleOpen}
          columnId={id}
          columnName={columnName}
          onChangeName={handleChangeName}
          onDelete={handleDeleteColumn}
          onUpdate={handleUpdateColumn}
        />

        <Stack spacing={2} width={280}>
          {cards.map((card) => (
            <KanbanCard key={card.id} card={card} />
          ))}
        </Stack>

        <ClickAwayListener onClickAway={handleClickAway}>
          <Stack spacing={2}>
            {open && <KanbanAddTask />}

            <Button
              fullWidth
              size="large"
              color="inherit"
              startIcon={<Icon icon={plusFill} width={20} height={20} />}
              onClick={handleOpen}
              sx={{ fontSize: 14 }}
            >
              Add Task
            </Button>
          </Stack>
        </ClickAwayListener>
      </Stack>
    </Paper>
  );
}
