// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Container, Stack } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import Label from '../../../components/Label';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
//
import { Block } from '../Block';

// ----------------------------------------------------------------------

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': { mx: 1 }
};

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function LabelsComponent() {
  return (
    <RootStyle title="Components: Label | Minimal-UI">
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
            heading="Label"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Label' }]}
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Block title="Filled" sx={style}>
            <Label variant="filled"> Default</Label>
            <Label variant="filled" color="primary">
              Primary
            </Label>
            <Label variant="filled" color="secondary">
              Secondary
            </Label>
            <Label variant="filled" color="info">
              Info
            </Label>
            <Label variant="filled" color="success">
              Success
            </Label>
            <Label variant="filled" color="warning">
              Waring
            </Label>
            <Label variant="filled" color="error">
              Error
            </Label>
          </Block>

          <Block title="Outlined" sx={style}>
            <Label variant="outlined"> Default</Label>
            <Label variant="outlined" color="primary">
              Primary
            </Label>
            <Label variant="outlined" color="secondary">
              Secondary
            </Label>
            <Label variant="outlined" color="info">
              Info
            </Label>
            <Label variant="outlined" color="success">
              Success
            </Label>
            <Label variant="outlined" color="warning">
              Waring
            </Label>
            <Label variant="outlined" color="error">
              Error
            </Label>
          </Block>

          <Block title="Ghost" sx={style}>
            <Label> Default</Label>
            <Label color="primary">Primary</Label>
            <Label color="secondary">Secondary</Label>
            <Label color="info">Info</Label>
            <Label color="success">Success</Label>
            <Label color="warning">Waring</Label>
            <Label color="error">Error</Label>
          </Block>
        </Stack>
      </Container>
    </RootStyle>
  );
}
