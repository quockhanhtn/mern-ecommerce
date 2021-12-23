import PropTypes from 'prop-types';
// icons
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { alpha } from '@material-ui/core/styles';
import { Box, MenuItem, ListItemIcon, ListItemText } from '@material-ui/core';
// hooks
import { useRef, useState } from 'react';
import { useSnackbar } from 'notistack';
import useLocales from '../../hooks/useLocales';
// components
import MenuPopover from '../../components/MenuPopover';
import { MButton, MIconButton, MHidden } from '../../components/@material-extend';

// ----------------------------------------------------------------------

LanguagePopover.propTypes = {
  isShowTitle: PropTypes.bool
};

LanguagePopover.defaultProps = {
  isShowTitle: false
};

export default function LanguagePopover({ isShowTitle }) {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const { allLang, currentLang, t, onChangeLang } = useLocales();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangeLang = (value, isAvailable) => {
    if (isAvailable) {
      onChangeLang(value);
    } else {
      enqueueSnackbar(t('settings.language-not-available'), {
        variant: 'error',
        action: (key) => (
          <MIconButton size="small" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} />
          </MIconButton>
        )
      });
    }
    handleClose();
  };

  const iconButtonSx = {
    padding: 0,
    width: 44,
    height: 44,
    ...(open && {
      bgcolor: (theme) => alpha(theme.palette.primary.main, theme.palette.action.focusOpacity)
    })
  };

  return (
    <>
      {isShowTitle ? (
        <Box ref={anchorRef}>
          <MHidden width="mdUp">
            <MIconButton onClick={handleOpen} sx={iconButtonSx}>
              <img src={currentLang.icon} alt={currentLang.label} />
            </MIconButton>
          </MHidden>
          <MHidden width="mdDown">
            <MButton
              onClick={handleOpen}
              color="inherit"
              startIcon={<img src={currentLang.icon} alt={currentLang.label} />}
            >
              {currentLang.label}
            </MButton>
          </MHidden>
        </Box>
      ) : (
        <MIconButton ref={anchorRef} onClick={handleOpen} sx={iconButtonSx}>
          <img src={currentLang.icon} alt={currentLang.label} />
        </MIconButton>
      )}

      <MenuPopover open={open} onClose={handleClose} anchorEl={anchorRef.current} sx={{ py: 1 }}>
        {allLang.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currentLang.value}
            onClick={() => handleChangeLang(option.value, option.isAvailable)}
            sx={{ py: 1, px: 2.5 }}
          >
            <ListItemIcon>
              <Box component="img" alt={option.label} src={option.icon} />
            </ListItemIcon>
            <ListItemText primaryTypographyProps={{ variant: 'body2' }}>{option.label}</ListItemText>
          </MenuItem>
        ))}
      </MenuPopover>
    </>
  );
}
