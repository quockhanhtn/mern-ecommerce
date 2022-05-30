import PropTypes from 'prop-types';
import PhoneInput from 'react-phone-input-2';
import './css/react-phone-input-2.css';

function CustomPhoneInput(props) {
  const {
    label = 'Phone',
    country = 'vn',
    preferredCountries = ['vn', 'us'],
    inputProps = {},
    masks = { vn: '... ... ...' },
    onEnter,
    ...otherProps
  } = props;

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && typeof onEnter === 'function') {
      onEnter();
    }
  };

  return (
    <PhoneInput
      country={country}
      preferredCountries={preferredCountries}
      specialLabel={label}
      onKeyDown={handleKeyDown}
      enableSearch
      inputProps={{
        name: 'phone',
        required: true,
        autoFocus: true,
        style: { width: '100%' },
        ...{ inputProps }
      }}
      masks={masks}
      {...otherProps}
    />
  );
}

CustomPhoneInput.propTypes = {
  label: PropTypes.string,
  country: PropTypes.string,
  preferredCountries: PropTypes.arrayOf(PropTypes.string),
  masks: PropTypes.object,
  onEnter: PropTypes.func,
  inputProps: PropTypes.any
};

export default CustomPhoneInput;
