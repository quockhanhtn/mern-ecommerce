// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Paper, Container, Stack } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../../routes/paths';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//
import { Block } from '../../Block';
import CustomizedStepper from './CustomizedStepper';
import VerticalLinearStepper from './VerticalLinearStepper';
import LinearAlternativeLabel from './LinearAlternativeLabel';
import HorizontalLinearStepper from './HorizontalLinearStepper';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

// ----------------------------------------------------------------------

export default function StepperComponent() {
  return (
    <RootStyle title="Components: StepperView | Minimal-UI">
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
            heading="Stepper"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Stepper' }]}
            moreLink="https://next.material-ui.com/components/steppers"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Block title="Horizontal Linear Stepper">
            <Paper
              sx={{
                p: 3,
                width: '100%',
                boxShadow: (theme) => theme.customShadows.z8
              }}
            >
              <HorizontalLinearStepper />
            </Paper>
          </Block>

          <Block title="Linear Alternative Label">
            <Paper
              sx={{
                p: 3,
                width: '100%',
                boxShadow: (theme) => theme.customShadows.z8
              }}
            >
              <LinearAlternativeLabel />
            </Paper>
          </Block>

          <Block title="Vertical Linear Stepper">
            <Paper
              sx={{
                p: 3,
                width: '100%',
                boxShadow: (theme) => theme.customShadows.z8
              }}
            >
              <VerticalLinearStepper />
            </Paper>
          </Block>

          <Block title="Customized Stepper">
            <Paper
              sx={{
                p: 3,
                width: '100%',
                boxShadow: (theme) => theme.customShadows.z8
              }}
            >
              <CustomizedStepper />
            </Paper>
          </Block>
        </Stack>
      </Container>
    </RootStyle>
  );
}
