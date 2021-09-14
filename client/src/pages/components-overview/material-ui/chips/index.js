// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Card, Container, CardHeader, CardContent } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../../routes/paths';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//
import ChipFilled from './ChipFilled';
import ChipOutlined from './ChipOutlined';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function ChipsComponent() {
  return (
    <RootStyle title="Components: Chip | Minimal-UI">
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
            heading="Chip"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Chip' }]}
            moreLink="https://next.material-ui.com/components/chips"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Filled" />
              <CardContent>
                <ChipFilled />
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader title="Outlined" />
              <CardContent>
                <ChipOutlined />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
