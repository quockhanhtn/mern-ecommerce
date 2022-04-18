import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { TextField } from '@material-ui/core';

function AutoFocusTextField({ InputComponent, ...other }) {
  const inputRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current.focus();
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <InputComponent inputRef={inputRef} {...other} />;
}

AutoFocusTextField.propTypes = {
  InputComponent: PropTypes.any
};

AutoFocusTextField.defaultProps = {
  InputComponent: TextField
};

export default AutoFocusTextField;
