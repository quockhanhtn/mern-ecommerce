import PropTypes from 'prop-types';
// icons
import add12Filled from '@iconify/icons-fluent/add-12-filled';
import subtract12Filled from '@iconify/icons-fluent/subtract-12-filled';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-fill';
import { Icon } from '@iconify/react';
//
import { useField } from 'formik';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';
// components
import { MIconButton } from './@material-extend';

const IncrementerStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: theme.spacing(0.5),
  padding: theme.spacing(0.5, 0.75),
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`
}));

Incrementer.propTypes = {
  available: PropTypes.number,
  availableText: PropTypes.string,
  quantity: PropTypes.number,
  onIncrease: PropTypes.func,
  onDecrease: PropTypes.func
};

function Incrementer({ available, availableText, quantity, onIncrease, onDecrease }) {
  return (
    <Box sx={{ width: 96, textAlign: 'center', margin: '0 auto' }}>
      <IncrementerStyle>
        <MIconButton size="small" color="inherit" onClick={onDecrease} disabled={quantity <= 1}>
          <Icon icon={minusFill} width={16} height={16} />
        </MIconButton>
        {quantity}
        <MIconButton size="small" color="inherit" onClick={onIncrease} disabled={quantity >= available}>
          <Icon icon={plusFill} width={16} height={16} />
        </MIconButton>
      </IncrementerStyle>
      {availableText && (
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {availableText}
        </Typography>
      )}
    </Box>
  );
}

// ----------------------------------------------------------------------

IncrementerField.propTypes = {
  available: PropTypes.number
};

function IncrementerField(props) {
  const { available } = props;

  // const [field, , helpers] = useField(props);
  // const { value } = field;
  // const { setValue } = helpers;
  const [{ value }, , { setValue }] = useField(props);

  const incrementQuantity = () => {
    if (typeof setValue === 'function') {
      setValue(value + 1);
    }
  };
  const decrementQuantity = () => {
    if (typeof setValue === 'function') {
      setValue(value - 1);
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
      <MIconButton size="small" color="inherit" disabled={value >= available} onClick={incrementQuantity}>
        <Icon icon={add12Filled} width={16} height={16} />
      </MIconButton>
    </Box>
  );
}

export { Incrementer, IncrementerField };
