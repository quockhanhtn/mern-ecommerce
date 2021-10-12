import { Icon } from '@iconify/react';
import closeCircleFill from '@iconify/icons-eva/close-circle-fill';

// ----------------------------------------------------------------------

export default function Chip(theme) {
  return {
    MuiChip: {
      defaultProps: {
        deleteIcon: <Icon icon={closeCircleFill} />
      },

      styleOverrides: {
        colorDefault: {
          '& .MuiChip-avatarMedium, .MuiChip-avatarSmall': {
            color: theme.palette.text.secondary
          }
        },
        outlined: {
          borderColor: theme.palette.grey[500_32],
          '&.MuiChip-colorPrimary': {
            borderColor: theme.palette.primary.main
          },
          '&.MuiChip-colorSecondary': {
            borderColor: theme.palette.secondary.main
          }
        }
      }
    }
  };
}
