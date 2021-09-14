// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Alert, Button, Container, AlertTitle, Stack } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { MButton } from '../../../components/@material-extend';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function AlertsComponent() {
  return (
    <RootStyle title="Components: Alert | Minimal-UI">
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
            heading="Alert"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Alert' }]}
            moreLink="https://next.material-ui.com/components/alert"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Block title="Simple">
            <Stack spacing={2}>
              <Alert severity="error" onClose={() => {}}>
                This is an error alert — check it out!
              </Alert>
              <Alert severity="warning" onClose={() => {}}>
                This is a warning alert — check it out!
              </Alert>
              <Alert severity="info">This is an info alert — check it out!</Alert>
              <Alert severity="success">This is a success alert — check it out!</Alert>
            </Stack>
          </Block>

          <Block title="Filled">
            <Stack spacing={2}>
              <Alert variant="filled" severity="error" onClose={() => {}}>
                This is an error alert — check it out!
              </Alert>
              <Alert variant="filled" severity="warning" onClose={() => {}}>
                This is a warning alert — check it out!
              </Alert>
              <Alert variant="filled" severity="info">
                This is an info alert — check it out!
              </Alert>
              <Alert variant="filled" severity="success">
                This is a success alert — check it out!
              </Alert>
            </Stack>
          </Block>

          <Block title="Outlined">
            <Stack spacing={2}>
              <Alert variant="outlined" severity="error" onClose={() => {}}>
                This is an error alert — check it out!
              </Alert>
              <Alert variant="outlined" severity="warning" onClose={() => {}}>
                This is a warning alert — check it out!
              </Alert>
              <Alert variant="outlined" severity="info">
                This is an info alert — check it out!
              </Alert>
              <Alert variant="outlined" severity="success">
                This is a success alert — check it out!
              </Alert>
            </Stack>
          </Block>

          <Block title="Description">
            <Stack spacing={2}>
              <Alert severity="error" onClose={() => {}}>
                <AlertTitle>Error</AlertTitle>
                This is an error alert — <strong>check it out!</strong>
              </Alert>
              <Alert severity="warning">
                <AlertTitle>Warning</AlertTitle>
                This is a warning alert — <strong>check it out!</strong>
              </Alert>
              <Alert severity="info">
                <AlertTitle>Info</AlertTitle>
                This is an info alert — <strong>check it out!</strong>
              </Alert>
              <Alert severity="success">
                <AlertTitle>Success</AlertTitle>
                This is a success alert — <strong>check it out!</strong>
              </Alert>
            </Stack>
          </Block>

          <Block title="Actions">
            <Stack spacing={2}>
              <Alert
                severity="info"
                action={
                  <MButton color="info" size="small" variant="outlined">
                    Undo
                  </MButton>
                }
              >
                This is an info alert — check it out!
              </Alert>
              <Alert
                severity="info"
                variant="filled"
                action={
                  <Button
                    color="inherit"
                    size="small"
                    variant="outlined"
                    sx={{
                      border: (theme) => `1px solid ${alpha(theme.palette.common.white, 0.48)}`
                    }}
                  >
                    Undo
                  </Button>
                }
              >
                This is an info alert — check it out!
              </Alert>
              <Alert
                severity="info"
                variant="outlined"
                action={
                  <MButton color="info" size="small" variant="outlined">
                    Undo
                  </MButton>
                }
              >
                This is an info alert — check it out!
              </Alert>
            </Stack>
          </Block>
        </Stack>
      </Container>
    </RootStyle>
  );
}
