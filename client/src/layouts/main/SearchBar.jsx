import { Icon } from '@iconify/react';
import { useState } from 'react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { experimentalStyled as styled, alpha } from '@material-ui/core/styles';
import { Box, Input, Slide, Button, InputAdornment, ClickAwayListener } from '@material-ui/core';
// hook
import { useNavigate } from 'react-router-dom';
import useLocales from '../../hooks/useLocales';
// components
import { MIconButton } from '../../components/@material-extend';

// ----------------------------------------------------------------------

const APP_BAR_MOBILE = 64;
const APP_BAR_DESKTOP = 110;

const SearchBarStyle = styled('div')(({ theme }) => ({
  top: 0,
  left: 0,
  zIndex: 99,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  alignItems: 'center',
  height: APP_BAR_MOBILE,
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  padding: theme.spacing(0, 3),
  boxShadow: theme.customShadows.z8,
  backgroundColor: `${alpha(theme.palette.background.default, 0.72)}`,
  [theme.breakpoints.up('md')]: {
    height: APP_BAR_DESKTOP,
    padding: theme.spacing(0, 5)
  }
}));

// ----------------------------------------------------------------------

export default function SearchBar() {
  const { t } = useLocales();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [keyWord, setKeyWord] = useState('');

  const handleTextChange = (e) => {
    setKeyWord(e.target.value);
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleNavigate = () => {
    setOpen(false);
    navigate(`/q?search=${encodeURIComponent(keyWord)}`);
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <MIconButton onClick={handleOpen}>
            <Icon icon={searchFill} width={20} height={20} />
          </MIconButton>
        )}

        <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchBarStyle>
            <Input
              autoFocus
              fullWidth
              disableUnderline
              placeholder={t('common.search-placeholder')}
              startAdornment={
                <InputAdornment position="start">
                  <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
              value={keyWord}
              onChange={handleTextChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleNavigate();
                }
              }}
              sx={{ mr: 1, fontWeight: 'fontWeightBold' }}
            />
            <Button style={{ textTransform: 'none' }} variant="contained" onClick={handleNavigate}>
              {t('common.search-btn')}
            </Button>
          </SearchBarStyle>
        </Slide>
      </div>
    </ClickAwayListener>
  );
}
