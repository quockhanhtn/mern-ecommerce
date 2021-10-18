import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import closeFill from '@iconify/icons-eva/close-fill';
import options2Fill from '@iconify/icons-eva/options-2-fill';
// material
import { Box, Backdrop, Paper, Tooltip, Divider, Typography, Stack } from '@material-ui/core';
// hook
import useLocales from '../../hooks/useLocales';
//
import Scrollbar from '../Scrollbar';
import { MIconButton } from '../@material-extend';
import SettingMode from './SettingMode';
import SettingColor from './SettingColor';
import SettingDirection from './SettingDirection';
import SettingFullscreen from './SettingFullscreen';

// ----------------------------------------------------------------------

const DRAWER_WIDTH = 260;

export default function Settings() {
  const { t } = useLocales();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [open]);

  const handleToggle = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={handleClose} />

      <Box
        sx={{
          top: 12,
          bottom: 12,
          right: 0,
          position: 'fixed',
          zIndex: (theme) => theme.zIndex.drawer + 2,
          ...(open && { right: 12 })
        }}
      >
        <Box
          sx={{
            p: 0.5,
            px: '4px',
            mt: -3,
            left: -44,
            top: '50%',
            color: 'grey.800',
            position: 'absolute',
            bgcolor: 'common.white',
            borderRadius: '24px 0 16px 24px',
            boxShadow: (theme) => theme.customShadows.z12
          }}
        >
          <Tooltip title={t('settings.title')}>
            <MIconButton
              color="inherit"
              onClick={handleToggle}
              sx={{
                p: 0,
                width: 40,
                height: 40,
                transition: (theme) => theme.transitions.create('all'),
                '&:hover': { color: 'primary.main', bgcolor: 'transparent' }
              }}
            >
              <Icon icon={open ? closeFill : options2Fill} width={20} height={20} />
            </MIconButton>
          </Tooltip>
        </Box>

        <Paper
          sx={{
            height: 1,
            width: '0px',
            overflow: 'hidden',
            boxShadow: (theme) => theme.customShadows.z24,
            transition: (theme) => theme.transitions.create('width'),
            ...(open && { width: DRAWER_WIDTH })
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ py: 2, pr: 1, pl: 2.5 }}>
            <Typography variant="subtitle1">{t('settings.title')}</Typography>
            <MIconButton onClick={handleClose}>
              <Icon icon={closeFill} width={20} height={20} />
            </MIconButton>
          </Stack>
          <Divider />

          <Scrollbar sx={{ height: 1 }}>
            <Stack spacing={4} sx={{ pt: 3, px: 3, pb: 15 }}>
              <SettingFullscreen titleOn={t('settings.full-screen')} titleOff={t('settings.exit-full-screen')} />

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">{t('settings.mode')}</Typography>
                <SettingMode />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">{t('settings.color')}</Typography>
                <SettingColor />
              </Stack>

              <Stack spacing={1.5}>
                <Typography variant="subtitle2">{t('settings.direction')}</Typography>
                <SettingDirection />
              </Stack>
            </Stack>
          </Scrollbar>
        </Paper>
      </Box>
    </>
  );
}
