// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Container } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../../routes/paths';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//
import FormDialogs from './FormDialogs';
import AlertDialog from './AlertDialog';
import ScrollDialog from './ScrollDialog';
import SimpleDialogs from './SimpleDialogs';
import MaxWidthDialog from './MaxWidthDialog';
import FullScreenDialogs from './FullScreenDialogs';
import TransitionsDialogs from './TransitionsDialogs';
//
import { Block } from '../../Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function DialogComponent() {
  return (
    <RootStyle title="Components: Dialog | Minimal-UI">
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
            heading="Dialog"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Dialog' }]}
            moreLink="https://next.material-ui.com/components/dialogs"
          />
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Block title="Simple" sx={style}>
              <SimpleDialogs />
            </Block>
          </Grid>

          <Grid item xs={12} md={4}>
            <Block title="Alerts" sx={style}>
              <AlertDialog />
            </Block>
          </Grid>

          <Grid item xs={12} md={4}>
            <Block title="Transitions" sx={style}>
              <TransitionsDialogs />
            </Block>
          </Grid>

          <Grid item xs={12} md={4}>
            <Block title="Form" sx={style}>
              <FormDialogs />
            </Block>
          </Grid>

          <Grid item xs={12} md={4}>
            <Block title="Full Screen" sx={style}>
              <FullScreenDialogs />
            </Block>
          </Grid>

          <Grid item xs={12} md={4}>
            <Block title="Max Width Dialog" sx={style}>
              <MaxWidthDialog />
            </Block>
          </Grid>

          <Grid item xs={12} md={4}>
            <Block title="Scrolling Content Dialogs" sx={style}>
              <ScrollDialog />
            </Block>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
