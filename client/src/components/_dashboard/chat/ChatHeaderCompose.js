import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import parse from 'autosuggest-highlight/parse';
import match from 'autosuggest-highlight/match';
import checkmarkFill from '@iconify/icons-eva/checkmark-fill';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Avatar, TextField, Typography, Autocomplete } from '@material-ui/core';
//
import { MChip } from '../../@material-extend';
import SearchNotFound from '../../SearchNotFound';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2, 3)
}));

const AutocompleteStyle = styled('div')(({ theme }) => ({
  '& .MuiAutocomplete-root': {
    minWidth: 280,
    marginLeft: theme.spacing(2),
    '&.Mui-focused .MuiAutocomplete-inputRoot': {
      boxShadow: theme.customShadows.z8
    }
  },
  '& .MuiAutocomplete-inputRoot': {
    transition: theme.transitions.create('box-shadow', {
      easing: theme.transitions.easing.easeInOut,
      duration: theme.transitions.duration.shorter
    }),
    '& fieldset': {
      borderWidth: `1px !important`,
      borderColor: `${theme.palette.grey[500_32]} !important`
    }
  }
}));

// ----------------------------------------------------------------------

ChatHeaderCompose.propTypes = {
  contacts: PropTypes.array,
  recipients: PropTypes.array,
  onAddRecipient: PropTypes.func
};

export default function ChatHeaderCompose({ contacts, recipients, onAddRecipient, ...other }) {
  const [query, setQuery] = useState('');

  const handleChangeQuery = (event) => {
    setQuery(event.target.value);
  };

  const handleAddRecipient = (e, recipient) => {
    setQuery('');
    if (onAddRecipient) {
      onAddRecipient(recipient);
    }
  };

  return (
    <RootStyle {...other}>
      <Typography variant="subtitle2" sx={{ color: 'text.secondary' }}>
        To:
      </Typography>

      <AutocompleteStyle>
        <Autocomplete
          multiple
          size="small"
          disablePortal
          popupIcon={null}
          clearText={null}
          noOptionsText={<SearchNotFound searchQuery={query} />}
          onChange={handleAddRecipient}
          onInputChange={handleChangeQuery}
          options={contacts}
          getOptionLabel={(recipient) => recipient.name}
          renderOption={(props, recipient, { inputValue, selected }) => {
            const { name, avatar } = recipient;
            const matches = match(name, inputValue);
            const parts = parse(name, matches);
            return (
              <li {...props}>
                <Box
                  sx={{
                    width: 32,
                    height: 32,
                    overflow: 'hidden',
                    borderRadius: '50%',
                    position: 'relative'
                  }}
                >
                  <Avatar alt={name} src={avatar} />
                  <Box
                    sx={{
                      top: 0,
                      opacity: 0,
                      width: '100%',
                      height: '100%',
                      display: 'flex',
                      position: 'absolute',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                      transition: (theme) =>
                        theme.transitions.create('opacity', {
                          easing: theme.transitions.easing.easeInOut,
                          duration: theme.transitions.duration.shorter
                        }),
                      ...(selected && {
                        opacity: 1,
                        color: 'primary.main'
                      })
                    }}
                  >
                    <Icon icon={checkmarkFill} width={20} height={20} />
                  </Box>
                </Box>
                <Box sx={{ ml: 2 }} />
                {parts.map((part, index) => (
                  <Typography key={index} variant="subtitle2" color={part.highlight ? 'primary' : 'textPrimary'}>
                    {part.text}
                  </Typography>
                ))}
              </li>
            );
          }}
          renderTags={(recipients, getTagProps) =>
            recipients.map((recipient, index) => {
              const { id, name, avatar } = recipient;
              return (
                <MChip
                  key={id}
                  size="small"
                  label={name}
                  color="info"
                  avatar={<Avatar alt={name} src={avatar} />}
                  {...getTagProps({ index })}
                />
              );
            })
          }
          renderInput={(params) => <TextField {...params} placeholder={recipients.length === 0 ? 'Recipients' : ''} />}
        />
      </AutocompleteStyle>
    </RootStyle>
  );
}
