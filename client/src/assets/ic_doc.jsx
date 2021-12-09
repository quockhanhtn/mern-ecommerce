// material
import { useTheme } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function DocIcon({ ...other }) {
  const theme = useTheme();
  const PRIMARY_LIGHTER = theme.palette.primary.lighter;
  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;

  return (
    <Box {...other}>
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24">
        <defs>
          <linearGradient id="linearGradient-1" x1="50%" x2="50%" y1="0%" y2="105.236%">
            <stop offset="0%" />
            <stop offset="100%" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="linearGradient-2" x1="0%" x2="100%" y1=".736%" y2="99.264%">
            <stop offset="0%" stopColor={PRIMARY_LIGHT} />
            <stop offset="100%" stopColor={PRIMARY_MAIN} />
          </linearGradient>
          <linearGradient id="linearGradient-3" x1="50%" x2="50%" y1="105.236%" y2="0%">
            <stop offset="0%" />
            <stop offset="100%" stopOpacity="0" />
          </linearGradient>
        </defs>
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <path
            fill={PRIMARY_MAIN}
            fillRule="nonzero"
            d="M3.008 1.5v21c0 .825.675 1.5 1.5 1.5h14.584c.825 0 1.5-.675 1.5-1.5V5.524c0-.46-.183-.902-.509-1.227L16.295.509A1.737 1.737 0 0015.068 0H4.508c-.825 0-1.5.675-1.5 1.5z"
          />
          <path
            fill={PRIMARY_LIGHTER}
            fillRule="nonzero"
            d="M11.74 18.653c.173 0 .313.14.313.313v1.294c0 .173-.14.313-.313.313H6.886a.313.313 0 01-.314-.313v-1.294c0-.173.14-.313.314-.313zm4.855-2.999c.239 0 .433.194.433.433v1.055a.433.433 0 01-.433.433h-9.59a.433.433 0 01-.433-.433v-1.055c0-.239.194-.433.433-.433zm0-2.998c.239 0 .433.194.433.433v1.055a.433.433 0 01-.433.433h-9.59a.433.433 0 01-.433-.433v-1.055c0-.24.194-.433.433-.433zm0-2.998c.239 0 .433.193.433.432v1.056a.433.433 0 01-.433.432h-9.59a.433.433 0 01-.433-.432V10.09c0-.239.194-.432.433-.432z"
          />
          <path
            fill="url(#linearGradient-1)"
            fillRule="nonzero"
            d="M16.295.509c-.223-.223-.5-.38-.8-.456v4.89l5.097 5.099V5.524c0-.46-.183-.902-.509-1.228L16.295.51z"
            opacity="0.48"
          />
          <path
            fill="url(#linearGradient-2)"
            d="M20.54 5.103l.016.07H15.96a.59.59 0 01-.59-.589V.027c.036.007.074.014.113.023.343.076.655.252.903.5l3.654 3.654c.248.247.421.559.5.9z"
          />
          <path
            fill="url(#linearGradient-3)"
            fillRule="nonzero"
            d="M20.584 20v1.97c0 1.116-.675 2.03-1.5 2.03H4.5c-.825 0-1.5-.914-1.5-2.03V20h17.584z"
            opacity="0.48"
          />
        </g>
      </svg>
    </Box>
  );
}
