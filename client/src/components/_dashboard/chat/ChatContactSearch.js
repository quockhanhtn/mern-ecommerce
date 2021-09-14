import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, FormControl, OutlinedInput, InputAdornment, ClickAwayListener } from '@material-ui/core';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  marginTop: theme.spacing(2)
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  transition: theme.transitions.create('box-shadow', {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

ChatContactSearch.propTypes = {
  query: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onClickAway: PropTypes.func
};

export default function ChatContactSearch({ query, onChange, onFocus, onClickAway, ...other }) {
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <RootStyle {...other}>
        <FormControl fullWidth size="small">
          <SearchStyle
            value={query}
            onFocus={onFocus}
            onChange={onChange}
            placeholder="Search contacts..."
            startAdornment={
              <InputAdornment position="start">
                <Box component={Icon} icon={searchFill} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
          />
        </FormControl>
      </RootStyle>
    </ClickAwayListener>
  );
}
