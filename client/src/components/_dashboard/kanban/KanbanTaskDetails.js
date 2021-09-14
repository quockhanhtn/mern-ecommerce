import { findIndex } from 'lodash';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
import calendarFill from '@iconify/icons-eva/calendar-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Stack,
  Drawer,
  Button,
  Avatar,
  Tooltip,
  Divider,
  MenuItem,
  TextField,
  Typography,
  OutlinedInput
} from '@material-ui/core';
//
import { MIconButton } from '../../@material-extend';
import Scrollbar from '../../Scrollbar';
import LightboxModal from '../../LightboxModal';
import KanbanCommentList from './KanbanCommentList';
import KanbanCommentInput from './KanbanCommentInput';

// ----------------------------------------------------------------------

const PRIORITIZES = ['low', 'medium', 'hight'];

KanbanTaskDetails.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  card: PropTypes.object
};

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.body2,
  fontSize: 13,
  color: theme.palette.text.secondary,
  width: 140,
  flexShrink: 0
}));

// ----------------------------------------------------------------------

export default function KanbanTaskDetails({ isOpen, onClose, card }) {
  const [prioritize, setPrioritize] = useState('low');
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const { name, description, assignee, attachments, comments } = card;
  const imagesLightbox = attachments;

  const handleChangePrioritize = (event) => {
    setPrioritize(event.target.value);
  };

  const handleOpenLightbox = (url) => {
    const selectedImage = findIndex(imagesLightbox, (index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <>
      <Drawer open={isOpen} onClose={onClose} anchor="right" PaperProps={{ sx: { width: 480 } }}>
        <Stack p={2.5} direction="row" alignItems="center" justifyContent="space-between">
          <Button size="small" variant="outlined" startIcon={<Icon icon={checkmarkFill} width={16} height={16} />}>
            Mark complete
          </Button>

          <Stack direction="row" spacing={1}>
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

            <Tooltip title="Add due date">
              <MIconButton size="small">
                <Icon icon={calendarFill} width={20} height={20} />
              </MIconButton>
            </Tooltip>
          </Stack>
        </Stack>

        <Divider />
        <Scrollbar>
          <Stack spacing={3} sx={{ px: 2.5, py: 5 }}>
            <OutlinedInput
              fullWidth
              multiline
              size="small"
              placeholder="Task name"
              value={name}
              sx={{
                typography: 'h6',
                '& .MuiOutlinedInput-notchedOutline': { borderColor: 'transparent' }
              }}
            />

            <Stack direction="row">
              <LabelStyle sx={{ mt: 2 }}>Assignee</LabelStyle>
              <Stack direction="row" flexWrap="wrap">
                {assignee.map((user) => (
                  <Avatar key={user.id} alt={user.name} src={user.avatar} sx={{ m: 0.5 }} />
                ))}
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="center">
              <LabelStyle> Due date</LabelStyle>
              2121
            </Stack>

            <Stack direction="row" alignItems="center">
              <LabelStyle>Prioritize</LabelStyle>
              <TextField
                fullWidth
                select
                size="small"
                value={prioritize}
                onChange={handleChangePrioritize}
                sx={{
                  '& svg': { display: 'none' },
                  '& fieldset': { display: 'none' },
                  '& .MuiSelect-root': { p: 0, display: 'flex', alignItems: 'center', typography: 'body2' }
                }}
              >
                {PRIORITIZES.map((option) => (
                  <MenuItem key={option} value={option} sx={{ typography: 'body2' }}>
                    <Box
                      sx={{
                        mr: 1,
                        width: 14,
                        height: 14,
                        borderRadius: 0.5,
                        bgcolor: 'error.main',
                        ...(option === 'low' && { bgcolor: 'info.main' }),
                        ...(option === 'medium' && { bgcolor: 'warning.main' })
                      }}
                    />
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Stack>

            <Stack direction="row">
              <LabelStyle sx={{ mt: 2 }}>Description</LabelStyle>
              <OutlinedInput
                fullWidth
                multiline
                rows={3}
                size="small"
                placeholder="Task name"
                value={description}
                sx={{ typography: 'body2' }}
              />
            </Stack>

            <Stack direction="row">
              <LabelStyle sx={{ mt: 2 }}>Attachments</LabelStyle>
              <Stack direction="row" flexWrap="wrap">
                {attachments.map((attachment) => (
                  <Box
                    component="img"
                    key={attachment}
                    src={attachment}
                    onClick={() => handleOpenLightbox(attachment)}
                    sx={{ width: 64, height: 64, objectFit: 'cover', cursor: 'pointer', borderRadius: 1, m: 0.5 }}
                  />
                ))}
              </Stack>
            </Stack>
          </Stack>
          <KanbanCommentList comments={comments} />
        </Scrollbar>

        <Divider />

        <KanbanCommentInput />
      </Drawer>

      <LightboxModal
        images={imagesLightbox}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onClose={() => setOpenLightbox(false)}
      />
    </>
  );
}
