// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  ComponentHero,
  ComponentOther,
  ComponentFoundation,
  ComponentMaterialUI
} from '../components/_external-pages/components-overview';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(8),
  paddingBottom: theme.spacing(15),
  [theme.breakpoints.up('md')]: {
    paddingTop: theme.spacing(11)
  }
}));

// ----------------------------------------------------------------------

export default function ComponentsOverview() {
  return (
    <RootStyle title="Components Overview | Minimal-UI">
      <ComponentHero />
      <Container maxWidth="lg">
        <ComponentFoundation />
        <ComponentMaterialUI />
        <ComponentOther />
      </Container>
    </RootStyle>
  );
}
