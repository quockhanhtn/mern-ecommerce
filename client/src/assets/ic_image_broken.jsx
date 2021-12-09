// material
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function ImageBrokenIcon({ ...other }) {
  const theme = useTheme();
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_LIGHTER = theme.palette.primary.lighter;

  return (
    <Box {...other}>
      <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 12 12">
        <style>
          {`.st0{fill:none;stroke:${PRIMARY_LIGHTER};stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:2}`}
        </style>
        <path className="st0" d="M1 3c0-1.1.9-2 2-2h6c1.1 0 2 .9 2 2v6c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3z" />
        <path
          className="st0"
          d="M7.3 6.3L3 11h6.1c1.1 0 1.9-.9 1.9-1.9V9c0-.2-.1-.3-.2-.5l-2-2.2c-.4-.4-1.1-.4-1.5 0z"
        />
        <path
          d="M2.9 4.1c.1 0 .2-.1.2-.2s-.1-.2-.2-.2l-.3-.1c-.1 0-.2 0-.3.1 0 .1 0 .2.1.3l.5.1zM3.7 3c0 .1.1.2.2.1H4s.1-.1.1-.2L4 2.5c0-.1-.1-.2-.2-.1-.1 0-.2.1-.1.2V3zm.9 2c0-.1-.2-.1-.2 0l-.8.7c-.1.1-.4.1-.6 0-.1-.2-.1-.5 0-.6l.7-.7c.1-.1.1-.2 0-.3s-.1-.1-.2 0l-.8.7c-.3.3-.3.8 0 1.2s.9.3 1.2 0l.7-.7c.1-.1.1-.2 0-.3zM3 3.3l.1.1c.1 0 .1 0 .1-.1.1-.1.1-.2 0-.3L3 2.7c-.1-.1-.2-.1-.3 0V3l.3.3zm3.2 1.4h-.4c-.1 0-.2 0-.3.1 0 .1 0 .2.1.3l.4.1h.1c.1 0 .2-.1.2-.2.1-.1 0-.3-.1-.3zM5 5.8c0-.1-.1-.2-.2-.1-.1 0-.2.1-.1.2l.1.4c0 .1.1.2.2.1h.1c.1 0 .2-.1.1-.2L5 5.8zm.7-.3c-.1-.1-.2-.1-.3 0-.1.1-.1.2 0 .3l.3.2c.1.1.2.1.3 0v-.3l-.3-.2zm.5-2.1c0-.5-.4-.8-.8-.8-.2 0-.4.1-.6.2l-.7.7c-.1.1-.1.2 0 .3.1.1.2.1.3 0L5 3c.2-.2.4-.2.6 0 .2.2.2.4 0 .6l-.7.8c-.1.1-.1.2 0 .3.1.1.2.1.3 0l.7-.7c.2-.2.3-.4.3-.6z"
          fill={PRIMARY_LIGHT}
        />
      </svg>
    </Box>
  );
}
