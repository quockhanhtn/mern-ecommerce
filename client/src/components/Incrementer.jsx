import PropTypes from 'prop-types';
// icons
import add12Filled from '@iconify/icons-fluent/add-12-filled';
import subtract12Filled from '@iconify/icons-fluent/subtract-12-filled';
import { Icon } from '@iconify/react';
//
import { useField } from 'formik';
// material
import { Box, Typography } from '@material-ui/core';
// components
import { MIconButton } from './@material-extend';

Incrementer.propTypes = {
  available: PropTypes.number
};

function Incrementer(props) {
  const { available } = props;

  // const [field, , helpers] = useField(props);
  // const { value } = field;
  // const { setValue } = helpers;
  const [{ value }, , { setValue }] = useField(props);

  const incrementQuantity = () => {
    if (typeof setValue === 'function') {
      setValue((prev) => prev + 1);
    }
  };
  const decrementQuantity = () => {
    if (typeof setValue === 'function') {
      setValue((prev) => prev - 1);
    }
  };

  return (
    <Box
      sx={{
        py: 0.5,
        px: 0.75,
        border: 1,
        lineHeight: 0,
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        borderColor: 'grey.50032'
      }}
    >
      <MIconButton size="small" color="inherit" disabled={value <= 1} onClick={decrementQuantity}>
        <Icon icon={subtract12Filled} width={16} height={16} />
      </MIconButton>
      <Typography variant="body2" component="span" sx={{ width: 40, textAlign: 'center', display: 'inline-block' }}>
        {value}
      </Typography>
      {/* <TextField
        variant="standard"
        margin="none"
        fullWidth
        autoFocus
        value={value}
        onChange={handleChangeNumber}
        InputProps={{ disableUnderline: true }}
      /> */}
      <MIconButton size="small" color="inherit" disabled={value >= available} onClick={incrementQuantity}>
        <Icon icon={add12Filled} width={16} height={16} />
      </MIconButton>
    </Box>
  );
}

export default Incrementer;
