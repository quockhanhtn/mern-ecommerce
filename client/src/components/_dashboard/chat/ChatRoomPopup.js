import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import pinFill from '@iconify/icons-eva/pin-fill';
import phoneFill from '@iconify/icons-eva/phone-fill';
import emailFill from '@iconify/icons-eva/email-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Avatar, Typography, DialogContent } from '@material-ui/core';
//
import { DialogAnimate } from '../../animate';

// ----------------------------------------------------------------------

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: theme.spacing(1.5)
}));

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 16,
  height: 16,
  marginRight: theme.spacing(1),
  color: theme.palette.text.secondary
}));

// ----------------------------------------------------------------------

ChatRoomPopup.propTypes = {
  participant: PropTypes.object,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

export default function ChatRoomPopup({ participant, isOpen, onClose, ...other }) {
  const { name, avatar, position, address, phone, email } = participant;

  return (
    <DialogAnimate fullWidth maxWidth="xs" open={isOpen} onClose={onClose} {...other}>
      <DialogContent sx={{ pb: 5, textAlign: 'center' }}>
        <Avatar
          alt={name}
          src={avatar}
          sx={{
            mt: 5,
            mb: 2,
            mx: 'auto',
            width: 96,
            height: 96
          }}
        />
        <Typography variant="h6">{name}</Typography>
        <Typography variant="body2" paragraph sx={{ color: 'text.secondary' }}>
          {position}
        </Typography>

        <RowStyle>
          <IconStyle icon={pinFill} />
          <Typography variant="body2">{address}</Typography>
        </RowStyle>
        <RowStyle>
          <IconStyle icon={phoneFill} />
          <Typography variant="body2">{phone}</Typography>
        </RowStyle>
        <RowStyle>
          <IconStyle icon={emailFill} />
          <Typography variant="body2">{email}</Typography>
        </RowStyle>
      </DialogContent>
    </DialogAnimate>
  );
}
