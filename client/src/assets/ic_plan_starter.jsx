// material
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function PlanStarterIcon({ ...other }) {
  const theme = useTheme();
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;
  const PRIMARY_DARKER = theme.palette.primary.darker;

  return (
    <Box {...other}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="80"
        height="80"
        viewBox="0 0 80 80"
      >
        <defs>
          <path id="path-1" d="M0 0H80V80H0z" />
          <path id="path-3" d="M0 0H80V79.85H0z" />
          <path id="path-5" d="M0 0H80V79.85H0z" />
        </defs>
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <mask id="mask-2" fill="#fff">
            <use xlinkHref="#path-1" />
          </mask>
          <g mask="url(#mask-2)">
            <g transform="translate(0 -5)">
              <g transform="translate(0 9.15)">
                <mask id="mask-4" fill="#fff">
                  <use xlinkHref="#path-3" />
                </mask>
                <g mask="url(#mask-4)">
                  <g transform="translate(9.167 19.963)">
                    <path fill={PRIMARY_DARK} d="M53.333 17.467H61.666V24.953H53.333z" />
                    <path
                      fill={PRIMARY_DARKER}
                      d="M.935 20.45L25.963 8.015a5.052 5.052 0 014.52.012L60.74 23.263a1.685 1.685 0 01.015 3.001L35.417 39.361a5.052 5.052 0 01-4.694-.029L.893 23.446a1.685 1.685 0 01.042-2.995z"
                    />
                    <path
                      fill={PRIMARY_DARK}
                      d="M32.5 34.204v4.185a1.133 1.133 0 01-1.566 1.047l-.1-.047v-7.537a2.494 2.494 0 011.666 2.352zM.833 15.932l30 15.92v7.537l-30-15.923v-.02l-.115-.066A1.568 1.568 0 010 22.063V14.14l.833 1.792z"
                    />
                    <path
                      fill={PRIMARY_MAIN}
                      fillRule="nonzero"
                      d="M.935 12.965L25.963.528a5.052 5.052 0 014.52.012L60.74 15.777a1.685 1.685 0 01.015 3.001L35.417 31.875a5.052 5.052 0 01-4.694-.029L.893 15.96a1.685 1.685 0 01.042-2.995z"
                    />
                  </g>
                </g>
              </g>
              <g>
                <mask id="mask-6" fill="#fff">
                  <use xlinkHref="#path-5" />
                </mask>
                <g mask="url(#mask-6)">
                  <g transform="translate(9.167 19.963)">
                    <path fill={PRIMARY_DARK} d="M53.333 17.467H61.666V24.953H53.333z" />
                    <path
                      fill={PRIMARY_DARKER}
                      d="M.935 20.45L25.963 8.015a5.052 5.052 0 014.52.012L60.74 23.263a1.685 1.685 0 01.015 3.001L35.417 39.361a5.052 5.052 0 01-4.694-.029L.893 23.446a1.685 1.685 0 01.042-2.995z"
                    />
                    <path
                      fill={PRIMARY_DARK}
                      d="M32.5 34.204v4.185a1.133 1.133 0 01-1.566 1.047l-.1-.047v-7.537a2.494 2.494 0 011.666 2.352zM.833 15.932l30 15.92v7.537l-30-15.923v-.02l-.115-.066A1.568 1.568 0 010 22.063V14.14l.833 1.792z"
                    />
                    <path
                      fill={PRIMARY_MAIN}
                      fillRule="nonzero"
                      d="M.935 12.965L25.963.528a5.052 5.052 0 014.52.012L60.74 15.777a1.685 1.685 0 01.015 3.001L35.417 31.875a5.052 5.052 0 01-4.694-.029L.893 15.96a1.685 1.685 0 01.042-2.995z"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </svg>
    </Box>
  );
}
