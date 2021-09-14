import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import archiveFill from '@iconify/icons-eva/archive-fill';
import roundMarkEmailRead from '@iconify/icons-ic/round-mark-email-read';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Tooltip, IconButton } from '@material-ui/core';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: 40,
  zIndex: 99,
  opacity: 0,
  margin: 'auto',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  top: theme.spacing(1),
  right: theme.spacing(1),
  bottom: theme.spacing(1),
  justifyContent: 'center',
  padding: theme.spacing(0, 0.75),
  boxShadow: theme.customShadows.z12,
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.paper,
  transition: theme.transitions.create('opacity')
}));

// ----------------------------------------------------------------------

MailItemAction.propTypes = {
  handleArchive: PropTypes.func,
  handleDelete: PropTypes.func,
  handleMarkRead: PropTypes.func,
  handleHidden: PropTypes.func
};

export default function MailItemAction({ handleArchive, handleDelete, handleMarkRead, handleHidden, ...other }) {
  const MAIL_ACTIONS = [
    {
      name: 'Archive',
      icon: archiveFill,
      action: handleArchive
    },
    {
      name: 'Delete',
      icon: trash2Fill,
      action: handleDelete
    },
    {
      name: 'Mark Email Read',
      icon: roundMarkEmailRead,
      action: handleMarkRead
    },
    {
      name: 'Hidden Email',
      icon: eyeOffFill,
      action: handleHidden
    }
  ];

  return (
    <RootStyle {...other}>
      {MAIL_ACTIONS.map((action) => (
        <Tooltip key={action.name} title={action.name}>
          <IconButton
            size="small"
            onClick={action.action}
            sx={{
              mx: 0.75,
              '&:hover': {
                color: 'text.primary'
              }
            }}
          >
            <Icon icon={action.icon} width={24} height={24} />
          </IconButton>
        </Tooltip>
      ))}
    </RootStyle>
  );
}
