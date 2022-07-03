import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
// icons
import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import personFill from '@iconify/icons-eva/person-fill';
import settings2Fill from '@iconify/icons-eva/settings-2-fill';
import { Link as RouterLink } from 'react-router-dom';
// material
import { alpha } from '@material-ui/core/styles';
import { Avatar, Button, Box, Divider, MenuItem, Typography } from '@material-ui/core';
// hooks
import useLocales from '../../hooks/useLocales';
import useAuth from '../../hooks/useAuth';
// components
import { LoginIcon, LogoutIcon, UserIcon } from '../../assets';
import { MButton, MIconButton, MHidden } from '../../components/@material-extend';
import MenuPopover from '../../components/MenuPopover';
import { PATH_DASHBOARD } from '../../routes/paths';

// ----------------------------------------------------------------------

const DEFAULT_MENU_OPTIONS = [
  { label: 'Trang chủ', icon: homeFill, linkTo: PATH_DASHBOARD.app },
  { label: 'Tài khoản', icon: personFill, linkTo: PATH_DASHBOARD.app.profile },
  { label: 'Cài đặt', icon: settings2Fill, linkTo: PATH_DASHBOARD.app.account_setting }
];

// ----------------------------------------------------------------------

AccountPopover.propTypes = {
  menuOptions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      icon: PropTypes.object,
      linkTo: PropTypes.string,
      isDevelop: PropTypes.bool
    })
  ),
  isShowTitle: PropTypes.bool
};

AccountPopover.defaultProps = {
  menuOptions: DEFAULT_MENU_OPTIONS,
  isShowTitle: false
};

export default function AccountPopover({ menuOptions, isShowTitle }) {
  const anchorRef = useRef(null);
  const { t, currentLang } = useLocales();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleLogout = async () => {
    await logout();
  };

  const iconBtnSx = {
    padding: 0,
    width: 44,
    height: 44,
    ...(open && {
      '&:before': {
        zIndex: 1,
        content: "''",
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        position: 'absolute',
        bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
      }
    })
  };

  const getUserInfo = () => {
    let info = user?.fullName || user?.email;
    if (user?.firstName || user?.lastName) {
      if (currentLang.value === 'vi') {
        info = `${user?.lastName} ${user?.firstName}`.trim();
      } else {
        info = `${user?.firstName} ${user?.lastName}`.trim();
      }
    }
    return info;
  };

  if (!user) {
    return (
      <>
        <MHidden width="mdUp">
          <MButton color="inherit" href="/auth/login">
            <LoginIcon sx={{ width: 20, height: 20 }} />
          </MButton>
        </MHidden>
        <MHidden width="mdDown">
          <MButton color="inherit" href="/auth/login">
            <LoginIcon sx={{ width: 20, height: 20, marginRight: 1 }} />
            Đăng nhập / Đăng ký
          </MButton>
        </MHidden>
      </>
    );
  }

  return (
    <>
      {isShowTitle ? (
        <Box ref={anchorRef}>
          <MHidden width="mdUp">
            <MIconButton onClick={handleOpen} sx={iconBtnSx}>
              <Avatar
                sx={{ width: 32, height: 32 }}
                alt="Profile avatar"
                src={user?.avatar || '/static/mock-images/avatars/avatar_default.jpg'}
              />
            </MIconButton>
          </MHidden>
          <MHidden width="mdDown">
            <MButton
              onClick={handleOpen}
              color="inherit"
              startIcon={
                <Avatar
                  sx={{ width: 32, height: 32 }}
                  alt="Profile avatar"
                  src={user?.avatar || '/static/mock-images/avatars/avatar_default.jpg'}
                />
              }
            >
              {getUserInfo()}
            </MButton>
          </MHidden>
        </Box>
      ) : (
        <MIconButton ref={anchorRef} onClick={handleOpen} sx={iconBtnSx}>
          <Avatar alt="Profile avatar" src={user?.avatar || '/static/mock-images/avatars/avatar_default.jpg'} />
        </MIconButton>
      )}

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ width: 220 }}>
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle1" noWrap>
            {user?.fullName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {user?.email || user?.username || user?.phone || '-'}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {menuOptions.map(({ label, linkTo, icon, isDevelop }, index) => (
          <MenuItem
            key={`menu-item-${index}-${label}`}
            to={linkTo}
            disabled={isDevelop || false}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box component={Icon} icon={icon} sx={{ mr: 2, width: 24, height: 24 }} />
            {label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button startIcon={<UserIcon />} fullWidth color="inherit" variant="outlined" onClick={handleLogout}>
            {t('auth.logout')}
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
