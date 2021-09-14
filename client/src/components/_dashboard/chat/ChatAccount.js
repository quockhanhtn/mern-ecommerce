import { Icon } from '@iconify/react';
import { useState } from 'react';
import { capitalCase } from 'change-case';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import roundAccountBox from '@iconify/icons-ic/round-account-box';
import roundPowerSettingsNew from '@iconify/icons-ic/round-power-settings-new';
// material
import {
  Box,
  List,
  Select,
  Divider,
  Popover,
  Tooltip,
  ListItem,
  Typography,
  IconButton,
  ListItemIcon,
  ListItemText
} from '@material-ui/core';
// hooks
import useAuth from '../../../hooks/useAuth';
//
import MyAvatar from '../../MyAvatar';
import BadgeStatus from '../../BadgeStatus';

// ----------------------------------------------------------------------

const STATUS = ['online', 'invisible', 'away'];

export default function ChatAccount() {
  const { user } = useAuth();
  const [open, setOpen] = useState(null);
  const [status, setStatus] = useState('online');

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleChangeStatus = (event) => {
    setStatus(event.target.value);
  };

  return (
    <>
      <Box sx={{ position: 'relative' }}>
        <MyAvatar onClick={handleOpen} sx={{ cursor: 'pointer', width: 48, height: 48 }} />
        <BadgeStatus status={status} sx={{ position: 'absolute', bottom: 2, right: 2 }} />
      </Box>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Box
          sx={{
            py: 2,
            pr: 1,
            pl: 2.5,
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <MyAvatar />

          <Box sx={{ ml: 2, mr: 3 }}>
            <Typography noWrap variant="subtitle1">
              {user.displayName}
            </Typography>
            <Typography noWrap variant="body2" sx={{ color: 'text.secondary' }}>
              {user.email}
            </Typography>
          </Box>

          <Tooltip title="Log out">
            <IconButton>
              <Icon icon={roundPowerSettingsNew} width={24} height={24} />
            </IconButton>
          </Tooltip>
        </Box>

        <Divider />

        <List>
          <ListItem disableGutters sx={{ py: 1, px: 2.5 }}>
            <ListItemIcon>
              <Box
                sx={{
                  width: 24,
                  height: 24,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <BadgeStatus status={status} />
              </Box>
            </ListItemIcon>
            <ListItemText>
              <Select
                native
                fullWidth
                size="small"
                value={status}
                onChange={handleChangeStatus}
                sx={{
                  '& svg': { display: `none` },
                  '& select': {
                    padding: 0,
                    typography: 'body2',
                    '&:focus': { bgcolor: 'transparent' }
                  },
                  '& fieldset': { borderWidth: `0 !important` }
                }}
              >
                {STATUS.map((option) => (
                  <option key={option} value={option}>
                    {capitalCase(option)}
                  </option>
                ))}
              </Select>
            </ListItemText>
          </ListItem>

          <ListItem button disableGutters sx={{ py: 1, px: 2.5 }}>
            <ListItemIcon>
              <Icon icon={roundAccountBox} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Profile"
              primaryTypographyProps={{
                variant: 'body2'
              }}
            />
          </ListItem>

          <ListItem button disableGutters sx={{ py: 1, px: 2.5 }}>
            <ListItemIcon>
              <Icon icon={settings2Fill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              primaryTypographyProps={{
                variant: 'body2'
              }}
            />
          </ListItem>
        </List>
      </Popover>
    </>
  );
}
