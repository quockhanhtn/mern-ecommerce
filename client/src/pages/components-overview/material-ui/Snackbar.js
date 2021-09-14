import { useSnackbar } from 'notistack';
import closeFill from '@iconify/icons-eva/close-fill';
import { Icon } from '@iconify/react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Button, Container, Typography, IconButton } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import { MButton } from '../../../components/@material-extend';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { mx: '8px !important' }
};

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function SnackbarComponent() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const onSnackbarClose = (color) => {
    enqueueSnackbar(
      <div>
        <Typography variant="subtitle2" sx={{ textTransform: 'capitalize' }}>
          {color}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          This is an {color}
        </Typography>
      </div>,
      {
        variant: color,
        action: (key) => (
          <IconButton size="small" color="inherit" onClick={() => closeSnackbar(key)}>
            <Icon icon={closeFill} width={24} height={24} />
          </IconButton>
        )
      }
    );
  };

  const onSnackbarAction = (color, anchor) => {
    enqueueSnackbar(`This is an ${color}`, {
      variant: color,
      anchorOrigin: anchor,
      action: (key) => (
        <>
          <Button
            size="small"
            color={color !== 'default' ? color : 'primary'}
            onClick={() => {
              alert(`I belong to snackbar with key ${key}`);
            }}
          >
            Alert
          </Button>
          <Button size="small" color="inherit" onClick={() => closeSnackbar(key)}>
            Dismiss
          </Button>
        </>
      )
    });
  };

  return (
    <RootStyle title="Components: Snackbar | Minimal-UI">
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
            heading="Snackbar"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Snackbar' }]}
            moreLink={['https://next.material-ui.com/components/snackbars', 'https://www.iamhosseindhv.com/notistack']}
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Block title="Simple" sx={style}>
              <Button variant="contained" color="inherit" onClick={() => enqueueSnackbar('This is an default')}>
                Default
              </Button>
              <MButton
                variant="contained"
                color="info"
                onClick={() => enqueueSnackbar('This is an info', { variant: 'info' })}
              >
                Info
              </MButton>
              <MButton
                variant="contained"
                color="success"
                onClick={() =>
                  enqueueSnackbar('This is an success', {
                    variant: 'success'
                  })
                }
              >
                Success
              </MButton>
              <MButton
                variant="contained"
                color="warning"
                onClick={() =>
                  enqueueSnackbar('This is an warning', {
                    variant: 'warning'
                  })
                }
              >
                Warning
              </MButton>
              <MButton
                variant="contained"
                color="error"
                onClick={() => enqueueSnackbar('This is an error', { variant: 'error' })}
              >
                Error
              </MButton>
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="With Close" sx={style}>
              <Button variant="contained" color="inherit" onClick={() => onSnackbarClose('default')}>
                Default
              </Button>
              <MButton variant="contained" color="info" onClick={() => onSnackbarClose('info')}>
                Info
              </MButton>
              <MButton variant="contained" color="success" onClick={() => onSnackbarClose('success')}>
                Success
              </MButton>
              <MButton variant="contained" color="warning" onClick={() => onSnackbarClose('warning')}>
                Warning
              </MButton>
              <MButton variant="contained" color="error" onClick={() => onSnackbarClose('error')}>
                Error
              </MButton>
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="With Action" sx={style}>
              <Button variant="contained" color="inherit" onClick={() => onSnackbarAction('default')}>
                Default
              </Button>
              <MButton variant="contained" color="info" onClick={() => onSnackbarAction('info')}>
                Info
              </MButton>
              <MButton variant="contained" color="success" onClick={() => onSnackbarAction('success')}>
                Success
              </MButton>
              <MButton variant="contained" color="warning" onClick={() => onSnackbarAction('warning')}>
                Warning
              </MButton>
              <MButton variant="contained" color="error" onClick={() => onSnackbarAction('error')}>
                Error
              </MButton>
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="anchorOrigin" sx={style}>
              <Button
                variant="text"
                color="inherit"
                onClick={() =>
                  onSnackbarAction('default', {
                    vertical: 'top',
                    horizontal: 'left'
                  })
                }
              >
                Top Left
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={() =>
                  onSnackbarAction('default', {
                    vertical: 'top',
                    horizontal: 'center'
                  })
                }
              >
                Top Center
              </Button>
              <Button variant="text" color="inherit" onClick={() => onSnackbarAction('default')}>
                Top Right
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={() =>
                  onSnackbarAction('default', {
                    vertical: 'bottom',
                    horizontal: 'left'
                  })
                }
              >
                Bottom Left
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={() =>
                  onSnackbarAction('default', {
                    vertical: 'bottom',
                    horizontal: 'center'
                  })
                }
              >
                Bottom Center
              </Button>
              <Button
                variant="text"
                color="inherit"
                onClick={() =>
                  onSnackbarAction('default', {
                    vertical: 'bottom',
                    horizontal: 'right'
                  })
                }
              >
                Bottom Right
              </Button>
            </Block>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
