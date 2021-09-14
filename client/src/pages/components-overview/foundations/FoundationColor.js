import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import copyFill from '@iconify/icons-eva/copy-fill';
import { CopyToClipboard } from 'react-copy-to-clipboard';
// material
import { useTheme, hexToRgb, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Tooltip, Container, Typography, IconButton } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

// ----------------------------------------------------------------------

const COLORS = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];
const COLORS_VARIATIONS = ['lighter', 'light', 'main', 'dark', 'darker'];
const GREY_VARIATIONS = ['100', '200', '300', '400', '500', '600', '700', '800', '900'];

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

const RowStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  margin: theme.spacing(1.5, -1.5, 0)
}));

// ----------------------------------------------------------------------

ColorCard.propTypes = {
  hexColor: PropTypes.string,
  variation: PropTypes.string,
  onCopy: PropTypes.func
};

function ColorCard({ hexColor, variation, onCopy }) {
  const theme = useTheme();

  return (
    <Card
      sx={{
        position: 'relative',
        m: 1.5,
        width: {
          xs: '100%',
          sm: 'calc((100%/2) - 24px)',
          md: 'calc((100%/4) - 24px)',
          lg: 'calc((100%/5) - 24px)'
        }
      }}
    >
      <CopyToClipboard text={hexColor} onCopy={onCopy}>
        <Tooltip title="Copy">
          <IconButton
            sx={{
              top: 8,
              right: 8,
              position: 'absolute',
              color: theme.palette.getContrastText(hexColor)
            }}
          >
            <Icon icon={copyFill} width={20} height={20} />
          </IconButton>
        </Tooltip>
      </CopyToClipboard>

      <Box sx={{ bgcolor: hexColor, paddingTop: '56%' }} />

      <Box sx={{ p: 2.5 }}>
        <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
          {variation}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1.5, mb: 1 }}>
          <Typography variant="overline" sx={{ width: 56, color: 'text.secondary' }}>
            Hex
          </Typography>
          <Typography variant="body2">{hexColor}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="overline" sx={{ width: 56, color: 'text.secondary' }}>
            Rgb
          </Typography>
          <Typography variant="body2">{hexToRgb(hexColor).replace('rgb(', '').replace(')', '')}</Typography>
        </Box>
      </Box>
    </Card>
  );
}

export default function FoundationColors() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const [, setState] = useState(null);

  const onCopy = (color) => {
    setState(color);
    if (color) {
      enqueueSnackbar(`Copied ${color}`, { variant: 'success' });
    }
  };

  return (
    <RootStyle title="Foundations: Color | Minimal-UI">
      <Box
        sx={{
          pt: 6,
          pb: 1,
          mb: 10,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800')
        }}
      >
        <Container maxWidth="lg">
          <HeaderBreadcrumbs
            heading="Color"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Color' }]}
            moreLink={['https://next.material-ui.com/customization/color', 'https://colors.eva.design']}
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        {COLORS.map((color) => (
          <Box key={color} sx={{ mb: 5 }}>
            <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
              {color}
            </Typography>

            <RowStyle>
              {COLORS_VARIATIONS.map((variation) => (
                <ColorCard
                  key={variation}
                  variation={variation}
                  hexColor={theme.palette[color][variation]}
                  onCopy={() => onCopy(theme.palette[color][variation])}
                />
              ))}
            </RowStyle>
          </Box>
        ))}

        <Typography variant="h5" sx={{ textTransform: 'capitalize' }}>
          Grey
        </Typography>
        <RowStyle>
          {GREY_VARIATIONS.map((variation) => (
            <ColorCard
              key={variation}
              variation={variation}
              hexColor={theme.palette.grey[variation]}
              onCopy={() => onCopy(theme.palette.grey[variation])}
            />
          ))}
        </RowStyle>
      </Container>
    </RootStyle>
  );
}
