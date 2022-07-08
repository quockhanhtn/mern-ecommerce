// material
import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

export default function CheckIcon({ ...other }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;

  return (
    <Box {...other}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
        <g transform="translate(0 -1028.362)">
          <circle cx="12" cy="1040.362" r="12" fill={PRIMARY_LIGHT} />
          <path
            style={{
              lineHeight: 'normal',
              WebkitTextIndent: '0',
              textIndent: '0',
              WebkitTextAlign: 'start',
              textAlign: 'start',
              WebkitTextDecorationLine: 'none',
              textDecorationLine: 'none',
              WebkitTextTransform: 'none',
              textTransform: 'none',
              blockProgression: 'tb'
            }}
            fill={PRIMARY_MAIN}
            d="M14.525 1052.079a12 12 0 00.686-.154 12 12 0 001.137-.38 12 12 0 001.095-.488 12 12 0 001.041-.597 12 12 0 00.975-.698 12 12 0 00.902-.793 12 12 0 00.817-.877 12 12 0 00.726-.955 12 12 0 00.627-1.021 12 12 0 00.522-1.08 12 12 0 00.412-1.127 12 12 0 00.26-1.016l-7.13-7.129a6.473 6.473 0 00-4.593-1.906 6.482 6.482 0 00-4.598 1.906 6.494 6.494 0 000 9.194l7.121 7.12z"
            color="#000"
            fontFamily="sans-serif"
            fontWeight="400"
          />
          <path
            style={{
              lineHeight: 'normal',
              WebkitTextIndent: '0',
              textIndent: '0',
              WebkitTextAlign: 'start',
              textAlign: 'start',
              WebkitTextDecorationLine: 'none',
              textDecorationLine: 'none',
              WebkitTextTransform: 'none',
              textTransform: 'none',
              blockProgression: 'tb'
            }}
            fill="#fff"
            d="M12.001 1033.859c1.662 0 3.324.635 4.596 1.906a6.494 6.494 0 010 9.194 6.494 6.494 0 01-9.194 0 6.494 6.494 0 010-9.194 6.482 6.482 0 014.598-1.906zm2.96 4.502a.503.503 0 00-.26.103l-3.654 2.74-1.693-1.692c-.367-.382-1.09.34-.707.707l2 2a.517.517 0 00.653.047l4-3c.336-.245.129-.898-.287-.904a.5.5 0 00-.051 0z"
            color="#000"
            fontFamily="sans-serif"
            fontWeight="400"
            overflow="visible"
          />
        </g>
      </svg>
    </Box>
  );
}
