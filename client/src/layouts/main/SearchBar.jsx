import PropTypes from 'prop-types';
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
import { experimentalStyled as styled } from '@material-ui/core/styles';
// hook
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLocales, useLocalStorage } from '../../hooks';
// components
import { MCircularProgress } from '../../components/@material-extend';
import { ThumbImgStyle } from '../../components/@styled';
// utils
import { fCurrency } from '../../utils/formatNumber';
import Label from '../../components/Label';

import { quickSearchProduct } from '../../redux/slices/searchProductSlice';

import * as typeUtils from '../../utils/typeUtils';

// ----------------------------------------------------------------------

const StyledAutocomplete = styled(Autocomplete)(({ theme }) => ({
  fontWeight: 'fontWeightBold',
  maxWidth: 400,
  marginLeft: 3,
  zIndex: 999,
  backgroundColor: `${theme.palette.primary.lighter}40`,
  '& .MuiAutocomplete-listbox': {
    maxHeight: '80vh'
  }
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  maxWidth: 400,
  marginLeft: 3,
  zIndex: 999,
  backgroundColor: `${theme.palette.primary.lighter}40`
}));

const StyledBox = styled(Box)(({ theme }) => ({
  position: 'fixed',
  backgroundColor: 'white',
  display: 'flex',
  flexDirection: 'column',
  maxWidth: 400,
  maxHeight: '50vh',
  overflowX: 'hidden',
  overflowY: 'auto'
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  cursor: 'pointer',
  display: 'flex',
  margin: theme.spacing(1, 1),
  padding: theme.spacing(1, 1),
  border: `solid 2px ${theme.palette.divider}`,
  flexDirection: 'row',
  '&:hover': {
    boxShadow: theme.customShadows.z8,
    color: theme.palette.primary.main,
    border: `solid 3px ${theme.palette.primary.main}`
  }
}));

// ----------------------------------------------------------------------

function ResultItem({ product, onClick }) {
  const { currentLang } = useLocales();
  const { price, marketPrice } = product.variants[0];
  const discountPercent = Math.ceil(((marketPrice - price) * 100) / marketPrice);

  const handleOnClick = (event) => {
    if (typeUtils.isFunction(onClick)) {
      console.log('handleOnClick', product);
      onClick(product);
    }
    event.stopPropagation();
  };

  return (
    <StyledPaper onClick={handleOnClick}>
      <ThumbImgStyle alt={product.name} src={product.variants[0].thumbnail} />
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
    </StyledPaper>
  );
}

ResultItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string,
    name: PropTypes.string,
    variants: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number,
        marketPrice: PropTypes.number,
        thumbnail: PropTypes.string
      })
    )
  }),
  onClick: PropTypes.func
};

// ----------------------------------------------------------------------

export default function SearchBar({ iconSx }) {
  const { t } = useLocales();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { results, isLoading } = useSelector((state) => state.searchProduct.quickSearch);

  const [isOpen, setOpen] = useState(true);
  const [keyWord, setKeyWord] = useState('');
  const [searchHistory, setSearchHistory] = useLocalStorage('searchHistory', []);

  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    if (keyWord.trim()) {
      dispatch(quickSearchProduct(keyWord));
    } else {
      setKeyWord('');
      dispatch(quickSearchProduct(''));
    }
  }, [dispatch, keyWord]);

  const handleTextChange = (e) => {
    setKeyWord(e.target.value.trim());
    if (e.target.value.trim() && !showResult) {
      setShowResult(true);
    }
  };

  const handleTextOnClick = (_event) => {
    setOpen(true);
    setShowResult(true);
  };

  const handleOpen = () => {
    setOpen((prev) => !prev);
  };

  const handleClose = () => {
    setOpen(false);
    setShowResult(false);
  };

  const handleNavigate = () => {
    setOpen(false);
    navigate(`/q?search=${encodeURIComponent(keyWord)}`);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleNavigate();
      setShowResult(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
      setShowResult(false);
    }
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
    setShowResult(false);
  };

  const renderResultItem = (props, product) => {
    console.log('useEffect-renderResultItem', product);

    if (isLoading) {
      return <MCircularProgress size={15} sx={{ my: 3 }} />;
    }
    return (
      <ResultItem {...props} key={product._id} product={product} onClick={() => handleOnClickResultItem(product)} />
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

  const renderSearchResult = () => {
    if (!showResult || !keyWord.trim()) {
      return null;
    }

    let children;
    if (isLoading) {
      children = (
        <Typography variant="body2" sx={{ ml: 3, mt: 1, mb: 1, width: 50000 }}>
          Đang tìm kiếm sản phẩm ....
        </Typography>
      );
    } else if (results?.length < 1) {
      children = (
        <Typography variant="body2" sx={{ ml: 3, mt: 1, mb: 1, width: 50000 }}>
          Không có sản phẩm phù hợp.
        </Typography>
      );
    } else {
      children = results.map((product) => (
        <ResultItem key={product._id} product={product} onClick={handleOnClickResultItem} />
      ));
    }
    return <StyledBox onBlur={() => setShowResult(false)}>{children}</StyledBox>;
  };

  return (
    <ClickAwayListener onClickAway={handleClose}>
      <Box>
        <StyledTextField
          fullWidth
          placeholder={t('common.search-placeholder')}
          size="small"
          InputProps={{
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
          onClick={handleTextOnClick}
          onChange={handleTextChange}
          onKeyDown={handleKeyDown}
          // onBlur={() => setShowResult(false)}
          onFocus={() => setShowResult(true)}
        />
        {renderSearchResult()}
      </Box>
    </ClickAwayListener>
  );
}
