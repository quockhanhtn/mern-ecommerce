// material
import HomeIcon from '@material-ui/icons/Home';
import GrainIcon from '@material-ui/icons/Grain';
import WhatshotIcon from '@material-ui/icons/Whatshot';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Link, Grid, Container, Typography, Breadcrumbs } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { MBreadcrumbs } from '../../../components/@material-extend';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function BreadcrumbComponent() {
  return (
    <RootStyle title="Components: Breadcrumbs | Minimal-UI">
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
            heading="Breadcrumbs"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Breadcrumbs' }]}
            moreLink="https://next.material-ui.com/components/breadcrumbs"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Block title="Text" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Breadcrumbs>
                <Link color="inherit" href="#">
                  Material-UI
                </Link>
                <Link color="inherit" href="#">
                  Core
                </Link>
                <Typography sx={{ color: 'text.primary' }}>Breadcrumb</Typography>
              </Breadcrumbs>
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block title="With Icon" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Breadcrumbs>
                <Link color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
                  <HomeIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                  Material-UI
                </Link>
                <Link color="inherit" href="#" sx={{ display: 'flex', alignItems: 'center' }}>
                  <WhatshotIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                  Core
                </Link>
                <Typography
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    color: 'text.primary'
                  }}
                >
                  <GrainIcon sx={{ mr: 0.5, width: 20, height: 20 }} />
                  Breadcrumb
                </Typography>
              </Breadcrumbs>
            </Block>
          </Grid>

          <Grid item xs={12}>
            <Block title="Customized" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <MBreadcrumbs
                links={[
                  { name: 'Home', href: '#', icon: <HomeIcon /> },
                  { name: 'Link1', href: '#', icon: <WhatshotIcon /> },
                  { name: 'Link2', href: '#', icon: <WhatshotIcon /> },
                  { name: 'Link3', href: '#', icon: <WhatshotIcon /> },
                  { name: 'Link4', href: '#', icon: <WhatshotIcon /> },
                  { name: 'Link5', href: '#', icon: <WhatshotIcon /> }
                ]}
              />
            </Block>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
