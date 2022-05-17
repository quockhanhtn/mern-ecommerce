import editFill from '@iconify/icons-eva/edit-fill';
import eyeFill from '@iconify/icons-eva/eye-fill';
import searchFill from '@iconify/icons-eva/search-fill';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import closeCircleFill from '@iconify/icons-eva/close-circle-fill';
import { Icon } from '@iconify/react';
// material
import {
  Box,
  IconButton,
  InputAdornment,
  OutlinedInput,
  Toolbar,
  Tooltip,
  Typography,
  Autocomplete,
  Grid,
  TextField
} from '@material-ui/core';
import { experimentalStyled as styled, useTheme } from '@material-ui/core/styles';

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 64,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 1)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  minWidth: 320,
  width: '75%',
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { minWidth: 450, width: '100%', boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

ProductTableToolbar.propTypes = {
  searchPlaceHolder: PropTypes.string.isRequired,
  numSelected: PropTypes.number.isRequired,
  initialValue: PropTypes.string,
  onSearch: PropTypes.func,
  onCategoryChange: PropTypes.func,
  onBrandChange: PropTypes.func
};

export default function ProductTableToolbar({
  searchPlaceHolder,
  numSelected,
  initialValue,
  onSearch,
  onCategoryChange,
  onBrandChange
}) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  const { categoryFilter: lstCategories, brandFilter: lstBrands } = useSelector((state) => state.product.dashboard);

  const [categoryOpts, setCategoryOpts] = useState([]);
  const [brandOpts, setBrandOpts] = useState([]);

  const [searchValue, setSearchValue] = useState(initialValue);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState(null);

  useEffect(() => {
    setCategoryOpts([{ _id: '', name: 'Tất cả', slug: '', image: '' }, ...lstCategories]);
    setBrandOpts([{ _id: '', name: 'Tất cả', slug: '', image: '' }, ...lstBrands]);
    if (!selectedCategory) {
      setSelectedCategory({ _id: '', name: 'Tất cả', slug: '', image: '' });
    }
    if (!selectedBrand) {
      setSelectedBrand({ _id: '', name: 'Tất cả', slug: '', image: '' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lstCategories, lstBrands]);

  useEffect(() => {
    if (typeof onCategoryChange === 'function' && selectedCategory && '_id' in selectedCategory) {
      onCategoryChange(selectedCategory._id);
    }
  }, [onCategoryChange, selectedCategory]);

  useEffect(() => {
    if (typeof onBrandChange === 'function' && selectedBrand && '_id' in selectedBrand) {
      onBrandChange(selectedBrand._id);
    }
  }, [onBrandChange, selectedBrand]);

  const handleChangeCategoryFilter = (event, value) => {
    if (value) {
      setSelectedCategory(value);
    }
  };

  const handleChangeBrandFilter = (event, value) => {
    if (value) {
      setSelectedBrand(value);
    }
  };

  const handleOnChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleOnKeyPress = (event) => {
    if (event.key === 'Enter' && typeof onSearch === 'function') {
      onSearch(event, searchValue);
    }
  };

  const handleClearFilter = (event) => {
    setSelectedCategory(categoryOpts[0]);
    setSelectedBrand(brandOpts[0]);
    setSearchValue('');
    if (typeof onSearch === 'function') {
      onSearch(event, searchValue);
    }
  };

  const handleOnInputChangeCategory = (event, value, reason) => {
    console.log('handleClearFilter-handleOnInputChangeCategory', { event, value, reason });
  };

  return (
    <RootStyle
      sx={{
        ...(numSelected > 0 && {
          color: isLight ? 'primary.main' : 'text.primary',
          bgcolor: isLight ? 'primary.lighter' : 'primary.dark'
        })
      }}
    >
      {numSelected > 0 ? (
        <Typography color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Box sx={{ width: '100%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <SearchStyle
                value={searchValue}
                onChange={handleOnChange}
                onKeyPress={handleOnKeyPress}
                placeholder={searchPlaceHolder}
                size="small"
                startAdornment={
                  <InputAdornment position="start">
                    <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                }
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Autocomplete
                fullWidth
                disableClearable
                options={categoryOpts}
                getOptionLabel={(item) => item?.name || '<trống>'}
                value={selectedCategory}
                size="small"
                renderInput={(params) => <TextField {...params} label="Danh mục" />}
                onChange={handleChangeCategoryFilter}
                onInputChange={handleOnInputChangeCategory}
              />
            </Grid>
            <Grid item xs={6} sm={3}>
              <Autocomplete
                fullWidth
                disableClearable
                options={brandOpts}
                getOptionLabel={(item) => item?.name || '<trống>'}
                value={selectedBrand}
                size="small"
                renderInput={(params) => <TextField {...params} label="Thương hiệu" />}
                onChange={handleChangeBrandFilter}
              />
            </Grid>
          </Grid>
        </Box>
      )}

      {numSelected > 0 ? (
        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          {numSelected === 1 && (
            <>
              <Tooltip title="Edit">
                <IconButton>
                  <Icon icon={editFill} />
                </IconButton>
              </Tooltip>
              <Tooltip title="Hide / show">
                <IconButton>
                  <Icon icon={eyeFill} />
                </IconButton>
              </Tooltip>
            </>
          )}
          <Tooltip title="Delete">
            <IconButton>
              <Icon icon={trash2Fill} />
            </IconButton>
          </Tooltip>
        </Box>
      ) : (
        <Tooltip title="Bỏ lọc">
          <IconButton onClick={handleClearFilter}>
            <Icon icon={closeCircleFill} />
          </IconButton>
        </Tooltip>
      )}
    </RootStyle>
  );
}
