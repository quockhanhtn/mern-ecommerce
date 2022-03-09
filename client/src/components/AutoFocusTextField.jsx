import { useEffect, useRef } from 'react';
import { TextField } from '@material-ui/core';

function AutoFocusTextField(props) {
  const inputRef = useRef();

  useEffect(() => {
    const timeout = setTimeout(() => {
      inputRef.current.focus();
    }, 100);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  return <TextField inputRef={inputRef} {...props} />;
}

export default AutoFocusTextField;
