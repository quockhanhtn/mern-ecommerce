import { Icon } from '@iconify/react';
import peopleFill from '@iconify/icons-eva/people-fill';
import calendarFill from '@iconify/icons-eva/calendar-fill';
import checkmarkCircle2Outline from '@iconify/icons-eva/checkmark-circle-2-outline';
import radioButtonOffOutline from '@iconify/icons-eva/radio-button-off-outline';
// material
import { OutlinedInput, Paper, Stack, Tooltip, Checkbox } from '@material-ui/core';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

export default function KanbanAddTask() {
  return (
    <Paper variant="outlined" sx={{ p: 2 }}>
      <OutlinedInput
        multiline
        size="small"
        placeholder="Task name"
        sx={{
          '& input': { p: 0 },
          '& fieldset': { borderColor: 'transparent !important' }
        }}
      />

      <Stack direction="row" justifyContent="space-between">
        <Tooltip title="Mark task complete">
          <Checkbox
            disableRipple
            icon={<Icon icon={radioButtonOffOutline} />}
            checkedIcon={<Icon icon={checkmarkCircle2Outline} />}
          />
        </Tooltip>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Tooltip title="Assign this task">
            <MIconButton size="small">
              <Icon icon={peopleFill} width={20} height={20} />
            </MIconButton>
          </Tooltip>
          <Tooltip title="Add due date">
            <MIconButton size="small">
              <Icon icon={calendarFill} width={20} height={20} />
            </MIconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
}
