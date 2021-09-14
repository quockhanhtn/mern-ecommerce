import { Icon } from '@iconify/react';
import calendarFill from '@iconify/icons-eva/calendar-fill';
// material
import { Stack, Paper, Button, Tooltip, OutlinedInput } from '@material-ui/core';
//
import { MIconButton } from '../../@material-extend';
import MyAvatar from '../../MyAvatar';

// ----------------------------------------------------------------------

export default function KanbanCommentInput() {
  return (
    <Stack direction="row" spacing={2} sx={{ py: 3, px: 2.5 }}>
      <MyAvatar />

      <Paper variant="outlined" sx={{ p: 1, flexGrow: 1 }}>
        <OutlinedInput
          fullWidth
          multiline
          row={2}
          minRows={2}
          placeholder="Type a message"
          // value={name}
          sx={{ '& fieldset': { display: 'none' } }}
        />

        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={0.5}>
            <Tooltip title="Add due date">
              <MIconButton size="small">
                <Icon icon={calendarFill} width={20} height={20} />
              </MIconButton>
            </Tooltip>
            <Tooltip title="Add due date">
              <MIconButton size="small">
                <Icon icon={calendarFill} width={20} height={20} />
              </MIconButton>
            </Tooltip>
            <Tooltip title="Add due date">
              <MIconButton size="small">
                <Icon icon={calendarFill} width={20} height={20} />
              </MIconButton>
            </Tooltip>
          </Stack>

          <Button variant="contained">Comment</Button>
        </Stack>
      </Paper>
    </Stack>
  );
}
