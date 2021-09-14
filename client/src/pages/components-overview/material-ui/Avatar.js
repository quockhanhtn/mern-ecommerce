// material
import FolderIcon from '@material-ui/icons/Folder';
import PageviewIcon from '@material-ui/icons/Pageview';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Grid, Badge, Avatar, Container, AvatarGroup } from '@material-ui/core';
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import BadgeStatus from '../../../components/BadgeStatus';
import { MAvatar } from '../../../components/@material-extend';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function AvatarComponent() {
  const theme = useTheme();

  return (
    <RootStyle title="Components: Avatar | Minimal-UI">
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
            heading="Avatar"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Avatar' }]}
            moreLink="https://next.material-ui.com/components/avatars"
          />
        </Container>
      </Box>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Block
              title="Image avatars"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& > *': { mx: 1 } }}
            >
              {[1, 2, 3, 4, 5].map((_, index) => (
                <Avatar key={index} alt="Remy Sharp" src={`/static/mock-images/avatars/avatar_${index + 1}.jpg`} />
              ))}
            </Block>
          </Grid>

          <Grid item xs={12} md={4}>
            <Block
              title="Letter avatars"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& > *': { mx: 1 } }}
            >
              <MAvatar>H</MAvatar>
              <MAvatar color="primary">N</MAvatar>
              <MAvatar color="info">OP</MAvatar>
              <MAvatar color="success">CB</MAvatar>
              <MAvatar color="warning">ZP</MAvatar>
              <MAvatar color="error">OH</MAvatar>
            </Block>
          </Grid>

          <Grid item xs={12} md={4}>
            <Block
              title="Icon avatars"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& > *': { mx: 1 } }}
            >
              <MAvatar color="primary">
                <FolderIcon />
              </MAvatar>
              <MAvatar color="info">
                <PageviewIcon />
              </MAvatar>
              <MAvatar color="success">
                <AssignmentIcon />
              </MAvatar>
            </Block>
          </Grid>

          <Grid item xs={12} md={4}>
            <Block
              title="Variant"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& > *': { mx: 1 } }}
            >
              <MAvatar variant="square" color="primary">
                <FolderIcon />
              </MAvatar>
              <MAvatar variant="rounded" color="info">
                <PageviewIcon />
              </MAvatar>
            </Block>
          </Grid>

          <Grid item xs={12} md={4}>
            <Block title="Grouped" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <AvatarGroup max={4}>
                <MAvatar alt="Remy Sharp" src="/static/mock-images/avatars/avatar_4.jpg" />
                <MAvatar color="info">OP</MAvatar>
                <MAvatar alt="Cindy Baker" src="/static/mock-images/avatars/avatar_5.jpg" />
                <MAvatar alt="Agnes Walker" src="/static/mock-images/avatars/avatar_6.jpg" />
                <MAvatar alt="Trevor Henderson" src="/static/mock-images/avatars/avatar_7.jpg" />
                <MAvatar alt="Trevor Henderson" src="/static/mock-images/avatars/avatar_8.jpg" />
                <MAvatar alt="Trevor Henderson" src="/static/mock-images/avatars/avatar_9.jpg" />
              </AvatarGroup>
            </Block>
          </Grid>

          <Grid item xs={12} md={4}>
            <Block
              title="With badge"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& > *': { mx: 1 } }}
            >
              <Badge
                overlap="circular"
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right'
                }}
                badgeContent={
                  <Avatar
                    alt="Travis Howard"
                    src="/static/mock-images/avatars/avatar_7.jpg"
                    sx={{
                      width: 24,
                      height: 24,
                      border: `solid 2px ${theme.palette.background.paper}`
                    }}
                  />
                }
              >
                <Avatar alt="Travis Howard" src="/static/mock-images/avatars/avatar_8.jpg" />
              </Badge>

              {['online', 'away', 'busy', 'invisible'].map((status, index) => (
                <Box key={status} sx={{ position: 'relative' }}>
                  <Avatar alt="Travis Howard" src={`/static/mock-images/avatars/avatar_${index + 7}.jpg`} />
                  <BadgeStatus status={status} sx={{ right: 2, bottom: 2, position: 'absolute' }} />
                </Box>
              ))}
            </Block>
          </Grid>

          <Grid item xs={12}>
            <Block
              title="Sizes"
              sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', '& > *': { mx: 1 } }}
            >
              {[24, 32, 48, 56, 64, 80, 128].map((size, index) => (
                <Avatar
                  key={size}
                  alt="Travis Howard"
                  src={`/static/mock-images/avatars/avatar_${index + 4}.jpg`}
                  sx={{ width: size, height: size }}
                />
              ))}
            </Block>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
