import { useEffect } from 'react';
import { paramCase } from 'change-case';
import { useParams, useLocation } from 'react-router-dom';
// material
import { Container } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../../actions/users';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import UserForm from './UserForm';

// ----------------------------------------------------------------------

export default function PageProfileUser() {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const { name } = useParams();
  const { list: usersList, isLoading, hasError } = useSelector((state) => state.user);
  const isEdit = pathname.includes('edit');
  let currentId;
  const currentUser = usersList.find((c) => c._id === currentId);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  return (
    <Page title="User: Create a new user | Minimal-UI">
      <Container>
        <HeaderBreadcrumbs
          heading={!isEdit ? 'Create a new user' : 'Edit user'}
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.general.statics },
            { name: 'User', href: PATH_DASHBOARD.app }
          ]}
        />
        <UserForm isEdit={isEdit} currentUser={currentUser} />
      </Container>
    </Page>
  );
}
