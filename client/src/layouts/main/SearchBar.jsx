import { useState, useEffect } from 'react';
// icons
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import {
  Box,
  Grid,
  Paper,
  Typography,
  InputAdornment,
  Autocomplete,
  TextField,
  Link,
  ClickAwayListener
} from '@material-ui/core';
// hook
import { useNavigate } from 'react-router-dom';
import useLocales from '../../hooks/useLocales';
import useLocalStorage from '../../hooks/useLocalStorage';
//
import { getSearchSuggest } from '../../api';
// components
import { MCircularProgress } from '../../components/@material-extend';
import { ThumbImgStyle } from '../../components/@styled';
// utils
import { fCurrency } from '../../utils/formatNumber';
import Label from '../../components/Label';

// ----------------------------------------------------------------------

export default function SearchBar({ iconSx }) {
  const { t, currentLang } = useLocales();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(true);
  const [keyWord, setKeyWord] = useState('');
  const [searchHistory, setSearchHistory] = useLocalStorage('searchHistory', []);

  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function fetchData(keyword) {
    try {
      setIsLoading(true);
      const { data } = await getSearchSuggest(keyword);
      setResults((prev) => [...data.data]);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  }

  useEffect(() => {
    if (keyWord.trim()) {
      fetchData(keyWord);
    } else {
      setKeyWord('');
      setResults([]);
    }
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
    const index = searchHistory?.findIndex((x) => x.slug === product.slug) || -1;
    if (index >= 0) {
      setSearchHistory((prev) => [prev[index], ...prev.slice(0, index), ...prev.slice(index + 1)]);
    } else {
      setSearchHistory((prev) => [{ slug: product.slug, name: product.name }, ...prev].slice(0, 10));
    }

    navigate(`/p/${product.slug}`);
    setOpen(false);
  };

  const renderResultItem = (product) => {
    const { price, marketPrice } = product.variants[0];
    const discountPercent = Math.ceil(((marketPrice - price) * 100) / marketPrice);

    if (isLoading) {
      return <MCircularProgress size={15} sx={{ my: 3 }} />;
    }

    return (
      <Grid key={product._id} item onClick={() => handleOnClickResultItem(product)} sx={{ cursor: 'pointer' }}>
        <Paper
          sx={{
            display: 'flex',
            marginLeft: 3,
            marginBottom: 2,
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

  const renderSearchHistory = () => {
    if (!searchHistory?.length > 0 || results?.length > 0) {
      return null;
    }
    return (
      <Box sx={{ alignItems: 'flex-start', width: '100%' }}>
        <Label sx={{ mb: 2 }}>Lịch sử tìm kiếm</Label>
        <Grid container spacing={1.5}>
          {searchHistory.map(({ name, slug }) => (
            <Grid key={slug} item sm={12} md={6} sx={{ cursor: 'pointer' }}>
              <Link href={`/p/${slug}`}>{name}</Link>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Autocomplete
        fullWidth
        freeSolo
        autoComplete
        open={isOpen}
        loading={isLoading}
        loadingText="Đang tìm kiếm sản phẩm ...."
        noOptionsText="Không có sản phẩm phù hợp."
        options={results}
        getOptionLabel={(option) => option.name || ''}
        renderOption={(props, product) => renderResultItem(product)}
        placeholder={t('common.search-placeholder')}
        startAdornment={
          <InputAdornment position="start">
            <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
          </InputAdornment>
        }
        renderInput={(params) => (
          <TextField
            {...params}
            disableUnderline
            placeholder={t('common.search-placeholder')}
            variant="standard"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <Box
                    component={Icon}
                    icon={searchFill}
                    sx={{ color: 'text.disabled', width: 20, height: 20, zIndex: 999 }}
                  />
                </InputAdornment>
              )
            }}
            onClick={() => setOpen(true)}
            onChange={handleTextChange}
          />
        )}
        onKeyPress={(e) => {
          if (e.key === 'Enter') {
            handleNavigate();
          }
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            setOpen(false);
          }
        }}
        sx={{ mr: 1, fontWeight: 'fontWeightBold', maxWidth: 380, marginLeft: 3, zIndex: 999 }}
      />
    </ClickAwayListener>
  );
}
