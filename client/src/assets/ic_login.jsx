// material
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function LoginIcon({ ...other }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;

  return (
    <Box {...other}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="BG" x1="49.662%" x2="52.228%" y1="37.111%" y2="76.847%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <path d="M20.5,15.1a1,1,0,0,0-1.34.45A8,8,0,1,1,12,4a7.93,7.93,0,0,1,7.16,4.45,1,1,0,0,0,1.8-.9,10,10,0,1,0,0,8.9A1,1,0,0,0,20.5,15.1ZM21,11H11.41l2.3-2.29a1,1,0,1,0-1.42-1.42l-4,4a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l4,4a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L11.41,13H21a1,1,0,0,0,0-2Z" />
      </svg>
    </Box>
  );
}
