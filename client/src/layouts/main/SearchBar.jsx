import { useState, useEffect } from 'react';
// icons
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import {
  Box,
  Button,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Typography
} from '@material-ui/core';
// hook
import { useNavigate } from 'react-router-dom';
import useLocales from '../../hooks/useLocales';
//
import { getSearchSuggest } from '../../api';
// components
import { MIconButton } from '../../components/@material-extend';
import { ThumbImgStyle } from '../../components/@styled';
import AutoFocusTextField from '../../components/AutoFocusTextField';
// utils
import { fCurrency } from '../../utils/formatNumber';
import { getPaymentStatusColor } from '../../utils/labelColor';
import Label from '../../components/Label';

// ----------------------------------------------------------------------

export default function SearchBar({ iconSx }) {
  const { t, currentLang } = useLocales();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [keyWord, setKeyWord] = useState('');

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData(keyword) {
    try {
      const { data } = await getSearchSuggest(keyword);
      setResults((prev) => [...data.data]);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData(keyWord);
  }, [keyWord]);

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

  const handleOnClickResultItem = (product) => {
    navigate(`/ddd/${product.slug}`);
    setOpen(false);
  };

  const renderResultItem = (product) => {
    const { price, marketPrice } = product.variants[0];
    const discountPercent = Math.ceil(((marketPrice - price) * 100) / marketPrice);

    return (
      <Grid
        key={product._id}
        item
        sm={12}
        md={6}
        onClick={() => handleOnClickResultItem(product)}
        sx={{ cursor: 'pointer' }}
      >
        <Paper
          sx={{
            display: 'flex',
            flexDirection: 'row',
            '&:hover': {
              boxShadow: (theme) => theme.customShadows.z8,
              color: (theme) => theme.palette.primary.main
            }
          }}
        >
          <ThumbImgStyle alt="product image" src={product.variants[0].thumbnail} />
          <Box sx={{ display: 'flex', flexDirection: 'column' }}>
            <Typography variant="subtitle1" style={{ wordWrap: 'break-word' }}>
              {product.name}
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
              <Typography variant="body1" sx={{ color: 'inherit', mr: 2 }}>
                {fCurrency(price, currentLang.value)}
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.disabled', textDecoration: 'line-through', mr: 2 }}>
                {fCurrency(marketPrice, currentLang.value)}
              </Typography>
              <Label color="error">{`${discountPercent}%`}</Label>
              <Box sx={{ flexGrow: 1 }} />
            </Box>
          </Box>
        </Paper>
      </Grid>
    );
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <div>
        {!isOpen && (
          <MIconButton onClick={handleOpen} sx={iconSx}>
            <Icon icon={searchFill} width={20} height={20} />
          </MIconButton>
        )}

        <Dialog open={isOpen} maxWidth="lg" onClose={handleClose} fullWidth>
          <DialogTitle>
            <AutoFocusTextField
              fullWidth
              placeholder="Tìm kiếm sản phẩm ..."
              value={keyWord}
              onChange={handleTextChange}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  handleNavigate();
                }
              }}
            />
          </DialogTitle>
          <DialogContent sx={{ minHeight: '50vh' }}>
            <Box>
              <Grid container spacing={1.5}>
                {results.map((product) => renderResultItem(product))}
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} variant="contained">
              Đóng
            </Button>
          </DialogActions>
        </Dialog>

        {/* <Slide direction="down" in={isOpen} mountOnEnter unmountOnExit>
          <SearchBarStyle>
            <Autocomplete
              autoFocus
              fullWidth
              freeSolo
              options={['dsdssd', 'sdds']}
              placeholder={t('common.search-placeholder')}
              startAdornment={
                <InputAdornment position="start">
                  <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                </InputAdornment>
              }
              renderInput={(params) => (
                <Input
                  {...params}
                  autoFocus
                  fullWidth
                  disableUnderline
                  placeholder={t('common.search-placeholder')}
                  startAdornment={
                    <InputAdornment position="start">
                      <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
                    </InputAdornment>
                  }
                />
              )}
              // value={keyWord}
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
        </Slide> */}
      </div>
    </ClickAwayListener>
  );
}
