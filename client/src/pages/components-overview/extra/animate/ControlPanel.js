import PropTypes from 'prop-types';
// material
import { Box, Radio, Paper, Typography, RadioGroup, FormControlLabel } from '@material-ui/core';
// components
import Scrollbar from '../../../../components/Scrollbar';

// ----------------------------------------------------------------------

ControlPanel.propTypes = {
  variantTypes: PropTypes.array.isRequired,
  selectVariant: PropTypes.string.isRequired,
  onChangeVariant: PropTypes.func,
  sx: PropTypes.object
};

export default function ControlPanel({ variantTypes, selectVariant, onChangeVariant, sx }) {
  return (
    <Paper variant="outlined" sx={{ height: 480, ...sx }}>
      <Scrollbar>
        <RadioGroup value={selectVariant} onChange={onChangeVariant} sx={{ px: 1, py: 1 }}>
          {variantTypes.map((variant) => (
            <Box key={variant.type} sx={{ my: 1.5 }}>
              <Typography variant="overline" sx={{ px: 1, mb: 1, display: 'block' }}>
                {variant.type}
              </Typography>
              {variant.values.map((value) => (
                <FormControlLabel
                  key={value}
                  value={value}
                  label={value}
                  control={<Radio sx={{ display: 'none' }} />}
                  sx={{
                    px: 1,
                    py: 0.5,
                    mx: 0,
                    my: 0.25,
                    width: '100%',
                    borderRadius: 0.75,
                    color: 'text.secondary',
                    ...(selectVariant === value && {
                      color: 'warning.contrastText'
                    }),
                    ...(selectVariant === value && { bgcolor: 'warning.main' })
                  }}
                />
              ))}
            </Box>
          ))}
        </RadioGroup>
      </Scrollbar>
    </Paper>
  );
}
