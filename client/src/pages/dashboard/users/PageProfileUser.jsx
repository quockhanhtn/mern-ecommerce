import { Container } from '@material-ui/core';
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import UserForm from './UserForm';

// ----------------------------------------------------------------------

export default function PageProfileUser() {
  return (
    <Page title="User: Create a new user | Minimal-UI">
      <Container>
        <HeaderBreadcrumbs
          heading="Information"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.general.statics },
            { name: 'User', href: PATH_DASHBOARD.app }
          ]}
        />
        <UserForm />
      </Container>
    </Page>
  );
}
