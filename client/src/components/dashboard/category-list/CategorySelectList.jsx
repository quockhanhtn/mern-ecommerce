// material
import { FormControl, InputLabel, Select } from '@material-ui/core';
import PropTypes from 'prop-types';

// ----------------------------------------------------------------------

CategorySelectList.propTypes = {
  categoryList: PropTypes.array.isRequired,
  key: PropTypes.string,
  value: PropTypes.object.isRequired,
  onChange: PropTypes.func
};

CategorySelectList.defaultProps = {
  key: 'slug',
  onChange: (e) => {
    console.log(e.target.value);
  }
};
// ----------------------------------------------------------------------

// eslint-disable-next-line react/prop-types
const RecursiveChildrenCategory = ({ categoryItem, key }) => {
  // eslint-disable-next-line react/prop-types
  if (categoryItem.children) {
    return (
      // eslint-disable-next-line react/prop-types
      <option sx={{ marginLeft: 2 }} key={categoryItem[key]} value={categoryItem[key]} label={categoryItem.name}>
        {/* eslint-disable-next-line react/prop-types */}
        {categoryItem.children.map((item) => (
          <RecursiveChildrenCategory categoryItem={item} key={key} />
        ))}
      </option>
    );
  }

  return (
    <option key={categoryItem[key]} value={categoryItem[key]}>
      {/* eslint-disable-next-line react/prop-types */}
      {categoryItem.name}
    </option>
  );
};

export default function CategorySelectList({ categoryList, key, value, onChange }) {
  return (
    <FormControl fullWidth>
      <InputLabel>Category</InputLabel>
      <Select label="Category" native value={value} onChange={onChange}>
        {categoryList.map((category) => (
          <optgroup key={category[key]} label={category.name}>
            {category.children.map((child) => (
              <RecursiveChildrenCategory categoryItem={child} key={key} />
            ))}
          </optgroup>
        ))}
      </Select>
    </FormControl>
  );
}
