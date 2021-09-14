// material
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Container, Grid, Typography, useMediaQuery } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { Block } from '../Block';

// ----------------------------------------------------------------------

const TYPOGRAPHYS = [
  { name: 'h1. Heading', variant: 'h1' },
  { name: 'h2. Heading', variant: 'h2' },
  { name: 'h3. Heading', variant: 'h3' },
  { name: 'h4. Heading', variant: 'h4' },
  { name: 'h5. Heading', variant: 'h5' },
  { name: 'h6. Heading', variant: 'h6' },
  {
    name: 'subtitle1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
    variant: 'subtitle1'
  },
  {
    name: 'subtitle2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur',
    variant: 'subtitle2'
  },
  {
    name: 'body1. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.',
    variant: 'body1'
  },
  {
    name: 'body2. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos blanditiis tenetur unde suscipit, quam beatae rerum inventore consectetur, neque doloribus, cupiditate numquam dignissimos laborum fugiat deleniti? Eum quasi quidem quibusdam.',
    variant: 'body2'
  },
  { name: 'caption text', variant: 'caption' },
  { name: 'overline text', variant: 'overline' },
  { name: 'Button', variant: 'button' }
];

const style = {
  minHeight: 'auto',
  marginBottom: 3
};

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

const RowContentStyle = styled('div')({
  width: '100%',
  maxWidth: 720
});

// ----------------------------------------------------------------------

function remToPx(value) {
  return Math.round(parseFloat(value) * 16);
}

function useWidth() {
  const theme = useTheme();
  const keys = [...theme.breakpoints.keys].reverse();
  return (
    keys.reduce((output, key) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const matches = useMediaQuery(theme.breakpoints.up(key));
      return !output && matches ? key : output;
    }, null) || 'xs'
  );
}

function GetFontInfo({ name }) {
  const theme = useTheme();
  const breakpoints = useWidth();
  const key = theme.breakpoints.up(breakpoints === 'xl' ? 'lg' : breakpoints);

  const getFont = theme.typography[name][key] ? theme.typography[name][key] : theme.typography[name];
  const fontSize = remToPx(getFont.fontSize);
  const lineHeight = theme.typography[name].lineHeight * fontSize;
  const { fontWeight } = theme.typography[name];
  const letterSpacing = theme.typography[name].letterSpacing !== undefined ? theme.typography[name].letterSpacing : '';

  return `size: ${fontSize} / l-height: ${lineHeight} / weight: ${fontWeight} ${
    letterSpacing && `/ spacing: ${letterSpacing}`
  }`;
}

export default function FoundationTypography() {
  return (
    <RootStyle title="Foundations: Typography | Minimal-UI">
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
            heading="Typography"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Typography' }]}
            moreLink="https://next.material-ui.com/components/typography"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" paragraph>
              Default Text
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            {TYPOGRAPHYS.map((font) => (
              <Block key={font.variant} sx={style}>
                <RowContentStyle>
                  <Typography variant={font.variant} gutterBottom>
                    {font.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {GetFontInfo({ name: font.variant })}
                  </Typography>
                </RowContentStyle>
              </Block>
            ))}
          </Grid>
        </Grid>

        <Box sx={{ height: 40 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            <Typography variant="h6" paragraph>
              Colors Text
            </Typography>
          </Grid>
          <Grid item xs={12} md={9}>
            <Block sx={style}>
              <RowContentStyle>
                <Typography variant="subtitle1" gutterBottom>
                  Text primary
                </Typography>
                <Typography variant="body2">
                  Cras ultricies mi eu turpis hendrerit fringilla. Fusce vel dui. Pellentesque auctor neque nec urna.
                  Sed cursus turpis vitae tortor. Curabitur suscipit suscipit tellus.
                </Typography>
              </RowContentStyle>
            </Block>

            <Block sx={style}>
              <RowContentStyle>
                <Typography gutterBottom variant="subtitle1" sx={{ color: 'text.secondary' }}>
                  Text secondary
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Cras ultricies mi eu turpis hendrerit fringilla. Fusce vel dui. Pellentesque auctor neque nec urna.
                  Sed cursus turpis vitae tortor. Curabitur suscipit suscipit tellus.
                </Typography>
              </RowContentStyle>
            </Block>

            <Block sx={style}>
              <RowContentStyle>
                <Typography gutterBottom variant="subtitle1" sx={{ color: 'text.disabled' }}>
                  disabled
                </Typography>
                <Typography gutterBottom variant="body2" sx={{ color: 'text.disabled' }}>
                  Cras ultricies mi eu turpis hendrerit fringilla. Fusce vel dui. Pellentesque auctor neque nec urna.
                  Sed cursus turpis vitae tortor. Curabitur suscipit suscipit tellus.
                </Typography>
              </RowContentStyle>
            </Block>

            {['primary', 'secondary', 'info', 'warning', 'error'].map((color) => (
              <Block key={color} sx={style}>
                <RowContentStyle>
                  <Typography gutterBottom variant="subtitle1" sx={{ color: `${color}.main` }}>
                    {color}
                  </Typography>
                  <Typography gutterBottom variant="body2" sx={{ color: `${color}.main` }}>
                    Cras ultricies mi eu turpis hendrerit fringilla. Fusce vel dui. Pellentesque auctor neque nec urna.
                    Sed cursus turpis vitae tortor. Curabitur suscipit suscipit tellus.
                  </Typography>
                </RowContentStyle>
              </Block>
            ))}
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
