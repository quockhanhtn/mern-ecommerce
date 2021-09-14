import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkCircle2Outline from '@iconify/icons-eva/checkmark-circle-2-outline';
import radioButtonOffOutline from '@iconify/icons-eva/radio-button-off-outline';
// material
import { Paper, Typography, Box, Stack, Checkbox } from '@material-ui/core';
//
import KanbanTaskDetails from './KanbanTaskDetails';

// ----------------------------------------------------------------------

KanbanCard.propTypes = {
  card: PropTypes.object
};

export default function KanbanCard({ card }) {
  const { name, attachments, description } = card;
  const [open, setOpen] = useState(false);
  const [completed, setCompleted] = useState(card.completed);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeComplete = (event) => {
    setCompleted(event.target.checked);
  };

  return (
    <>
      <Paper
        sx={{
          p: 2,
          width: 1,
          cursor: 'pointer',
          position: 'relative',
          boxShadow: (theme) => theme.customShadows.z1,
          '&:hover': {
            boxShadow: (theme) => theme.customShadows.z16
          }
        }}
      >
        <Stack spacing={2}>
          {attachments.length > 0 && (
            <Box
              sx={{
                pt: '60%',
                position: 'relative',
                borderRadius: 1,
                overflow: 'hidden',
                ...(completed && { opacity: 0.48 })
              }}
            >
              <Box
                component="img"
                src={attachments[0]}
                onClick={handleOpen}
                sx={{ position: 'absolute', top: 0, width: 1, height: 1 }}
              />
            </Box>
          )}
          <Stack direction="row" alignItems="center">
            <Checkbox
              disableRipple
              checked={completed}
              icon={<Icon icon={radioButtonOffOutline} />}
              checkedIcon={<Icon icon={checkmarkCircle2Outline} />}
              onChange={handleChangeComplete}
            />
            <Typography variant="subtitle2" noWrap onClick={handleOpen} sx={{ ...(completed && { opacity: 0.48 }) }}>
              {name}
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      <KanbanTaskDetails isOpen={open} onClose={handleClose} name={name} description={description} card={card} />
    </>
  );
}
