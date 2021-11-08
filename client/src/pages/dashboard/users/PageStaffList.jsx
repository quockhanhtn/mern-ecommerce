// material
import { Container, Typography } from '@material-ui/core';
// components
import Page from '../../../components/Page';

// ----------------------------------------------------------------------

export default function PageStaffList() {
  return (
    <Page title="Page One | Minimal-UI">
      <Container maxWidth="xl">
        <Typography variant="h3" component="h1" paragraph>
          Employee
        </Typography>
      </Container>
    </Page>
  );
}
