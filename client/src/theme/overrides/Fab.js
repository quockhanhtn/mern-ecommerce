// ----------------------------------------------------------------------

export default function Fab(theme) {
  return {
    MuiFab: {
      defaultProps: {
        color: 'primary'
      },

      variants: [
        {
          props: { color: 'primary' },
          style: {
            boxShadow: theme.customShadows.primary,
            '&:hover': {
              backgroundColor: theme.palette.primary.dark
            }
          }
        }
      ],

      styleOverrides: {
        root: {
          boxShadow: theme.customShadows.z8,
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: theme.palette.grey[400]
          }
        },
        primary: {},
        extended: {
          '& svg': {
            marginRight: theme.spacing(1)
          }
        }
      }
    }
  };
}
