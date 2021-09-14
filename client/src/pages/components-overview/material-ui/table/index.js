// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Card, Container, CardHeader, Stack } from '@material-ui/core';
// routes
import { PATH_PAGE } from '../../../../routes/paths';
// components
import Page from '../../../../components/Page';
import HeaderBreadcrumbs from '../../../../components/HeaderBreadcrumbs';
//
import BasicTable from './BasicTable';
import CollapsibleTable from './collapsible-table';
import SortingSelecting from './sorting-selecting';
import GroupingFixedHeader from './GroupingFixedHeader';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  paddingTop: theme.spacing(11),
  paddingBottom: theme.spacing(15)
}));

export default function TableComponent() {
  return (
    <RootStyle title="Components: Table | Minimal-UI">
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
            heading="Table"
            links={[{ name: 'Components', href: PATH_PAGE.components }, { name: 'Table' }]}
            moreLink="https://next.material-ui.com/components/tables"
          />
        </Container>
      </Box>

      <Container maxWidth="lg">
        <Stack spacing={5}>
          <Card>
            <CardHeader title="Basic Table" />
            <BasicTable />
          </Card>

          <Card>
            <SortingSelecting />
          </Card>

          <Card>
            <CardHeader title="Grouping & FixedHeader" />
            <GroupingFixedHeader />
          </Card>

          <Card>
            <CardHeader title="Collapsible Table" />
            <CollapsibleTable />
          </Card>
        </Stack>
      </Container>
    </RootStyle>
  );
}
