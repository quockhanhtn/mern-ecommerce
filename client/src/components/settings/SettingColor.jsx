import { alpha } from '@material-ui/core/styles';
import { Box, Grid, Paper, Radio, RadioGroup, CardActionArea, FormControlLabel } from '@material-ui/core';
// hooks
import useSettings from '../../hooks/useSettings';

// ----------------------------------------------------------------------

export default function SettingColor() {
  const { themeColor, onChangeColor, colorOption } = useSettings();

  return (
    <RadioGroup name="themeColor" value={themeColor} onChange={onChangeColor}>
      <Grid container spacing={1.5} dir="ltr">
        {colorOption.map((color) => {
          const colorName = color.name;
          const colorValue = color.value;
          const isSelected = themeColor === colorName;

          return (
            <Grid item xs={4} key={colorName}>
              <Paper
                variant={isSelected ? 'elevation' : 'outlined'}
                sx={{
                  ...(isSelected && {
                    bgcolor: alpha(colorValue, 0.12),
                    border: `solid 2px ${colorValue}`,
                    boxShadow: `inset 0 4px 8px 0 ${alpha(colorValue, 0.24)}`
                  })
                }}
              >
                <CardActionArea sx={{ borderRadius: 1, color: colorValue }}>
                  <Box
                    sx={{
                      height: 48,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    <Box
                      sx={{
                        width: 24,
                        height: 14,
                        borderRadius: '50%',
                        bgcolor: colorValue,
                        transform: 'rotate(-45deg)',
                        transition: (theme) =>
                          theme.transitions.create('all', {
                            easing: theme.transitions.easing.easeInOut,
                            duration: theme.transitions.duration.shorter
                          }),
                        ...(isSelected && { transform: 'none' })
                      }}
                    />
                  </Box>

                  <FormControlLabel
                    label=""
                    value={colorName}
                    control={<Radio sx={{ display: 'none' }} />}
                    sx={{
                      top: 0,
                      margin: 0,
                      width: '100%',
                      height: '100%',
                      position: 'absolute'
                    }}
                  />
                </CardActionArea>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </RadioGroup>
  );
}
