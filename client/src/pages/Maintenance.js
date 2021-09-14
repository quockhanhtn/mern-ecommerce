import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Button, Typography, Container } from '@material-ui/core';
// components
import Page from '../components/Page';
//
import { MaintenanceIllustration } from '../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Maintenance() {
  return (
    <RootStyle title="Maintenance | Minimal-UI">
      <Container sx={{ textAlign: 'center' }}>
        <Typography variant="h3" paragraph>
          Website currently under maintenance
        </Typography>
        <Typography sx={{ color: 'text.secondary' }}>We are currently working hard on this page!</Typography>

        <MaintenanceIllustration sx={{ my: 10, height: 240 }} />

        <Button variant="contained" size="large" component={RouterLink} to="/">
          Go to Home
        </Button>
      </Container>
    </RootStyle>
  );
}
