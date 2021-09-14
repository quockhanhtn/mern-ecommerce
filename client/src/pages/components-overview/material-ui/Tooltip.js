// material
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Fab, Zoom, Grid, Fade, Button, Tooltip, Container, IconButton } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { MFab, MButton, MIconButton } from '../../../components/@material-extend';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const LONG_TEXT = `
Aliquam eget finibus ante, non facilisis lectus. Sed vitae dignissim est, vel aliquam tellus.
Praesent non nunc mollis, fermentum neque at, semper arcu.
Nullam eget est sed sem iaculis gravida eget vitae justo.
`;

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { m: '8px !important' }
};
// ----------------------------------------------------------------------

export default function TooltipsComponent() {
  return (
    <RootStyle title="Components: Tooltip | Minimal-UI">
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
            heading="Tooltip"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Tooltip' }]}
            moreLink="https://next.material-ui.com/components/tooltips"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Block title="Simple" sx={style}>
              <Tooltip title="Delete">
                <IconButton>
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Add">
                <Fab>
                  <AddIcon />
                </Fab>
              </Tooltip>
              <Tooltip title="Delete">
                <MIconButton color="info">
                  <DeleteIcon />
                </MIconButton>
              </Tooltip>
              <Tooltip title="Add">
                <MFab color="info">
                  <AddIcon />
                </MFab>
              </Tooltip>
              <Tooltip title="Add">
                <MButton variant="outlined" color="info">
                  Button
                </MButton>
              </Tooltip>
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="Arrow" sx={style}>
              <Tooltip title="Add" arrow>
                <Fab>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="Variable Width" sx={style}>
              <Tooltip title={LONG_TEXT}>
                <Button color="inherit">Default Width [300px]</Button>
              </Tooltip>
              <Tooltip title={LONG_TEXT} sx={{ maxWidth: 500 }}>
                <Button color="inherit">Custom Width [500px]</Button>
              </Tooltip>
              <Tooltip title={LONG_TEXT} sx={{ maxWidth: 'none' }}>
                <Button color="inherit">No wrapping</Button>
              </Tooltip>
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="Transitions" sx={style}>
              <Tooltip title="Add">
                <Button color="inherit">Grow</Button>
              </Tooltip>
              <Tooltip TransitionComponent={Fade} TransitionProps={{ timeout: 600 }} title="Add">
                <Button color="inherit">Fade</Button>
              </Tooltip>
              <Tooltip TransitionComponent={Zoom} title="Add">
                <Button color="inherit">Zoom</Button>
              </Tooltip>
            </Block>
          </Grid>

          <Grid item xs={12}>
            <Block title="Positioned" sx={style}>
              <Box sx={{ maxWidth: 560, margin: 'auto' }}>
                <Grid container>
                  <Grid item>
                    <Tooltip title="Add" placement="top-start">
                      <Button color="inherit">top-start</Button>
                    </Tooltip>
                    <Tooltip title="Add" placement="top">
                      <Button color="inherit">top</Button>
                    </Tooltip>
                    <Tooltip title="Add" placement="top-end">
                      <Button color="inherit">top-end</Button>
                    </Tooltip>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item xs={6}>
                    <Tooltip title="Add" placement="left-start">
                      <Button color="inherit">left-start</Button>
                    </Tooltip>
                    <br />
                    <Tooltip title="Add" placement="left">
                      <Button color="inherit">left</Button>
                    </Tooltip>
                    <br />
                    <Tooltip title="Add" placement="left-end">
                      <Button color="inherit">left-end</Button>
                    </Tooltip>
                  </Grid>
                  <Grid item container xs={6} alignItems="flex-end" direction="column">
                    <Grid item>
                      <Tooltip title="Add" placement="right-start">
                        <Button color="inherit">right-start</Button>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Add" placement="right">
                        <Button color="inherit">right</Button>
                      </Tooltip>
                    </Grid>
                    <Grid item>
                      <Tooltip title="Add" placement="right-end">
                        <Button color="inherit">right-end</Button>
                      </Tooltip>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid container>
                  <Grid item>
                    <Tooltip title="Add" placement="bottom-start">
                      <Button color="inherit">bottom-start</Button>
                    </Tooltip>
                    <Tooltip title="Add" placement="bottom">
                      <Button color="inherit">bottom</Button>
                    </Tooltip>
                    <Tooltip title="Add" placement="bottom-end">
                      <Button color="inherit">bottom-end</Button>
                    </Tooltip>
                  </Grid>
                </Grid>
              </Box>
            </Block>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
