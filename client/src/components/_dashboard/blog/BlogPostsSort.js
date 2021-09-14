import PropTypes from 'prop-types';
// material
import { MenuItem, TextField } from '@material-ui/core';

// ----------------------------------------------------------------------

BlogPostsSort.propTypes = {
  query: PropTypes.string,
  options: PropTypes.array,
  onSort: PropTypes.func
};

export default function BlogPostsSort({ query, options, onSort }) {
  return (
    <TextField select size="small" value={query} onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
