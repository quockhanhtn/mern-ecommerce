// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Stack, Switch, Container, FormGroup, FormControl, FormControlLabel } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import { MSwitch } from '../../../components/@material-extend';
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

export default function Switches() {
  return (
    <RootStyle title="Components: Switches | Minimal-UI">
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
            heading="Switches"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Switches' }]}
            moreLink="https://next.material-ui.com/components/alert"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
          <Stack spacing={3} sx={{ width: 1 }}>
            <Block title="Basic" sx={style}>
              <Switch defaultChecked />
              <Switch />
              <Switch disabled />
              <Switch disabled checked />
              <Switch defaultChecked color="default" />
            </Block>

            <Block title="Sizes" sx={style}>
              <FormControlLabel control={<Switch size="small" />} label="Small" />
              <FormControlLabel control={<Switch />} label="Normal" />
            </Block>

            <Block title="Placement" sx={style}>
              <FormControl component="fieldset">
                <FormGroup row>
                  <FormControlLabel value="top" label="Top" labelPlacement="top" control={<Switch />} />
                  <FormControlLabel value="start" label="Start" labelPlacement="start" control={<Switch />} />
                  <FormControlLabel value="bottom" label="Bottom" labelPlacement="bottom" control={<Switch />} />
                  <FormControlLabel value="end" label="End" labelPlacement="end" control={<Switch />} />
                </FormGroup>
              </FormControl>
            </Block>
          </Stack>

          <Block title="Adding Colors">
            <FormControl component="fieldset">
              <FormGroup>
                <FormControlLabel control={<Switch defaultChecked color="default" />} label="Default" />
                <FormControlLabel control={<Switch defaultChecked />} label="Primary" />
                <FormControlLabel control={<MSwitch defaultChecked color="info" />} label="Info" />
                <FormControlLabel control={<MSwitch defaultChecked color="success" />} label="Success" />
                <FormControlLabel control={<MSwitch defaultChecked color="warning" />} label="Warning" />
                <FormControlLabel control={<MSwitch defaultChecked color="error" />} label="Error" />
                <FormControlLabel disabled control={<MSwitch defaultChecked color="error" />} label="Disabled" />
                <FormControlLabel disabled control={<MSwitch color="error" />} label="Disabled" />
              </FormGroup>
            </FormControl>
          </Block>
        </Stack>
      </Container>
    </RootStyle>
  );
}
