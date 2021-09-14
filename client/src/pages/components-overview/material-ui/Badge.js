// material
import MailIcon from '@material-ui/icons/Mail';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Container, Typography } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import { MBadge } from '../../../components/@material-extend';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function BadgeComponent() {
  return (
    <RootStyle title="Components: Badge | Minimal-UI">
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
            heading="Badge"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Badge' }]}
            moreLink="https://next.material-ui.com/components/badges"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Block
              title="Basic"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& > *': { mx: 1 } }}
            >
              <MBadge badgeContent={4}>
                <MailIcon />
              </MBadge>
              <MBadge badgeContent={4} color="primary">
                <MailIcon />
              </MBadge>
              <MBadge badgeContent={4} color="secondary">
                <MailIcon />
              </MBadge>
              <MBadge badgeContent={4} color="info">
                <MailIcon />
              </MBadge>
              <MBadge badgeContent={4} color="success">
                <MailIcon />
              </MBadge>
              <MBadge badgeContent={4} color="warning">
                <MailIcon />
              </MBadge>
              <MBadge badgeContent={4} color="error">
                <MailIcon />
              </MBadge>
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block
              title="Maximum value"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& > *': { mx: 1 } }}
            >
              <MBadge badgeContent={99} color="error" children={<MailIcon />} />
              <MBadge badgeContent={100} color="error" children={<MailIcon />} />
              <MBadge badgeContent={1000} max={999} color="error" children={<MailIcon />} />
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block
              title="Dot badge"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& > *': { mx: 1 } }}
            >
              <MBadge color="info" variant="dot">
                <MailIcon />
              </MBadge>
              <MBadge color="info" variant="dot">
                <Typography>Typography</Typography>
              </MBadge>
            </Block>
          </Grid>

          <Grid item xs={12} md={6}>
            <Block
              title="Badge overlap"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& > *': { mx: 1 } }}
            >
              <MBadge color="info" badgeContent=" ">
                <Box sx={{ width: 40, height: 40, bgcolor: 'warning.main' }} />
              </MBadge>
              <MBadge color="info" badgeContent=" " variant="dot">
                <Box sx={{ width: 40, height: 40, bgcolor: 'warning.main' }} />
              </MBadge>
              <MBadge color="info" overlap="circular" badgeContent=" ">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'warning.main'
                  }}
                />
              </MBadge>
              <MBadge color="info" overlap="circular" badgeContent=" " variant="dot">
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    bgcolor: 'warning.main'
                  }}
                />
              </MBadge>
            </Block>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
