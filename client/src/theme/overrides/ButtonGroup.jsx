import { alpha } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

export default function ButtonGroup(theme) {
  return {
    MuiButtonGroup: {
      variants: [
        {
          props: { variant: 'contained', color: 'inherit' },
          style: { boxShadow: theme.customShadows.z8 }
        },
        {
          props: { variant: 'contained', color: 'primary' },
          style: { boxShadow: theme.customShadows.primary }
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: { boxShadow: theme.customShadows.secondary }
        },
        {
          props: { disabled: true },
          style: {
            boxShadow: 'none !important',
            '& .MuiButtonGroup-grouped.Mui-disabled': {
              color: `${theme.palette.action.disabled} !important`,
              borderColor: `${theme.palette.action.disabledBackground} !important`,
              '&.MuiButton-contained': {
                backgroundColor: theme.palette.action.disabledBackground
              }
            }
          }
        }
      ],

      styleOverrides: {
        root: {
          '&:hover': {
            boxShadow: 'none'
          }
        },
        grouped: {
          borderColor: `${theme.palette.grey[500_32]} !important`
        },
        groupedContained: {
          color: theme.palette.grey[800]
        },
        groupedContainedPrimary: {
          color: theme.palette.primary.contrastText,
          borderColor: `${theme.palette.primary.dark} !important`
        },
        groupedOutlinedPrimary: {
          borderColor: `${alpha(theme.palette.primary.main, 0.48)} !important`
        },
        groupedTextPrimary: {
          borderColor: `${theme.palette.primary.main} !important`
        },
        groupedContainedSecondary: {
          color: theme.palette.secondary.contrastText,
          borderColor: `${theme.palette.secondary.dark} !important`
        },
        groupedOutlinedSecondary: {
          borderColor: `${alpha(theme.palette.secondary.main, 0.48)} !important`
        },
        groupedTextSecondary: {
          borderColor: `${theme.palette.secondary.main} !important`
        }
      }
    }
  };
}
