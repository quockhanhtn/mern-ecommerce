// material
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function UserIcon({ ...other }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;

  return (
    <Box {...other}>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <defs>
          <linearGradient id="BG" x1="49.662%" x2="52.228%" y1="37.111%" y2="76.847%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
        </defs>
        <path
          fill="url(#BG)"
          d="M31.64,27.72a13.94,13.94,0,0,1-15.28,0A18,18,0,0,0,6.05,42.94a1,1,0,0,0,.27.75,1,1,0,0,0,.73.31H41a1,1,0,0,0,.73-.31,1,1,0,0,0,.27-.75A18,18,0,0,0,31.64,27.72Z"
        />
        <circle cx={24} cy={16} r={12} fill={PRIMARY_MAIN} />
      </svg>
    </Box>
  );
}
