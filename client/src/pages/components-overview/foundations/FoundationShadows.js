import PropTypes from 'prop-types';
// material
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Stack, Box, Paper, Container, Typography } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' }
};

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

ShadowCard.propTypes = {
  sx: PropTypes.object,
  title: PropTypes.string
};

function ShadowCard({ sx, title }) {
  return (
    <Paper
      sx={{
        padding: 3,
        margin: 1.5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: {
          xs: 'calc((100%/2) - 24px)',
          sm: 'calc((100%/4) - 24px)',
          md: 'calc((100%/6) - 24px)'
        },
        ...sx
      }}
    >
      <Typography variant="subtitle1">{title}</Typography>
    </Paper>
  );
}

export default function FoundationShadows() {
  const theme = useTheme();
  const systemShadows = theme.shadows.slice(1, theme.shadows.length);
  const customShadows = Object.entries(theme.customShadows).slice(0, Object.entries(theme.customShadows).length - 6);

  const colorShadows = ['primary', 'secondary', 'info', 'success', 'warning', 'error'];

  return (
    <RootStyle title="Foundations: Shadows | Minimal-UI">
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
            heading="Shadows"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Shadows' }]}
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Block title="System" sx={style}>
            {systemShadows.map((shadow, index) => (
              <ShadowCard key={shadow} title={`z${index + 1}`} sx={{ boxShadow: shadow }} />
            ))}
          </Block>

          <Block title="Customs" sx={style}>
            {customShadows.map((shadow) => (
              <ShadowCard key={shadow} title={shadow[0]} sx={{ boxShadow: shadow[1] }} />
            ))}
          </Block>

          <Block title="Colors" sx={style}>
            {colorShadows.map((color) => (
              <ShadowCard
                key={color}
                title={color}
                sx={{
                  color: theme.palette[color].contrastText,
                  bgcolor: theme.palette[color].main,
                  boxShadow: theme.customShadows[color]
                }}
              />
            ))}
          </Block>
        </Stack>
      </Container>
    </RootStyle>
  );
}
