import { Icon } from '@iconify/react';
import listFill from '@iconify/icons-eva/list-fill';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Paper, Stack, Container, AppBar, Typography } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import {
  MegaMenuDesktopVertical,
  MegaMenuDesktopHorizon,
  MegaMenuMobile,
  MenuConfig
} from '../../../components/mega-menu';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function MegaMenu() {
  return (
    <RootStyle title="Mega Menu | Minimal-UI">
      <Box
        sx={{
          pt: 6,
          pb: 1,
          bgcolor: (theme) => (theme.palette.mode === 'light' ? 'grey.200' : 'grey.800')
        }}
      >
        <Container maxWidth="lg">
          <HeaderBreadcrumbs
            heading="Mega Menu"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Mega Menu' }]}
          />
        </Container>
      </Box>

      <AppBar
        position="static"
        color="transparent"
        sx={{
          boxShadow: (theme) => theme.customShadows.z8
        }}
      >
        <Container sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Menu Horizon
          </Typography>
          <MegaMenuDesktopHorizon navConfig={MenuConfig} />
        </Container>
      </AppBar>

      <Container sx={{ mt: 10 }}>
        <MegaMenuMobile navConfig={MenuConfig} />

        <Stack direction="row" spacing={3} mt={5}>
          <Card sx={{ width: 280, flexShrink: 0, overflow: 'unset' }}>
            <Typography variant="h6" sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
              <Box component={Icon} icon={listFill} sx={{ mr: 1, width: 24, height: 24 }} /> Menu Vertical
            </Typography>
            <MegaMenuDesktopVertical navConfig={MenuConfig} />
          </Card>

          <Paper sx={{ minHeight: 480, overflow: 'hidden', borderRadius: 1 }}>
            <Box
              component="img"
              src="/static/mock-images/feeds/feed_8.jpg"
              sx={{ height: '100%', objectFit: 'cover' }}
            />
          </Paper>
        </Stack>
      </Container>
    </RootStyle>
  );
}
