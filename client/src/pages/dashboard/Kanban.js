import { useEffect } from 'react';
// material
import { Container, Stack } from '@material-ui/core';
// redux
import { useDispatch, useSelector } from '../../redux/store';
import { getBoard } from '../../redux/slices/kanban';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import { KanbanColumn, KanbanColumnAdd } from '../../components/_dashboard/kanban';

// ----------------------------------------------------------------------

export default function Kanban() {
  const dispatch = useDispatch();
  const { board } = useSelector((state) => state.kanban);

  useEffect(() => {
    dispatch(getBoard());
  }, [dispatch]);

  return (
    <Page title="Kanban | Minimal-UI" sx={{ height: '100%' }}>
      <Container maxWidth={false} sx={{ height: '100%' }}>
        <HeaderBreadcrumbs
          heading="Kanban"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root
            },
            { name: 'Kanban' }
          ]}
        />
        <Stack
          direction="row"
          alignItems="flex-start"
          spacing={3}
          sx={{ height: 'calc(100% - 32px)', overflowY: 'hidden' }}
        >
          {board?.columns?.map((column) => (
            <KanbanColumn key={column.id} column={column} />
          ))}
          <KanbanColumnAdd />
        </Stack>
      </Container>
    </Page>
  );
}
